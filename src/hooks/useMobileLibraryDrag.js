import { useEffect, useRef } from "react";

// Quick touch gestures scroll; a short hold picks up a book or decoration.
export default function useMobileLibraryDrag(ref, commit, announce, cancelActivation) {
  const callbacks = useRef({ commit, announce, cancelActivation });
  callbacks.current = { commit, announce, cancelActivation };
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const ghosts = new Set();
    const landingTargets = new Map();
    let hand = null, frame = 0, suppressUntil = 0;
    const removeGhost = ghost => {
      const target = landingTargets.get(ghost);
      if (target) {
        if (target.opacity) target.node.style.opacity = target.opacity;
        else target.node.style.removeProperty("opacity");
        landingTargets.delete(ghost);
      }
      ghost?.remove(); ghosts.delete(ghost);
    };
    function clear(keepGhost = false) {
      const previous = hand;
      hand = null;
      cancelAnimationFrame(frame); frame = 0;
      if (!previous) return;
      clearTimeout(previous.hold);
      previous.source.style.removeProperty("opacity");
      root.removeAttribute("data-dragging");
      root.querySelectorAll("[data-mobile-drop]").forEach(node => node.removeAttribute("data-mobile-drop"));
      if (previous.source.hasPointerCapture?.(previous.pointer)) previous.source.releasePointerCapture(previous.pointer);
      if (!keepGhost) removeGhost(previous.ghost);
      return previous;
    }
    function target(x, y) {
      const rows = [...root.querySelectorAll("[data-mobile-shelf]")];
      const row = rows.find(node => {
        const box = node.getBoundingClientRect();
        const viewport = node.closest(".ml-shelf-scroll").getBoundingClientRect();
        return x >= viewport.left - 12 && x <= viewport.right + 12 && y >= box.top - 18 && y <= box.bottom + 30;
      });
      if (!row) return null;
      const before = [...row.querySelectorAll("[data-mobile-item]")].filter(node => node !== hand.source)
        .find(node => { const box = node.getBoundingClientRect(); return x < box.left + box.width / 2; });
      return { shelf: Number(row.dataset.mobileShelf), beforeId: before?.dataset.mobileItem || null, node: before || row, row };
    }
    function paint() {
      frame = 0;
      if (!hand?.active) return;
      const dx = hand.lastX - hand.x, dy = hand.lastY - hand.y;
      const tilt = reduced.matches ? 0 : Math.max(-2, Math.min(2, dx / 35));
      hand.ghost.style.transform = `translate3d(${dx}px, ${dy - (reduced.matches ? 0 : 10)}px, 0) rotate(${tilt}deg) scale(${reduced.matches ? 1 : 1.035})`;
      root.querySelectorAll("[data-mobile-drop]").forEach(node => node.removeAttribute("data-mobile-drop"));
      const hit = target(hand.lastX, hand.lastY);
      hit?.node.setAttribute("data-mobile-drop", "true");
      let pageMoved = false;
      if (hand.page) {
        const box = hand.page.getBoundingClientRect(), previous = hand.page.scrollTop;
        if (hand.lastY < box.top + 28) hand.page.scrollTop -= 4;
        else if (hand.lastY > box.bottom - 28) hand.page.scrollTop += 4;
        pageMoved = hand.page.scrollTop !== previous;
      }
      if (!hit) { if (pageMoved) frame = requestAnimationFrame(paint); return; }
      const scroll = hit.row.closest(".ml-shelf-scroll"), box = scroll.getBoundingClientRect();
      const previous = scroll.scrollLeft;
      if (hand.lastX < box.left + 28) scroll.scrollLeft -= 5;
      else if (hand.lastX > box.right - 28) scroll.scrollLeft += 5;
      if (pageMoved || scroll.scrollLeft !== previous) frame = requestAnimationFrame(paint);
    }
    function lift() {
      if (!hand || hand.mode !== "pending") return;
      callbacks.current.cancelActivation?.();
      hand.mode = "drag"; hand.active = true;
      hand.source.setPointerCapture?.(hand.pointer);
      const ghost = hand.source.cloneNode(true);
      ghost.removeAttribute("id"); ghost.removeAttribute("data-mobile-item");
      ghost.setAttribute("aria-hidden", "true"); ghost.inert = true; ghost.tabIndex = -1;
      ghost.classList.add("ml-drag-ghost");
      Object.assign(ghost.style, { position: "fixed", left: `${hand.box.left}px`, top: `${hand.box.top}px`, width: `${hand.box.width}px`, height: `${hand.box.height}px`, margin: "0", zIndex: "2000", pointerEvents: "none", color: getComputedStyle(hand.source).color });
      document.body.append(ghost); ghosts.add(ghost); hand.ghost = ghost;
      hand.source.style.opacity = ".22";
      root.setAttribute("data-dragging", "true");
      if (!reduced.matches) ghost.animate?.([{ opacity: .65 }, { opacity: 1 }], { duration: 100 });
      callbacks.current.announce(`Picked up ${hand.source.getAttribute("aria-label").replace(/^Arrange /, "")}. Move it to a shelf.`);
      frame = requestAnimationFrame(paint);
    }
    function down(event) {
      if (event.button !== 0 || hand) return;
      const source = event.target.closest("[data-mobile-item]");
      if (!source || !root.contains(source)) return;
      ghosts.forEach(removeGhost);
      const scroller = source.closest(".ml-shelf-scroll");
      const page = source.closest(".ml-content, .ml-edit-preview");
      hand = { source, pointer: event.pointerId, touch: event.pointerType === "touch", x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, box: source.getBoundingClientRect(), active: false, moved: false, mode: "pending", scroller, page, scrollX: scroller.scrollLeft, scrollY: page?.scrollTop || 0 };
      if (hand.touch) hand.hold = setTimeout(lift, 200);
    }
    function move(event) {
      if (!hand || event.pointerId !== hand.pointer) return;
      hand.lastX = event.clientX; hand.lastY = event.clientY;
      const dx = event.clientX - hand.x, dy = event.clientY - hand.y;
      if (Math.hypot(dx, dy) < 7 && !hand.active) return;
      event.preventDefault();
      hand.moved = true;
      callbacks.current.cancelActivation?.();
      if (hand.mode === "pending") {
        clearTimeout(hand.hold);
        if (hand.touch) hand.mode = Math.abs(dy) > Math.abs(dx) ? "scroll-page" : "scroll-shelf";
        else lift();
      }
      if (hand.mode === "scroll-page") { if (hand.page) hand.page.scrollTop = hand.scrollY - dy; return; }
      if (hand.mode === "scroll-shelf") { hand.scroller.scrollLeft = hand.scrollX - dx; return; }
      if (hand.active && !frame) frame = requestAnimationFrame(paint);
    }
    function land(previous, id) {
      const ghost = previous.ghost;
      if (!ghost) return;
      requestAnimationFrame(() => {
        const destination = root.querySelector(`[data-mobile-item="${CSS.escape(id)}"]`);
        if (!root.isConnected || !ghost.isConnected || !destination || reduced.matches || !ghost.animate) { removeGhost(ghost); return; }
        const box = destination.getBoundingClientRect();
        landingTargets.set(ghost, { node: destination, opacity: destination.style.opacity });
        destination.style.opacity = "0";
        const transform = `translate3d(${box.left - previous.box.left}px, ${box.top - previous.box.top}px, 0) rotate(0deg) scale(${box.width / previous.box.width}, ${box.height / previous.box.height})`;
        ghost.animate([{ transform: ghost.style.transform }, { transform }], { duration: 170, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" }).finished.then(() => removeGhost(ghost), () => removeGhost(ghost));
      });
    }
    function up(event) {
      if (!hand || hand.pointer !== event.pointerId) return;
      const id = hand.source.dataset.mobileItem;
      const destination = hand.active && hand.moved && target(event.clientX, event.clientY);
      const consumed = hand.active || hand.mode !== "pending";
      if (consumed) { event.preventDefault(); suppressUntil = performance.now() + 400; }
      const previous = clear(true);
      if (destination) {
        callbacks.current.commit(id, destination.shelf, destination.beforeId);
        callbacks.current.announce("Moved on your shelf. My order is selected.");
      }
      land(previous, id);
    }
    function cancel() { callbacks.current.cancelActivation?.(); if (hand?.active || hand?.moved) suppressUntil = performance.now() + 400; clear(); }
    function click(event) { if (performance.now() < suppressUntil && event.target.closest("[data-mobile-item]")) { event.preventDefault(); event.stopPropagation(); } }
    function key(event) { if (event.key === "Escape" && hand) { event.preventDefault(); event.stopPropagation(); cancel(); } }
    root.addEventListener("pointerdown", down);
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", cancel);
    root.addEventListener("click", click, true);
    document.addEventListener("keydown", key, true);
    window.addEventListener("blur", cancel);
    return () => {
      clear(); ghosts.forEach(removeGhost);
      root.removeEventListener("pointerdown", down); document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", cancel);
      root.removeEventListener("click", click, true); document.removeEventListener("keydown", key, true); window.removeEventListener("blur", cancel);
    };
  }, [ref]);
}
