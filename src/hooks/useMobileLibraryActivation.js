import { useEffect, useRef } from "react";
import { createLibraryActivation } from "../lib/library-activation.js";

export default function useMobileLibraryActivation(ref, select, zoom) {
  const callbacks = useRef({ select, zoom });
  callbacks.current = { select, zoom };
  const activation = useRef(null);
  if (!activation.current) activation.current = createLibraryActivation({
    select: id => callbacks.current.select(id), zoom: id => callbacks.current.zoom(id),
  });
  useEffect(() => {
    const root = ref.current, controls = activation.current;
    const down = event => event.target.closest("[data-mobile-activate]") ? controls.suspend() : controls.cancel();
    const key = event => { if (event.key === "Escape") controls.cancel(); };
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
      activation.current.activate(id, { keyboard: event.detail === 0, double: event.detail > 1 });
    },
    cancel: activation.current.cancel,
  };
}
