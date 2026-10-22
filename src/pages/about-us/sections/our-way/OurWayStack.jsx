import React from 'react';

const values = [
  ['Comfort, considered.', 'Spaces that feel easy to settle into, with warmth in the smallest details.', '/room-deluxe.jpg'],
  ['Moments, shared.', 'A place at the table. A good conversation. Time that feels well spent.', '/amenity-dining.jpg'],
  ['Your pace, always.', 'Unhurried mornings and a little space for whatever makes you feel yourself.', '/amenity-spa.jpg'],
];

export default function OurWayStack() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const root = ref.current;
    const scene = root.querySelector('.about-stack-scene');
    const first = root.querySelector('.about-way');
    const motion = window.matchMedia('(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    const draw = () => {
      frame = 0;
      const header = document.querySelector('.shared-header')?.offsetHeight || 80;
      const progress = motion.matches ? Math.max(0, Math.min(1, (header - root.getBoundingClientRect().top) / Math.max(1, root.offsetHeight - scene.offsetHeight))) : 0;
      root.style.setProperty('--about-lift', `${-105 * progress}%`);
      root.classList.toggle('is-values-visible', !motion.matches || progress > .25);
      first.inert = motion.matches && progress > .98;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    schedule(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule); motion.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); motion.removeEventListener('change', schedule); };
  }, []);
  return <div className="about-stack" ref={ref}><div className="about-stack-scene">
    <section className="about-way" aria-labelledby="about-way-title"><figure><img src="/hotel-lounge-neutral.webp" alt="Soft cream seating and thoughtful natural textures in a bright hotel lounge" loading="lazy" /></figure><div><span className="page-eyebrow">OUR WAY OF WELCOMING YOU</span><h2 id="about-way-title">A stay with<br />a little more <em>soul.</em></h2><p>We imagine hospitality as a feeling, rather than a list of things. A space that lets you exhale. A meal that becomes a memory. A welcome that makes arriving feel effortless.</p><p>Barli brings those little moments together, with considered spaces and time to make the stay your own.</p><a className="underlined-link" href="/rooms-and-suites/">Find your space <span aria-hidden="true">↗</span></a></div></section>
    <section className="about-values" aria-labelledby="about-values-title"><header><span className="page-eyebrow">IT'S THE LITTLE THINGS</span><h2 id="about-values-title">The details make<br /><em>the difference.</em></h2></header><div>{values.map(([title, copy, image], index) => <article key={title} style={{ '--value-delay': `${index * .14}s` }}><figure><img src={image} alt={title} loading="lazy" /></figure><span className="page-eyebrow">0{index + 1} / THE BARLI FEELING</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  </div></div>;
}
