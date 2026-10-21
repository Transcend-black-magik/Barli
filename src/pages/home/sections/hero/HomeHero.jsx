import React from 'react';

export default function HomeHero({ stay, setStay, formRef, submitStay, updateStay, today, nextDate, focusBooking, openBooking }) {
  return (
<section className="stay-hero" aria-labelledby="stay-title">
        <div className="stay-copy">
          <div className="stay-eyebrow">Book Your Perfect Stay Today</div>
          <h1 id="stay-title"><span className="stay-title-line"><span className="stay-discover">Discover</span> Unparalleled</span><br /><span className="stay-title-line">Comfort &amp; Luxury</span></h1>
          <p className="stay-intro">Experience world-class hospitality, breathtaking views, and premium amenities. Your dream vacation starts with just one click.</p>
          <div className="stay-ctas">
            <button className="stay-primary" type="button" onClick={focusBooking}>Book Now</button>
            <button className="stay-secondary" type="button" onClick={openBooking}><svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg> Contact Us</button>
          </div>
        </div>
        <div className="stay-gallery" aria-label="Explore Barli hotel spaces">
          <figure className="stay-image stay-image-main"><img src="/hotel-lounge-neutral.webp" alt="A sunlit hotel lounge with cream seating, warm wood, and a leafy indoor palm" fetchPriority="high" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-seating.jpg" alt="Green lounge chairs and warm natural finishes in the hotel" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-lighting.jpg" alt="Pendant lights and stone details in the hotel interior" /></figure>
        </div>
        <form id="booking" className="stay-search" aria-label="Find your stay" ref={formRef} onSubmit={submitStay}>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span className="search-field"><span>Location</span><input name="location" value={stay.location} onChange={updateStay} placeholder="Your destination" required maxLength={80} pattern=".*\\S.*" autoComplete="address-level2" /></span></label>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-12 5h6m-3-3 3 3-3 3"/></svg></span><span className="search-field"><span>Check-In</span><input aria-label="Check-in date" name="checkIn" type="date" value={stay.checkIn} onChange={updateStay} min={today} required /></span></label>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-6 5H9m3-3-3 3 3 3"/></svg></span><span className="search-field"><span>Check-Out</span><input aria-label="Check-out date" name="checkOut" type="date" value={stay.checkOut} onChange={updateStay} min={stay.checkIn ? nextDate(stay.checkIn) : nextDate(today)} required /></span></label>
          <div className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4.5"/></svg></span><div className="search-field"><span>Rooms For</span><select aria-label="Guests and rooms" name="party" value={`${stay.adults}-${stay.rooms}`} onChange={event => { const [adults, rooms] = event.target.value.split('-'); setStay(previous => ({ ...previous, adults, rooms })); }}>{Array.from({ length: 12 }, (_, i) => i + 1).flatMap(adults => Array.from({ length: Math.min(adults, 6) }, (_, i) => <option key={`${adults}-${i + 1}`} value={`${adults}-${i + 1}`}>{adults} {adults === 1 ? 'Adult' : 'Adults'}, {i + 1} {i === 0 ? 'Room' : 'Rooms'}</option>))}</select></div></div>
          <button className="stay-search-submit" type="submit">Find Room</button>
        </form>
      </section>
  );
}
