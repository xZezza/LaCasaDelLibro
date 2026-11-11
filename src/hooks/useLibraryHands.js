import { useEffect, useRef } from 'react';
import { bookBounds, normalizeDegrees } from '../lib/library-motion.js';

// Pointer coordinates stay in viewport pixels; the preview lives outside the zoomed dialog.
export default function useLibraryHands(dialogRef, open, shelves, commit) {
  const current = useRef({ shelves, commit });
  current.current = { shelves, commit };
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    let hand = null, suppressUntil = 0, landingTimer = 0, frame = 0;
    const previews = new Set();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function books() { return current.current.shelves.flatMap(sh => sh.segs.flatMap(sg => sg.books)); }
    function destination(x, y) {
      const rows = [...dialog.querySelectorAll('[data-library-shelf-items]')];
      const row = rows.find(el => { const r = el.getBoundingClientRect(); return x >= r.left - 24 && x <= r.right + 24 && y >= r.top - 24 && y <= r.bottom + 45; });
      if (!row) return null;
      const candidates = [...row.querySelectorAll('[data-library-item-id]')].filter(el => el !== hand.source);
      const before = candidates.find(el => { const r = el.getBoundingClientRect(); return x < r.left + r.width / 2; });
      return { shelf: Number(row.closest('[data-shelf]').dataset.shelf), beforeId: before?.dataset.libraryItemId || null, row, before };
    }
    function clearTarget() { dialog.querySelectorAll('[data-hand-target]').forEach(el => el.removeAttribute('data-hand-target')); }
    function clean(cancel = true) {
      cancelAnimationFrame(frame);
      if (!hand) return;
      const h = hand; hand = null;
      h.source.style.removeProperty('opacity');
      h.source.removeAttribute('data-in-hand');
      h.preview?.remove(); previews.delete(h.preview);
      clearTarget();
      if (dialog.hasPointerCapture?.(h.pointer)) dialog.releasePointerCapture(h.pointer);
      if (cancel && h.active) suppressUntil = performance.now() + 350;
    }
    function startPreview() {
      const h = hand, clone = h.source.cloneNode(true);
      clone.removeAttribute('tabindex'); clone.removeAttribute('title'); clone.removeAttribute('id');
      clone.setAttribute('aria-hidden', 'true'); clone.dataset.selected = 'false';
      const preview = document.createElement('div');
      preview.className = 'salon-library-dialog library-hand-preview';
      preview.setAttribute('aria-hidden', 'true'); preview.inert = true;
      preview.style.colorScheme = getComputedStyle(dialog).colorScheme;
      preview.style.left = `${h.rect.left}px`; preview.style.top = `${h.rect.top}px`;
      preview.style.width = `${h.rect.width}px`; preview.style.height = `${h.rect.height}px`;
      clone.style.width = `${h.source.offsetWidth}px`; clone.style.height = `${h.source.offsetHeight}px`;
      clone.style.margin = '0'; clone.style.transformOrigin = 'top left'; clone.style.transform = `scale(${h.scale})`;
      preview.append(clone); document.body.append(preview); previews.add(preview);
      h.preview = preview; h.clone = clone; h.active = true;
      h.source.style.opacity = '.2'; h.source.dataset.inHand = 'true';
      dialog.setPointerCapture?.(h.pointer);
    }
    function paint() {
      if (!hand?.active) return;
      const h = hand;
      if (h.rotate) {
        const bounds = h.book.isDeco
          ? bookBounds(h.book.objectW, h.book.objectH, 0, h.rotation)
          : bookBounds(h.book.T, h.book.H, h.book.D, h.rotation, h.book.angle, 700);
        h.clone.style.width = `${bounds.width}px`; h.clone.style.height = `${bounds.height}px`;
        const face = h.clone.querySelector('.salon-s232');
        if (h.book.isDeco) { h.clone.style.setProperty('--object-z', `${h.rotation.z}deg`); h.clone.style.setProperty('--object-bound-height', `${bounds.height}px`); }
        else { h.clone.style.setProperty('--book-offset-x', `${bounds.offsetX || 0}px`); h.clone.style.setProperty('--book-offset-y', `${bounds.offsetY || 0}px`); face.style.transform = `rotateX(${h.rotation.x}deg) rotateY(${h.rotation.y + h.book.angle}deg) rotateZ(${h.rotation.z}deg)`; }
        h.preview.style.left = `${h.rect.left + (h.rect.width - bounds.width * h.scale) / 2}px`;
        h.preview.style.top = `${h.rect.bottom - bounds.height * h.scale - 12}px`;
      } else {
        h.preview.style.transform = `translate3d(${h.dx}px,${h.dy - 12}px,0)`;
      }
    }
    function down(e) {
      if (e.button !== 0 || hand) return;
      const source = e.target.closest('[data-hand-id]');
      if (!source || !dialog.contains(source)) return;
      const book = books().find(b => b.id === source.dataset.handId);
      if (!book) return;
      const rect = source.getBoundingClientRect(), u = (e.clientX - rect.left) / rect.width, v = (e.clientY - rect.top) / rect.height;
      hand = { source, book, pointer: e.pointerId, rect, scale: rect.width / source.offsetWidth,
        x: e.clientX, y: e.clientY, dx: 0, dy: 0, active: false,
        rotate: book.isBook && (v < .18 || v > .82 || (rect.width > 50 && (u < .16 || u > .84))), rotation: { ...book.rotation } };
    }
    function move(e) {
      if (!hand || e.pointerId !== hand.pointer) return;
      const h = hand; h.dx = e.clientX - h.x; h.dy = e.clientY - h.y;
      if (!h.active && Math.hypot(h.dx, h.dy) < 5) return;
      e.preventDefault();
      if (!h.active) startPreview();
      if (h.rotate) {
        if (h.book.isDeco) h.rotation.z = normalizeDegrees(h.book.rotation.z + h.dx / h.scale * .65);
        else {
          h.rotation.y = normalizeDegrees(h.book.rotation.y + h.dx / h.scale * .65);
          h.rotation.x = normalizeDegrees(h.book.rotation.x - h.dy / h.scale * .55);
        }
      } else {
        clearTarget();
        h.target = destination(e.clientX, e.clientY);
        if (h.target) (h.target.before || h.target.row).setAttribute('data-hand-target', 'true');
      }
      cancelAnimationFrame(frame); frame = requestAnimationFrame(paint);
    }
    function up(e) {
      if (!hand || e.pointerId !== hand.pointer) return;
      const h = hand;
      if (!h.active) { clean(false); return; }
      e.preventDefault(); suppressUntil = performance.now() + 400;
      const target = h.rotate ? { shelf: h.book.shelf, rotation: h.rotation } : destination(e.clientX, e.clientY);
      // Never drop outside a shelf or alter the layout when the gesture is cancelled.
      const preview = h.preview;
      h.preview = null;
      clean(false);
      if (target) current.current.commit(h.book.id, target);
      const settle = () => {
        if (!preview.isConnected) return;
        const landed = dialog.querySelector(`[data-hand-id="${CSS.escape(h.book.id)}"]`);
        const r = landed?.getBoundingClientRect() || h.rect;
        preview.style.transition = reduced.matches ? 'none' : 'left 260ms cubic-bezier(.22,.8,.25,1), top 260ms cubic-bezier(.22,.8,.25,1), transform 260ms cubic-bezier(.22,.8,.25,1), opacity 260ms';
        preview.style.left = `${r.left}px`; preview.style.top = `${r.top}px`; preview.style.transform = 'translate3d(0,0,0)';
        if (landed) landed.style.opacity = '.15';
        landingTimer = setTimeout(() => { landed?.style.removeProperty('opacity'); preview.remove(); previews.delete(preview); }, reduced.matches ? 0 : 270);
      };
      requestAnimationFrame(() => requestAnimationFrame(settle));
    }
    function cancel() { clean(); }
    function click(e) { if (performance.now() < suppressUntil && (e.target.closest('[data-hand-id]') || e.target === dialog)) { e.preventDefault(); e.stopPropagation(); } }
    function key(e) { if (e.key === 'Escape' && hand) { e.preventDefault(); e.stopPropagation(); cancel(); } }
    dialog.addEventListener('pointerdown', down);
    document.addEventListener('pointermove', move, { passive: false });
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', cancel);
    dialog.addEventListener('click', click, true);
    document.addEventListener('keydown', key, true);
    window.addEventListener('blur', cancel);
    return () => {
      clean(); clearTimeout(landingTimer); previews.forEach(p => p.remove());
      dialog.querySelectorAll('[data-hand-id]').forEach(el => el.style.removeProperty('opacity'));
      dialog.removeEventListener('pointerdown', down); document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cancel);
      dialog.removeEventListener('click', click, true); document.removeEventListener('keydown', key, true); window.removeEventListener('blur', cancel);
    };
  }, [open, dialogRef]);
}
