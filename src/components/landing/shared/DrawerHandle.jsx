import React, { useEffect, useRef } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./drawer.css";

const LIFT_RESISTANCE = 40;

function position(offset, height) {
  return {
    translate: `0 ${Math.max(0, offset)}px`,
    scale: `1 ${1 - Math.min(0, offset) / height}`,
  };
}

export default function DrawerHandle({ onDismiss }) {
  const ref = useRef(null);

  useEffect(() => {
    const handle = ref.current;
    const drawer = handle.closest(".salon-drawer");
    const body = drawer.querySelector(".salon-drawer-body");
    const phone = matchMedia(MEDIA_QUERIES.phone);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let gesture;
    let animation;

    function reset() {
      gesture = null;
      animation?.cancel();
      animation = null;
      delete drawer.dataset.drawerState;
      drawer.style.removeProperty("translate");
      drawer.style.removeProperty("scale");
    }

    function settle(offset, dismiss) {
      if (reducedMotion.matches) {
        reset();
        if (dismiss) onDismiss();
        return;
      }
      animation?.cancel();
      drawer.dataset.drawerState = dismiss ? "closing" : "rebounding";
      const height = drawer.offsetHeight;
      const resting = position(0, height);
      const keyframes = [position(offset, height)];
      if (dismiss) {
        keyframes.push(position(height, height));
      } else if (offset < 0) {
        keyframes.push(
          { ...resting, offset: .64 },
          { ...position(Math.min(6, -offset * .27), height), offset: .81 },
          { ...position(Math.max(-2, offset * .1), height), offset: .92 },
          resting,
        );
      } else {
        keyframes.push({ ...resting, offset: .7 }, { ...position(4, height), offset: .84 }, resting);
      }
      animation = drawer.animate(keyframes, dismiss
        ? { duration: 225, easing: "cubic-bezier(.35,0,1,1)", fill: "forwards" }
        : { duration: 330, easing: "cubic-bezier(.2,.65,.35,1)" });
      drawer.style.removeProperty("translate");
      drawer.style.removeProperty("scale");
      animation.finished.then(() => {
        if (dismiss) onDismiss();
        else reset();
      }, () => {});
    }

    function start(source, x, y, fromHandle) {
      const atTop = body.scrollTop <= 1;
      if (!phone.matches || gesture || (!atTop && !fromHandle) || drawer.dataset.drawerState === "closing") return;
      gesture = { source, x, y, fromHandle, atTop, started: performance.now(), offset: 0, dragging: false };
    }

    function move(event, source, x, y) {
      if (gesture?.source !== source) return;
      const distance = y - gesture.y;
      const canLower = gesture.atTop && body.scrollTop <= 1;
      if (!gesture.dragging) {
        const horizontal = Math.abs(x - gesture.x);
        if (Math.max(horizontal, Math.abs(distance)) < 6) return;
        const canStart = distance < 0 ? gesture.fromHandle : canLower;
        if (Math.abs(distance) <= horizontal || !canStart || !event.cancelable) {
          gesture = null;
          return;
        }
        const height = drawer.offsetHeight;
        const liftLimit = Math.max(0, Math.min(28, height * .06, window.innerHeight - height - 8));
        const animated = animation ? getComputedStyle(drawer) : null;
        const lowerBy = Number.parseFloat(animated?.translate.split(" ")[1]) || 0;
        const stretch = Number.parseFloat(animated?.scale.split(" ")[1]) || 1;
        const liftedBy = Math.max(0, (stretch - 1) * height);
        gesture.height = height;
        gesture.liftLimit = liftLimit;
        // Recover the finger displacement if another drag interrupts the spring.
        gesture.base = lowerBy || -LIFT_RESISTANCE * liftedBy / Math.max(1, liftLimit - liftedBy);
        animation?.cancel();
        animation = null;
        drawer.dataset.drawerState = "dragging";
        gesture.dragging = true;
      }
      event.preventDefault();
      const displacement = distance + gesture.base;
      if (displacement < 0 && gesture.fromHandle) {
        gesture.offset = gesture.liftLimit * displacement / (LIFT_RESISTANCE - displacement);
      } else {
        gesture.offset = canLower ? Math.min(gesture.height, Math.max(0, displacement)) : 0;
      }
      gesture.moved = performance.now();
      gesture.distance = distance;
      Object.assign(drawer.style, position(gesture.offset, gesture.height));
    }

    function finish(source, cancelled = false) {
      if (gesture?.source !== source) return;
      const drag = gesture;
      gesture = null;
      if (!drag.dragging) return;
      const now = performance.now();
      const threshold = Math.min(144, drawer.offsetHeight * .24);
      const flick = drag.distance >= 48 && now - drag.moved < 90 &&
        drag.distance / Math.max(1, now - drag.started) >= .65;
      const canDismiss = drag.atTop && body.scrollTop <= 1 && drag.offset > 0;
      settle(drag.offset, !cancelled && canDismiss && (drag.distance >= threshold || flick));
    }

    function touchStart(event) {
      if (event.touches.length !== 1) {
        finish("touch", true);
        return;
      }
      if (event.target.closest("input, textarea, select, [contenteditable=true]")) return;
      const touch = event.touches[0];
      start("touch", touch.clientX, touch.clientY, handle.contains(event.target));
    }

    function touchMove(event) {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      move(event, "touch", touch.clientX, touch.clientY);
    }

    function pointerDown(event) {
      if (event.pointerType === "touch" || event.button !== 0) return;
      start(event.pointerId, event.clientX, event.clientY, true);
    }

    function activate(event) {
      if (event.detail !== 0 || !phone.matches || gesture || drawer.dataset.drawerState === "closing") return;
      if (body.scrollTop > 1) body.scrollTop = 0;
      else settle(0, true);
    }

    const listeners = new AbortController();
    const { signal } = listeners;
    drawer.addEventListener("touchstart", touchStart, { passive: true, signal });
    drawer.addEventListener("touchmove", touchMove, { passive: false, signal });
    drawer.addEventListener("touchend", () => finish("touch"), { signal });
    drawer.addEventListener("touchcancel", () => finish("touch", true), { signal });
    handle.addEventListener("pointerdown", pointerDown, { signal });
    window.addEventListener("pointermove", event => {
      if (event.buttons & 1) move(event, event.pointerId, event.clientX, event.clientY);
      else finish(event.pointerId, true);
    }, { capture: true, signal });
    window.addEventListener("pointerup", event => finish(event.pointerId), { capture: true, signal });
    window.addEventListener("pointercancel", event => finish(event.pointerId, true), { capture: true, signal });
    window.addEventListener("blur", () => {
      if (gesture) finish(gesture.source, true);
    }, { signal });
    handle.addEventListener("click", activate, { signal });
    phone.addEventListener("change", reset, { signal });

    return () => {
      listeners.abort();
      reset();
    };
  }, [onDismiss]);

  return <button ref={ref} className="salon-drawer-handle" type="button"
    aria-label="Dismiss drawer" aria-description="Pull up slightly, or drag down when the content is at the top." />;
}
