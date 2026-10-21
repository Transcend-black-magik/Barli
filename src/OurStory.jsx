import React from 'react';
import SiteFooter from './SiteFooter.jsx';
import useEditorialScroll from './useEditorialScroll.js';
import './our-story.css';

const introduction = [
  { number: '04', title: 'WAYS TO MAKE YOURSELF AT HOME', copy: 'From a quiet retreat to a little more indulgence, our room collection is shaped around the simple pleasure of feeling at ease.', image: '/hotel-lounge-neutral.webp', alt: 'Considered lounge design with warm wood and cream seating' },
  { number: '04', title: 'COURSES TO SAVOUR', copy: 'A fresh beginning, something generous, and a sweet finish. Our menu celebrates the moments that bring people to the table.', image: '/amenity-dining.jpg', alt: 'Warmly lit dining space with tables ready for a shared meal' },
  { number: '01', title: 'CITY, COUNTLESS PERSPECTIVES', copy: 'Abuja is part of the experience. A city of striking landmarks, open spaces, and discoveries waiting beyond your room.', image: '/abuja-mosque.jpg', alt: 'The golden dome of the National Mosque in Abuja' },
];
const chapters = [
  { title: 'SPACES TO SETTLE IN', eyebrow: '01 / OUR SPACES', number: '01', copy: 'Soft textures. Natural light. Details that belong together. We believe a space should feel as good as it looks, giving you room to slow down and simply be.', label: 'Our approach', value: 'CONSIDERED COMFORT', images: ['/room-deluxe.jpg', '/hotel-lounge-neutral.webp', '/room-suite.jpg', '/room-garden.jpg'], alts: ['Warm and inviting bedroom', 'Sunlit lounge with natural finishes', 'Comfortable suite interior', 'Restful guest bedroom'] },
  { title: 'MOMENTS WORTH SHARING', eyebrow: '02 / AT THE TABLE', number: '02', copy: 'A long conversation over dinner. A quiet corner before the day begins. The best parts of a stay are often the moments you never needed to plan.', label: 'Our inspiration', value: 'EVERYDAY CONNECTION', images: ['/amenity-dining.jpg', '/amenity-bar.jpg', '/hotel-seating.jpg', '/hotel-lighting.jpg'], alts: ['Welcoming restaurant dining room', 'Atmospheric restaurant and bar', 'Lounge seating for a quiet conversation', 'Warm lighting and thoughtful interior details'] },
  { title: 'ROOM FOR A SLOWER PACE', eyebrow: '03 / FIND YOUR RHYTHM', number: '03', copy: 'Leave a little space in your day. For a refreshing dip, a moment of stillness, or the simple luxury of taking your time. Your stay should move at your pace.', label: 'Our philosophy', value: 'STAY A LITTLE LONGER', images: ['/amenity-spa.jpg', '/amenity-pool.jpg', '/room-penthouse.jpg', '/amenity-gym.jpg'], alts: ['A softly lit spa treatment space', 'Outdoor pool and sun loungers', 'A tranquil bedroom with soft bedding', 'Fitness equipment in a bright studio'] },
];

export default function OurStory() {
  const ref = React.useRef(null);
  useEditorialScroll(ref, '[data-story-stop]');
  React.useEffect(() => {
    let frame = 0, started = false;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('story-visible', entry.isIntersecting)), { threshold: .12 });
    const start = () => {
      if (started) return;
      started = true;
      frame = requestAnimationFrame(() => ref.current?.querySelectorAll('[data-story-reveal]').forEach(element => observer.observe(element)));
    };
    window.addEventListener('barli:page-ready', start);
    if (document.documentElement.dataset.routeTransition !== 'pending') start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('barli:page-ready', start); };
  }, []);
  return <div className="barli-story-page" ref={ref}><main>
    <section className="story-about" aria-labelledby="story-title">
      <header className="story-section-heading" data-story-reveal><p className="story-from-left">LEARN A LITTLE MORE<br />ABOUT THE WAY WE STAY.</p><h1 id="story-title"><span className="story-from-left">ABOUT</span><span className="story-from-right">BARLI</span></h1><span className="story-mini-brand story-from-right">THOUGHTFULLY YOURS.</span></header>
      <div className="story-about-grid"><span className="story-outline-brand" aria-hidden="true">BARLI</span>{introduction.map(item => <article className="story-intro-row" key={item.title} data-story-reveal><figure className="story-from-left"><img src={item.image} alt={item.alt} loading="lazy" /></figure><div className="story-from-right"><span className="story-intro-number">{item.number}</span><h2>{item.title}</h2><p>{item.copy}</p></div></article>)}</div>
    </section>
    {chapters.map((chapter, index) => <section key={chapter.title} className={`story-chapter story-chapter-${index + 1}`} data-story-stop data-story-reveal aria-labelledby={`story-chapter-${index}`}>
      <header className="story-chapter-heading"><span className="story-from-left">{chapter.eyebrow}</span>{index === 0 && <h2 className="story-chapter-banner"><span className="story-from-left">OUR</span><span className="story-from-right">STORY</span></h2>}<span className="story-chapter-number story-from-right" aria-hidden="true">{chapter.number}</span></header>
      <div className="story-mosaic">
        <figure className="story-tile story-tile-tall story-from-left"><img src={chapter.images[0]} alt={chapter.alts[0]} loading="lazy" /></figure>
        <div className="story-chapter-copy story-from-right"><div><h3 id={`story-chapter-${index}`}>{chapter.title}</h3><p>{chapter.copy}</p></div><dl><dt>{chapter.label}</dt><dd>{chapter.value}</dd></dl></div>
        <figure className="story-tile story-tile-wide story-from-right"><img src={chapter.images[1]} alt={chapter.alts[1]} loading="lazy" /></figure>
        <figure className="story-tile story-tile-small story-from-left"><img src={chapter.images[2]} alt={chapter.alts[2]} loading="lazy" /></figure>
        <figure className="story-tile story-tile-end story-from-right"><img src={chapter.images[3]} alt={chapter.alts[3]} loading="lazy" /></figure>
      </div>
    </section>)}
    <section className="story-why" data-story-stop aria-labelledby="story-why-title"><header data-story-reveal><h2 id="story-why-title" className="story-from-left">Why Choose <em>Barli?</em></h2><p className="story-from-right">A thoughtful setting. A warm welcome. Space to make the experience your own.</p></header><div className="story-why-background"><div className="story-why-panel" data-story-reveal><div className="story-why-cards">{[['Team members (sample)', '20+', '/hotel-lounge-neutral.webp'], ['Guest rating (sample)', '4.9/5', '/amenity-dining.jpg'], ['A different perspective', 'Discovery', '/abuja-park.jpg']].map(([label, value, image], index) => <article key={value} className={index === 0 ? 'story-from-left' : 'story-from-right'}><span>{label}<span aria-hidden="true">&#8599;</span></span><div><h3>{value}</h3><img src={image} alt={label} loading="lazy" /></div></article>)}</div><p className="story-sample-note"><strong>Illustrative figures</strong><br />Staff count and guest rating are sample values, not verified hotel statistics.</p><div className="story-values"><span>WARMTH</span><span>CURIOSITY</span><span>COMFORT</span><span>CONNECTION</span></div></div></div></section>
    <section className="story-invitation" data-story-stop><p>Come for a stay.<br /><em>Leave with a story.</em></p><a href="/#booking">Plan your Barli escape <span aria-hidden="true">&#8599;</span></a><small>Photography illustrates the Barli concept. Explore photo credits in the home gallery and location section.</small></section>
  </main><SiteFooter /></div>;
}
