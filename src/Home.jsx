import React from 'react';
import SiteHeader from './SiteHeader.jsx';

export default function Home() {
  const [booking, setBooking] = React.useState(false);
  const dialogRef = React.useRef(null);
  const openBooking = () => setBooking(true);

  React.useEffect(() => {
    if (booking) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [booking]);

  return (
    <main className="stay-home">
      <SiteHeader onAction={openBooking} />
      <section className="stay-hero" aria-labelledby="stay-title">
        <div className="stay-copy">
          <div className="stay-eyebrow">Book Your Perfect Stay Today</div>
          <h1 id="stay-title"><span className="stay-title-line"><span className="stay-discover">Discover</span> Unparalleled</span><br /><span className="stay-title-line">Comfort &amp; Luxury</span></h1>
          <p className="stay-intro">Experience world-class hospitality, breathtaking views, and premium amenities. Your dream vacation starts with just one click.</p>
          <div className="stay-ctas">
            <button className="stay-primary" type="button" onClick={openBooking}>Book Now</button>
            <button className="stay-secondary" type="button" onClick={openBooking}><svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg> Contact Us</button>
          </div>
        </div>
        <div className="stay-gallery" aria-label="Explore Barli hotel spaces">
          <figure className="stay-image stay-image-main"><img src="/hotel-lounge-neutral.webp" alt="A sunlit hotel lounge with cream seating, warm wood, and a leafy indoor palm" fetchPriority="high" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-seating.jpg" alt="Green lounge chairs and warm natural finishes in the hotel" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-lighting.jpg" alt="Pendant lights and stone details in the hotel interior" /></figure>
        </div>
        <div className="stay-search" aria-label="Stay search options">
          <button type="button" onClick={openBooking}><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span><small>Location</small><b>Your destination</b></span></button>
          <button type="button" onClick={openBooking}><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-12 5h6m-3-3 3 3-3 3"/></svg></span><span><small>Check-In</small><b>Add dates</b></span></button>
          <button type="button" onClick={openBooking}><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-6 5H9m3-3-3 3 3 3"/></svg></span><span><small>Check-Out</small><b>Add dates</b></span></button>
          <button type="button" onClick={openBooking}><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4.5"/></svg></span><span><small>Rooms For</small><b>2 Adults, 1 Room</b></span></button>
          <button className="stay-search-submit" type="button" onClick={openBooking}>Find Room</button>
        </div>
      </section>
      <dialog className="booking-dialog" ref={dialogRef} onCancel={() => setBooking(false)} onClick={event => { if (event.target === event.currentTarget) setBooking(false); }}>
        <button className="booking-close" type="button" aria-label="Close" onClick={() => setBooking(false)}>&times;</button>
        <span className="booking-eyebrow">BARLI HOTEL</span>
        <h2>Your stay begins here.</h2>
        <p>Room reservations, dining and events are coming soon. Discover the story behind Barli in the meantime.</p>
        <a href="/our-story/">Explore Our Story <span aria-hidden="true">&#8599;</span></a>
      </dialog>
    </main>
  );
}
