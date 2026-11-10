import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
// Reuse Astro's installed image processor; no additional dependency is needed.
const sharp = require(require.resolve('sharp', { paths: [require.resolve('astro/package.json')] }));
const reportFile = path.join(root, 'docs/image-optimization.json');
const variantsFile = path.join(root, 'src/data/image-variants.json');
const digest = buffer => createHash('sha256').update(buffer).digest('hex');
const diskPath = url => path.join(root, 'public', url);
const json = async file => JSON.parse(await fs.readFile(file, 'utf8'));

async function comparePixels(original, optimized) {
  const [before, after] = await Promise.all([
    sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(optimized).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
  ]);
  if (before.info.width !== after.info.width || before.info.height !== after.info.height ||
      before.info.channels !== 4 || after.info.channels !== 4 || before.data.length !== after.data.length) {
    throw new Error(`Dimensions changed: ${original}`);
  }
  let alphaDifferences = 0, visibleColorDifferences = 0;
  for (let i = 0; i < before.data.length; i += 4) {
    if (before.data[i + 3] !== after.data[i + 3]) alphaDifferences++;
    // Hidden RGB under fully transparent pixels has no visible contribution.
    if (before.data[i + 3] > 0) {
      for (let c = 0; c < 3; c++) if (before.data[i + c] !== after.data[i + c]) visibleColorDifferences++;
    }
  }
  if (alphaDifferences || visibleColorDifferences) {
    throw new Error(`Pixel verification failed: ${original} (${alphaDifferences} alpha, ${visibleColorDifferences} visible RGB)`);
  }
  return { width: before.info.width, height: before.info.height, alphaDifferences, visibleColorDifferences };
}

async function check() {
  const report = await json(reportFile);
  const variants = await json(variantsFile);
  for (const item of report.images) {
    const original = await fs.readFile(diskPath(item.original));
    if (digest(original) !== item.originalSha256) throw new Error(`Original changed: ${item.original}`);
    if (item.optimized) {
      const optimized = await fs.readFile(diskPath(item.optimized));
      if (variants[item.original] !== item.optimized || optimized.length >= original.length || digest(optimized) !== item.optimizedSha256) {
        throw new Error(`Invalid optimized image: ${item.original}`);
      }
      await comparePixels(diskPath(item.original), diskPath(item.optimized));
    } else if (variants[item.original]) throw new Error(`Unexpected image variant: ${item.original}`);
  }
  if (Object.keys(variants).length !== report.images.filter(item => item.optimized).length) throw new Error('Unverified image variants.');
  console.log(`Image verification OK: ${Object.keys(variants).length} lossless variants; original hashes, visible pixels, alpha and dimensions unchanged.`);
}

async function generate() {
  const guests = await json(path.join(root, 'src/data/library-visitors.json'));
  const sources = [...new Set([
    ...guests.map(guest => guest.image),
    '/images/branding/logo.png',
    '/images/hero/reading-room.jpg',
    '/images/community/reading-circle.jpg',
    '/images/decorations/ivory-paper-texture.png',
    '/images/decorations/book-sheet-starry-landscape.png',
    '/images/decorations/library-editorial/binding-atlas.png',
    '/images/decorations/library-editorial/ornament-atlas.png',
    '/images/decorations/library-editorial/empty-shelf-clean-header.png',
  ])];
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'salon-image-optimization-'));
  const variants = {}, images = [];
  try {
    // Process sequentially to bound the memory used by full-resolution RGBA buffers.
    for (const source of sources) {
      const originalPath = diskPath(source), original = await fs.readFile(originalPath);
      const metadata = await sharp(original).metadata();
      const optimizedUrl = source.replace('/images/', '/images/optimized/').replace(/\.(png|jpe?g)$/i, '.webp');
      const candidate = path.join(temporary, path.basename(optimizedUrl));
      await sharp(original).webp({ lossless: true, alphaQuality: 100, effort: 6 }).toFile(candidate);
      const encoded = await fs.readFile(candidate);
      const item = {
        original: source, originalBytes: original.length, originalSha256: digest(original),
        width: metadata.width, height: metadata.height, hasAlpha: metadata.hasAlpha,
      };
      if (encoded.length < original.length) {
        const pixels = await comparePixels(originalPath, candidate);
        const destination = diskPath(optimizedUrl);
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.copyFile(candidate, destination);
        variants[source] = optimizedUrl;
        Object.assign(item, { optimized: optimizedUrl, optimizedBytes: encoded.length, optimizedSha256: digest(encoded), ...pixels });
        console.log(`${source}: ${original.length} → ${encoded.length} bytes (lossless, original preserved)`);
      } else {
        Object.assign(item, { optimized: null, servedBytes: original.length, reason: 'Original is already smaller than the lossless WebP candidate.' });
        console.log(`${source}: kept original (${original.length} bytes)`);
      }
      images.push(item);
    }
    const originalBytes = images.reduce((sum, item) => sum + item.originalBytes, 0);
    const servedBytes = images.reduce((sum, item) => sum + (item.optimizedBytes ?? item.originalBytes), 0);
    const report = {
      version: 1, encoding: 'WebP lossless; no resizing; alpha preserved',
      note: 'Totals compare active image URLs, not a single page load. All original files remain available unchanged.',
      totals: { images: images.length, optimized: Object.keys(variants).length, originalBytes, servedBytes, savedBytes: originalBytes - servedBytes, savedPercent: Number(((1 - servedBytes / originalBytes) * 100).toFixed(2)) },
      images,
    };
    await fs.writeFile(variantsFile, JSON.stringify(variants, null, 2) + '\n');
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report.totals));
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv.includes('--check')) await check();
else await generate();
