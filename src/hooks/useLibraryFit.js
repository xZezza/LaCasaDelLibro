import { useLayoutEffect, useRef } from 'react';
import { BREAKPOINTS, MEDIA_QUERIES } from '../config/breakpoints.js';

// Fit the complete room uniformly: book/object ratios and pointer coordinates stay aligned.
export default function useLibraryFit(open) {
  const dialogRef = useRef(null);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const desktop = matchMedia(MEDIA_QUERIES.desktop);
    let frame = 0;
    function fit() {
      if (!dialog.isConnected) return;
      for (const title of dialog.querySelectorAll('[data-book-id] .salon-s224')) {
        title.style.fontSize = '20px';
        const available = title.clientHeight;
        if (available > 0 && title.scrollHeight > available + 1) {
          title.style.fontSize = `${20 * available / title.scrollHeight * .97}px`;
        }
      }
      if (!desktop.matches) { dialog.style.removeProperty('--library-scale'); return; }
      dialog.style.maxWidth = `${BREAKPOINTS.desktopMax}px`;
      dialog.style.setProperty('--library-scale', '1');
      const inset = getComputedStyle(dialog.parentElement);
      const availableW = innerWidth - parseFloat(inset.paddingLeft) - parseFloat(inset.paddingRight) - 2;
      const availableH = innerHeight - parseFloat(inset.paddingTop) - parseFloat(inset.paddingBottom) - 2;
      const scale = Math.min(1, availableW / dialog.offsetWidth, availableH / Math.max(dialog.scrollHeight, dialog.offsetHeight));
      dialog.style.setProperty('--library-scale', String(scale));
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); }
    fit();
    const observer = new ResizeObserver(schedule);
    [...dialog.children].filter(el => el.tagName === 'DIV').forEach(el => observer.observe(el));
    window.addEventListener('resize', schedule); desktop.addEventListener('change', schedule);
    document.fonts?.ready.then(schedule);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', schedule); desktop.removeEventListener('change', schedule); };
  }, [open]);
  return dialogRef;
}
