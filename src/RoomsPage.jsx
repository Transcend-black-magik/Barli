import React from 'react';
import SiteFooter from './SiteFooter.jsx';
import './rooms-page.css';

const roomCollection = [
  { name: 'Deluxe Room', image: '/room-deluxe.jpg', alt: 'An inviting bedroom with a large bed and warm lighting', title: 'A little everyday luxury.', description: 'Soft light, thoughtful details, and a space that invites you to slow down. A comfortable beginning to your Barli experience.', mood: 'CALM / COMFORT / CONSIDERED DESIGN' },
  { name: 'Garden Retreat', image: '/room-garden.jpg', alt: 'A bright bedroom with neutral bedding and natural finishes', title: 'Find your quieter rhythm.', description: 'Leave the rush outside. A fresh, restful setting for unhurried mornings, a good book, and a little time to yourself.', mood: 'FRESH PERSPECTIVES / SLOW MORNINGS' },
  { name: 'Signature Suite', image: '/room-suite.jpg', alt: 'An elegant suite with a generous bed and contemporary furnishings', title: 'Make room for more.', description: 'A considered setting for a memorable escape. Settle into a little more indulgence, with a sense of ease in every detail.', mood: 'ELEGANT SPACES / TIME TO UNWIND' },
  { name: 'The Penthouse', image: '/room-penthouse.jpg', alt: 'A refined hotel room with warm textures and luxurious bedding', title: 'A stay above the ordinary.', description: 'An expressive finish to the Barli collection. Your own space to reconnect, celebrate, and make the most of being away.', mood: 'YOUR ESCAPE / YOUR OWN PACE' },
];

function RoomFeature({ room, index, scrollStop = false }) {
  return <article className={`collection-room${index % 2 ? ' room-reversed' : ''}`} id={`collection-room-${index + 1}`} data-room-stop={scrollStop ? '' : undefined} key={room.name}>
          <div className="collection-room-copy"><span className="collection-room-kicker">THE BARLI COLLECTION / 0{index + 1}</span><h3>{room.name}<span aria-hidden="true">&mdash;</span></h3><h4>{room.title}</h4><p>{room.description}</p><span className="collection-room-mood">{room.mood}</span><a href="/#booking">Enquire about this stay <span aria-hidden="true">&#8599;</span></a></div>
          <figure className="collection-room-image"><span className="collection-room-frame" aria-hidden="true" /><span className="collection-room-number" aria-hidden="true">0{index + 1}</span><div><img src={room.image} alt={room.alt} loading="lazy" /></div></figure>
        </article>;
}

function useRoomsScroll(rootRef) {
  React.useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0, locked = false, cooldown = 0, touchStart = null, touchUsed = false;
    let gesture = 0, previousInput = 0;
    const cancel = () => { cancelAnimationFrame(frame); locked = false; gesture = 0; };
    const move = (delta, event) => {
      if (!motion.matches || delta === 0 || event.target.closest('input,select,textarea,button,dialog')) return;
      if (locked || performance.now() < cooldown) { event.preventDefault(); return; }
      const header = document.querySelector('.shared-header')?.offsetHeight || 80;
      const current = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const sections = [...root.querySelectorAll('[data-room-stop]')];
      const stops = [0, ...sections.map(section => Math.round(Math.max(0, Math.min(max, section.getBoundingClientRect().top + current - header - 20))))].filter((stop, index, values) => index === 0 || stop - values[index - 1] > 60);
      const destination = delta > 0 ? stops.find(stop => stop > current + 8) : [...stops].reverse().find(stop => stop < current - 8);
      if (destination === undefined || current > stops.at(-1) + 10) return;
      event.preventDefault();
      const now = performance.now();
      if (now - previousInput > 180 || Math.sign(gesture) !== Math.sign(delta)) gesture = 0;
      previousInput = now;
      gesture += delta;
      if (Math.abs(gesture) < 20) return;
      gesture = 0;
      locked = true;
      const start = performance.now();
      const animate = time => {
        const p = Math.min(1, (time - start) / 1150);
        const eased = p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        window.scrollTo({ top: current + (destination - current) * eased, behavior: 'instant' });
        if (p < 1) frame = requestAnimationFrame(animate);
        else { locked = false; cooldown = performance.now() + 250; }
      };
      frame = requestAnimationFrame(animate);
    };
    const wheel = event => { if (!event.ctrlKey && Math.abs(event.deltaY) > Math.abs(event.deltaX)) move(event.deltaY, event); };
    const touchstart = event => { cancel(); cooldown = 0; touchUsed = false; touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; };
    const touchmove = event => {
      if (!touchStart || event.touches.length !== 1) return;
      const dy = touchStart.y - event.touches[0].clientY, dx = touchStart.x - event.touches[0].clientX;
      if (Math.abs(dx) > Math.abs(dy) || Math.abs(dy) < 30) return;
      if (touchUsed) { if (event.cancelable) event.preventDefault(); return; }
      move(dy, event); if (locked) touchUsed = true;
    };
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('touchstart', touchstart, { passive: true });
    window.addEventListener('touchmove', touchmove, { passive: false });
    window.addEventListener('keydown', cancel); window.addEventListener('resize', cancel);
    return () => { cancel(); window.removeEventListener('wheel', wheel); window.removeEventListener('touchstart', touchstart); window.removeEventListener('touchmove', touchmove); window.removeEventListener('keydown', cancel); window.removeEventListener('resize', cancel); };
  }, [rootRef]);
}

export default function RoomsPage() {
  const ref = React.useRef(null);
  useRoomsScroll(ref);
  React.useEffect(() => {
    let frame = 0, started = false;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('feature-visible', entry.isIntersecting)), { threshold: .15 });
    const start = () => {
      if (started) return;
      started = true;
      // Let the page slide finish before triggering its own side entrances.
      frame = requestAnimationFrame(() => {
        ref.current?.querySelectorAll('.collection-room, .rooms-editorial-heading').forEach(element => observer.observe(element));
      });
    };
    window.addEventListener('barli:page-ready', start);
    if (document.documentElement.dataset.routeTransition !== 'pending') start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('barli:page-ready', start); };
  }, []);
  return <div className="rooms-story-page" ref={ref}>
    <main>
      <section className="rooms-editorial" id="our-rooms" aria-labelledby="our-rooms-heading">
        <header className="rooms-editorial-heading"><p>SPACES TO SETTLE IN.<br />MOMENTS TO MAKE YOUR OWN.</p><h1 id="our-rooms-heading"><span className="heading-our">OUR</span><span className="heading-rooms">ROOMS</span></h1><span className="rooms-collection-mark">BARLI / 04</span></header>
        <RoomFeature room={roomCollection[0]} index={0} />
        <div className="rooms-paired-features" data-room-stop>
          <RoomFeature room={roomCollection[1]} index={1} />
          <RoomFeature room={roomCollection[2]} index={2} />
        </div>
        <RoomFeature room={roomCollection[3]} index={3} scrollStop />
        <div className="rooms-editorial-end" data-room-stop><p>Your next chapter begins with a little escape.</p><a href="/#booking">Find your stay <span aria-hidden="true">&#8599;</span></a><small>Collection photography is illustrative. Confirm room features and availability before booking.</small></div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
