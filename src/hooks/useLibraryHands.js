import { useEffect, useRef } from 'react';

// Pointer coordinates stay in viewport pixels; the preview lives outside the zoomed dialog.
export default function useLibraryHands(dialogRef, open, commit) {
  const currentCommit = useRef(commit);
  currentCommit.current = commit;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    let hand = null, suppressUntil = 0, landingTimer = 0, frame = 0;
    const previews = new Set();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const room = dialog.querySelector('.library-room');
    const header = room.querySelector('.library-room-header');
    function scrollBounds() {
      const container = room.scrollHeight > room.clientHeight ? room : dialog;
      const bounds = container.getBoundingClientRect();
      const top = container === room ? Math.max(bounds.top, header.getBoundingClientRect().bottom) : bounds.top;
      return { container, bounds, top };
    }
    function destination(x, y) {
      const { bounds, top } = scrollBounds();
      if (y < top || y > bounds.bottom) return null;
      const rows = [...dialog.querySelectorAll('[data-library-shelf-items]')];
      const row = rows.find(el => { const r = el.getBoundingClientRect(); return x >= r.left - 24 && x <= r.right + 24 && y >= r.top - 24 && y <= r.bottom + 45; });
      if (!row) return null;
      const candidates = [...row.querySelectorAll('[data-library-item-id]')].filter(el => el !== hand.source);
      const before = candidates.find(el => { const r = el.getBoundingClientRect(); return x < r.left + r.width / 2; });
      return { shelf: Number(row.closest('[data-shelf]').dataset.shelf), beforeId: before?.dataset.libraryItemId || null, row, before };
    }
    function edgeStep(value, start, end) {
      const edge = 44;
      if (value < start + edge) return -Math.min(12, (start + edge - value) / 3);
      if (value > end - edge) return Math.min(12, (value - end + edge) / 3);
      return 0;
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
      clone.style.margin = '0';
      preview.append(clone); document.body.append(preview); previews.add(preview);
      h.preview = preview; h.active = true;
      h.source.style.opacity = '.2'; h.source.dataset.inHand = 'true';
      dialog.setPointerCapture?.(h.pointer);
    }
    function paint() {
      if (!hand?.active) return;
      const h = hand;
      h.preview.style.transform = `translate3d(${h.dx}px,${h.dy - 12}px,0)`;
      const x = h.x + h.dx;
      const y = h.y + h.dy;
      const { container, bounds, top } = scrollBounds();
      const previousTop = container.scrollTop;
      if (x >= bounds.left && x <= bounds.right && y >= top - 12 && y <= bounds.bottom + 12) {
        container.scrollTop += edgeStep(y, top, bounds.bottom);
      }
      const row = destination(x, y)?.row;
      const previousLeft = row?.scrollLeft;
      if (row) {
        const box = row.getBoundingClientRect();
        row.scrollLeft += edgeStep(x, box.left, box.right);
      }
      clearTarget();
      const target = destination(x, y);
      if (target) (target.before || target.row).setAttribute('data-hand-target', 'true');
      if (previousTop !== container.scrollTop || previousLeft !== row?.scrollLeft) frame = requestAnimationFrame(paint);
    }
    function down(e) {
      if (e.button !== 0 || hand) return;
      const source = e.target.closest('[data-hand-id]');
      if (!source || !dialog.contains(source)) return;
      hand = { source, id: source.dataset.handId, pointer: e.pointerId, rect: source.getBoundingClientRect(),
        x: e.clientX, y: e.clientY, dx: 0, dy: 0, active: false };
    }
    function move(e) {
      if (!hand || e.pointerId !== hand.pointer) return;
      const h = hand; h.dx = e.clientX - h.x; h.dy = e.clientY - h.y;
      if (!h.active && Math.hypot(h.dx, h.dy) < 5) return;
      e.preventDefault();
      if (!h.active) startPreview();
      cancelAnimationFrame(frame); frame = requestAnimationFrame(paint);
    }
    function up(e) {
      if (!hand || e.pointerId !== hand.pointer) return;
      const h = hand;
      if (!h.active) { clean(false); return; }
      e.preventDefault(); suppressUntil = performance.now() + 400;
      const target = destination(e.clientX, e.clientY);
      // Never drop outside a shelf or alter the layout when the gesture is cancelled.
      const preview = h.preview;
      h.preview = null;
      clean(false);
      if (target) currentCommit.current(h.id, target);
      const settle = () => {
        if (!preview.isConnected) return;
        const landed = dialog.querySelector(`[data-hand-id="${CSS.escape(h.id)}"]`);
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
