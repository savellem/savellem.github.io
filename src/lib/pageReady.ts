/**
 * astro:page-load's *first* firing (initial site visit) is bound to the
 * browser's native `window` `load` event, which waits for every
 * eagerly-loaded resource on the page — fonts, non-lazy images, and
 * third-party scripts like GA — to finish downloading. On a slow mobile
 * connection that can take several real seconds, during which nothing
 * gated behind astro:page-load runs at all: scroll reveals stay hidden,
 * count-up numbers sit at 0, the mobile menu button doesn't even respond
 * to taps yet — despite the page looking fully rendered.
 *
 * `onPageReady` instead runs `fn` as soon as the DOM is parsed (not
 * gated by resource loading) for the initial visit, then via
 * astro:page-load for every subsequent ClientRouter navigation —
 * skipping that event's own first, redundant firing.
 */
export function onPageReady(fn: () => void) {
  let ranInitial = false;
  const runInitial = () => {
    ranInitial = true;
    fn();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitial, { once: true });
  } else {
    runInitial();
  }

  document.addEventListener('astro:page-load', () => {
    if (!ranInitial) {
      ranInitial = true;
      return;
    }
    fn();
  });
}
