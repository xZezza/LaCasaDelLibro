import { useEffect } from "react";
export default function ModalAccessibility({ open }) {
  useEffect(() => {
    if (!open) return;
    const dialog = document.querySelector(".salon-dialog");
    if (!dialog) return;
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = [
      ...document.querySelectorAll(".salon-landing > *"),
    ].filter((el) => !el.contains(dialog));
    const previous = siblings.map((el) => el.inert);
    siblings.forEach((el) => (el.inert = true));
    const focusable = () =>
      [
        ...dialog.querySelectorAll('button,a[href],input,select,textarea,[contenteditable="true"],[tabindex="0"]'),
      ].filter((el) => !el.disabled && el.getClientRects().length);
    (focusable()[0] || dialog).focus({ preventScroll: true });
    function trap(e) {
      if (e.key !== "Tab") return;
      const list = focusable(),
        first = list[0],
        last = list.at(-1);
      if (!first) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = overflow;
      siblings.forEach((el, i) => (el.inert = previous[i]));
      document.removeEventListener("keydown", trap);
      if (before?.isConnected) before.focus?.({ preventScroll: true });
    };
  }, [open]);
  return null;
}
