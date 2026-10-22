import React from 'react';
import SiteFooter from '../../../components/layout/SiteFooter.jsx';
import BookingRequestForm from '../../../components/forms/BookingRequestForm.jsx';
import usePageReveal from '../../../hooks/usePageReveal.js';
import { categoryPath } from '../data/roomCatalog.js';
import '../RoomsJourneys.css';

export default function RoomDetailsPage({ room }) {
  const ref = React.useRef(null);
  const [activeImage, setActiveImage] = React.useState(room.image);
  usePageReveal(ref);
  const images = [...new Set([room.image, ...room.gallery])];
  return <div className="room-journey-page" ref={ref}><main className="journey-container">
    <a className="back-link" href={categoryPath(room.categorySlug)}>← Back to {room.categoryName}</a>
    <header className="room-detail-heading" data-reveal><div className="reveal-left"><span className="page-eyebrow">{room.categoryName} / YOUR OWN LITTLE ESCAPE</span><h1>{room.name.split(' — ')[1]}<em>{room.categoryName}</em></h1></div><a className="navy-button reveal-right" href="#room-booking">Request this room ↗</a></header>
    <figure className="room-detail-hero"><img src={activeImage} alt={room.name} style={{ viewTransitionName: `image-${room.id}` }} fetchPriority="high" /></figure>
    <div className="room-photo-picker" aria-label="Room photographs">{images.map((image, index) => <button type="button" key={image} aria-pressed={image === activeImage} aria-label={`Show room photograph ${index + 1}`} onClick={() => setActiveImage(image)}><img src={image} alt="" /></button>)}</div>
    <div className="room-detail-layout"><section className="room-description" data-reveal><div className="reveal-left"><span className="page-eyebrow">SETTLE INTO SOMETHING SPECIAL</span><h2>A little space.<br /><em>A lot of possibility.</em></h2><p>{room.description}</p><dl className="room-facts"><div><dt>Room collection</dt><dd>{room.categoryName}</dd></div><div><dt>Guests</dt><dd>Up to {room.maxGuests} · sample capacity</dd></div><div><dt>Rates &amp; availability</dt><dd>On request</dd></div><div><dt>Check-in / Check-out</dt><dd>Confirm with the hotel</dd></div></dl><h3>The feeling of a Barli stay</h3><ul>{room.features.map(feature => <li key={feature}>{feature}</li>)}</ul><p className="collection-note">Photographs and specifications are collection previews. The hotel must confirm the final room, inclusions, capacity, and price.</p></div></section><BookingRequestForm room={room} /></div>
  </main><SiteFooter /></div>;
}
