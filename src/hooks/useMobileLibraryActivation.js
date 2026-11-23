import { useEffect, useRef } from "react";
import { createLibraryActivation } from "../lib/library-activation.js";

export default function useMobileLibraryActivation(ref, select, zoom) {
  const callbacks = useRef({ select, zoom });
  callbacks.current = { select, zoom };
  const activation = useRef(null);
  const pointer = useRef(null);
  if (!activation.current) activation.current = createLibraryActivation({
    select: id => callbacks.current.select(id), zoom: id => callbacks.current.zoom(id),
  });
  useEffect(() => {
    const root = ref.current, controls = activation.current;
    const down = event => {
      const item = event.target.closest("[data-mobile-activate]");
      pointer.current = item ? { element: item, at: performance.now() } : null;
      if (item) controls.suspend(); else controls.cancel();
    };
    const key = event => { pointer.current = null; if (event.key === "Escape") controls.cancel(); };
    root.addEventListener("pointerdown", down);
    root.addEventListener("keydown", key, true);
    root.addEventListener("scroll", controls.cancel, true);
    window.addEventListener("blur", controls.cancel);
    return () => {
      controls.cancel(); root.removeEventListener("pointerdown", down);
      root.removeEventListener("keydown", key, true); root.removeEventListener("scroll", controls.cancel, true); window.removeEventListener("blur", controls.cancel);
    };
  }, [ref]);
  return {
    activate: (event, id) => {
      event.preventDefault();
      const fromPointer = pointer.current?.element === event.currentTarget && performance.now() - pointer.current.at < 1000;
      activation.current.activate(id, { keyboard: event.detail === 0 && !fromPointer, double: event.detail > 1 });
    },
    doubleActivate: (event, id) => {
      event.preventDefault();
      activation.current.activate(id, { double: true });
    },
    cancel: activation.current.cancel,
  };
}
