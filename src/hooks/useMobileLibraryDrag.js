import { useEffect, useRef } from "react";

// Move on the shelves; the surrounding paper remains available for vertical scrolling.
export default function useMobileLibraryDrag(ref, commit, announce) {
  const callbacks = useRef({ commit, announce });
  callbacks.current = { commit, announce };
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let hand = null, suppressUntil = 0;
    function clear() {
      if (!hand) return;
      hand.source.style.removeProperty("opacity");
      hand.ghost?.remove();
      root.querySelectorAll("[data-mobile-drop]").forEach(node => node.removeAttribute("data-mobile-drop"));
      if (hand.source.hasPointerCapture?.(hand.pointer)) hand.source.releasePointerCapture(hand.pointer);
      hand = null;
    }
    function target(x, y) {
      const rows = [...root.querySelectorAll("[data-mobile-shelf]")];
      const row = rows.find(node => {
        const box = node.getBoundingClientRect();
        return x >= box.left - 12 && x <= box.right + 12 && y >= box.top - 18 && y <= box.bottom + 30;
      });
      if (!row) return null;
      const before = [...row.querySelectorAll("[data-mobile-item]")].filter(node => node !== hand.source)
        .find(node => { const box = node.getBoundingClientRect(); return x < box.left + box.width / 2; });
      return { shelf: Number(row.dataset.mobileShelf), beforeId: before?.dataset.mobileItem || null, node: before || row };
    }
    function down(event) {
      if (event.button !== 0 || hand) return;
      const source = event.target.closest("[data-mobile-item]");
      if (!source || !root.contains(source)) return;
      hand = { source, pointer: event.pointerId, x: event.clientX, y: event.clientY, box: source.getBoundingClientRect(), active: false };
    }
    function move(event) {
      if (!hand || event.pointerId !== hand.pointer) return;
      const dx = event.clientX - hand.x, dy = event.clientY - hand.y;
      if (!hand.active && Math.hypot(dx, dy) < 7) return;
      event.preventDefault();
      if (!hand.active) {
        hand.active = true;
        hand.source.setPointerCapture?.(event.pointerId);
        hand.ghost = hand.source.cloneNode(true);
        hand.ghost.removeAttribute("id"); hand.ghost.removeAttribute("data-mobile-item");
        hand.ghost.setAttribute("aria-hidden", "true"); hand.ghost.tabIndex = -1;
        hand.ghost.classList.add("ml-drag-ghost");
        Object.assign(hand.ghost.style, { position: "fixed", left: `${hand.box.left}px`, top: `${hand.box.top}px`, width: `${hand.box.width}px`, height: `${hand.box.height}px`, margin: "0", zIndex: "2000", pointerEvents: "none", color: getComputedStyle(hand.source).color });
        document.body.append(hand.ghost);
        hand.source.style.opacity = ".2";
      }
      hand.ghost.style.transform = `translate(${dx}px, ${dy - 9}px)`;
      root.querySelectorAll("[data-mobile-drop]").forEach(node => node.removeAttribute("data-mobile-drop"));
      const hit = target(event.clientX, event.clientY);
      hit?.node.setAttribute("data-mobile-drop", "true");
    }
    function up(event) {
      if (!hand || hand.pointer !== event.pointerId) return;
      const active = hand.active, id = hand.source.dataset.mobileItem;
      const destination = active && target(event.clientX, event.clientY);
      if (active) { event.preventDefault(); suppressUntil = performance.now() + 400; }
      clear();
      if (destination) {
        callbacks.current.commit(id, destination.shelf, destination.beforeId);
        callbacks.current.announce("Moved on your shelf. My order is selected.");
      }
    }
    function cancel() { if (hand?.active) suppressUntil = performance.now() + 400; clear(); }
    function click(event) { if (performance.now() < suppressUntil && event.target.closest("[data-mobile-item]")) { event.preventDefault(); event.stopPropagation(); } }
    function key(event) { if (event.key === "Escape" && hand?.active) { event.preventDefault(); event.stopPropagation(); cancel(); } }
    root.addEventListener("pointerdown", down);
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", cancel);
    root.addEventListener("click", click, true);
    document.addEventListener("keydown", key, true);
    window.addEventListener("blur", cancel);
    return () => {
      clear(); root.removeEventListener("pointerdown", down);
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", cancel); root.removeEventListener("click", click, true);
      document.removeEventListener("keydown", key, true); window.removeEventListener("blur", cancel);
    };
  }, [ref]);
}
