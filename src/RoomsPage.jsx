import React from 'react';
import SiteFooter from './SiteFooter.jsx';
import { getRoomPairHeight } from './scrollPolicy.js';
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

export default function RoomsPage() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const pair = ref.current.querySelector('.rooms-paired-features');
    const copies = [...pair.querySelectorAll('.collection-room-copy')];
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const style = getComputedStyle(pair);
        const rows = [...pair.querySelectorAll('.collection-room')];
        const rowStyle = getComputedStyle(rows[0]);
        const layout = getRoomPairHeight({
          viewportHeight: window.visualViewport?.height ?? window.innerHeight,
          headerHeight: document.querySelector('.shared-header')?.offsetHeight || 80,
          copyHeights: copies.map(copy => copy.scrollHeight),
          gap: parseFloat(style.rowGap) || 0,
          outerPadding: parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
          rowPadding: parseFloat(rowStyle.paddingTop) + parseFloat(rowStyle.paddingBottom),
        });
        pair.style.setProperty('--room-pair-height', `${layout.height}px`);
        pair.dataset.fitsViewport = String(layout.fitsViewport);
      });
    };
    const observer = new ResizeObserver(measure);
    copies.forEach(copy => observer.observe(copy));
    window.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('resize', measure);
    document.fonts.ready.then(measure);
    measure();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', measure); window.visualViewport?.removeEventListener('resize', measure); };
  }, []);
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
