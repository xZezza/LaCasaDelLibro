// Defer pointer selection so the second tap can open the close-up first.
export function createLibraryActivation({ select, zoom, now = () => performance.now(), schedule = setTimeout, unschedule = clearTimeout, delay = 350 }) {
  let pending = null;
  function cancel() {
    if (pending) unschedule(pending.timer);
    pending = null;
  }
  function suspend() { if (pending) unschedule(pending.timer); }
  function activate(id, { keyboard = false, double = false } = {}) {
    if (keyboard) { cancel(); select(id); return; }
    if (double || (pending?.id === id && now() - pending.at <= delay)) {
      cancel(); zoom(id); return;
    }
    cancel();
    const candidate = { id, at: now() };
    pending = candidate;
    candidate.timer = schedule(() => {
      if (pending !== candidate) return;
      pending = null; select(id);
    }, delay);
  }
  return { activate, cancel, suspend };
}
