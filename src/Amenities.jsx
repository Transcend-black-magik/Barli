import React from 'react';
const amenities = [
  { name: 'Restaurants', category: 'DINING', image: '/amenity-dining.jpg', alt: 'Restaurant dining room with warmly lit tables and chairs' },
  { name: 'Swimming Pool', category: 'UNWIND', image: '/amenity-pool.jpg', alt: 'Outdoor swimming pool surrounded by sun loungers' },
  { name: 'Spa & Wellness', category: 'RESTORE', image: '/amenity-spa.jpg', alt: 'Spa treatment beds in a softly lit wellness space' },
  { name: 'Fitness Studio', category: 'MOVE', image: '/amenity-gym.jpg', alt: 'Fitness studio with exercise machines and strength equipment' },
  { name: 'Bar & Cocktails', category: 'SAVOUR', image: '/amenity-bar.jpg', alt: 'Atmospheric bar and restaurant with a drinks counter' },
  { name: 'Poolside Retreat', category: 'RELAX', image: '/amenity-lounge.jpg', alt: 'Resort swimming pool with loungers and lush surroundings' },
];
export default function Amenities({ revealed = true }) {
  const [paused, setPaused] = React.useState(false);
  return <section className={`amenities-section${revealed ? ' amenities-entered' : ''}`} aria-labelledby="amenities-heading">
    <div className="amenities-title-row"><h2 id="amenities-heading">AMENITIES</h2><button className="amenities-motion-control" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play amenities carousel' : 'Pause amenities carousel'} aria-pressed={paused}><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="m4 2 10 6-10 6Z"/> : <path d="M3 2h3v12H3zm7 0h3v12h-3z"/>}</svg>{paused ? 'Play gallery' : 'Pause gallery'}</button></div>
    <div className="amenities-rule"><span>Spaces for every part of your stay</span></div>
    <div className={`amenities-gallery amenities-marquee${paused ? ' is-paused' : ''}`} tabIndex={0} aria-label="Amenities gallery. Pauses when focused.">
      <div className="amenities-track">{[...amenities, ...amenities].map((item, index) => <article className={`amenity-card${index >= amenities.length ? ' amenity-duplicate' : ''}`} aria-hidden={index >= amenities.length ? true : undefined} key={`${item.name}-${index}`} style={{ '--amenity-delay': `${.3 + index % amenities.length * .15}s` }}><div className="amenity-image"><img src={item.image} alt={index >= amenities.length ? '' : item.alt} loading="lazy" /></div><div className="amenity-caption"><h3>{item.name}</h3><span>{item.category}</span></div></article>)}</div>
    </div>
  </section>;
}
