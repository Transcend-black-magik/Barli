import React from 'react';

export default function usePageReveal(ref) {
  React.useEffect(() => {
    let frame = 0, started = false;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-revealed', entry.isIntersecting)), { threshold: .1 });
    const start = () => {
      if (started) return;
      started = true;
      frame = requestAnimationFrame(() => ref.current?.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element)));
    };
    window.addEventListener('barli:page-ready', start);
    if (document.documentElement.dataset.routeTransition !== 'pending') start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('barli:page-ready', start); };
  }, [ref]);
}
