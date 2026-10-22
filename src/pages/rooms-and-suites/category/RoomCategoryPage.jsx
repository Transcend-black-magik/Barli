import React from 'react';
import SiteFooter from '../../../components/layout/SiteFooter.jsx';
import usePageReveal from '../../../hooks/usePageReveal.js';
import { roomPath } from '../data/roomCatalog.js';
import '../RoomsJourneys.css';

export default function RoomCategoryPage({ category }) {
  const ref = React.useRef(null);
  usePageReveal(ref);
  return <div className="room-journey-page" ref={ref}><main className="journey-container">
    <a className="back-link" href="/rooms-and-suites/">← All rooms &amp; suites</a>
    <header className="category-intro" data-reveal><div className="reveal-left"><span className="page-eyebrow">THE BARLI ROOM COLLECTION</span><h1>{category.name}<em>Make yourself at home.</em></h1></div><p className="reveal-right">{category.description}</p></header>
    <div className="category-gallery">{category.rooms.map((room, index) => <a className="category-room-card" href={roomPath(room)} key={room.id} data-reveal style={{ '--reveal-delay': `${index * .12}s` }}>
      <figure className="reveal-up"><img src={room.image} alt={room.name} style={{ viewTransitionName: `image-${room.id}` }} fetchPriority={index === 0 ? 'high' : 'auto'} /><span className="room-card-counter">0{index + 1} <span aria-hidden="true">↗</span></span></figure>
      <div className="category-card-copy reveal-up"><span className="page-eyebrow">{category.name}</span><h2>{room.name.replace(category.name + ' — ', '')}</h2><p>{room.note}</p><div><span>Up to {room.maxGuests} guests · Collection preview</span><span>View room ↗</span></div></div>
    </a>)}</div>
    <div className="collection-note">An introduction to the Barli collection. Room names, photographs, and capacities are illustrative; confirm actual features, rates, and availability before booking.</div>
    <a className="back-link" href="/rooms-and-suites/">← Explore another room type</a>
  </main><SiteFooter /></div>;
}
