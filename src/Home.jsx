import React from 'react';
import SiteHeader from './SiteHeader.jsx';

export default function Home() {
  const [booking, setBooking] = React.useState(false);
  const [stay, setStay] = React.useState({ location: '', checkIn: '', checkOut: '', adults: '2', rooms: '1' });
  const [summary, setSummary] = React.useState(null);
  const formRef = React.useRef(null);
  const today = new Date().toLocaleDateString('en-CA');
  const nextDate = value => {
    const date = new Date(value + 'T12:00:00');
    date.setDate(date.getDate() + 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const updateStay = event => {
    const { name, value } = event.target;
    setStay(previous => ({ ...previous, [name]: value,
      ...(name === 'checkIn' && previous.checkOut && previous.checkOut <= value ? { checkOut: '' } : {}) }));
    formRef.current?.querySelectorAll('input,select').forEach(field => field.setCustomValidity(''));
  };
  const submitStay = event => {
    event.preventDefault();
    const rooms = event.currentTarget.elements.rooms;
    if (Number(stay.rooms) > Number(stay.adults)) {
      rooms.setCustomValidity('Please select at least one adult per room.');
      rooms.reportValidity();
      return;
    }
    setSummary({ ...stay, location: stay.location.trim(), nights: Math.round((new Date(stay.checkOut + 'T12:00:00') - new Date(stay.checkIn + 'T12:00:00')) / 86400000) });
    setBooking(true);
  };
  const focusBooking = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formRef.current?.elements.location.focus({ preventScroll: true });
  };
  const dialogRef = React.useRef(null);
  const openBooking = () => { setSummary(null); setBooking(true); };

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
            <button className="stay-primary" type="button" onClick={focusBooking}>Book Now</button>
            <button className="stay-secondary" type="button" onClick={openBooking}><svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg> Contact Us</button>
          </div>
        </div>
        <div className="stay-gallery" aria-label="Explore Barli hotel spaces">
          <figure className="stay-image stay-image-main"><img src="/hotel-lounge-neutral.webp" alt="A sunlit hotel lounge with cream seating, warm wood, and a leafy indoor palm" fetchPriority="high" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-seating.jpg" alt="Green lounge chairs and warm natural finishes in the hotel" /></figure>
          <figure className="stay-image stay-image-detail"><img src="/hotel-lighting.jpg" alt="Pendant lights and stone details in the hotel interior" /></figure>
        </div>
        <form className="stay-search" aria-label="Find your stay" ref={formRef} onSubmit={submitStay}>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span className="search-field"><span>Location</span><input name="location" value={stay.location} onChange={updateStay} placeholder="Your destination" required maxLength={80} pattern=".*\\S.*" autoComplete="address-level2" /></span></label>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-12 5h6m-3-3 3 3-3 3"/></svg></span><span className="search-field"><span>Check-In</span><input aria-label="Check-in date" name="checkIn" type="date" value={stay.checkIn} onChange={updateStay} min={today} required /></span></label>
          <label className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-6 5H9m3-3-3 3 3 3"/></svg></span><span className="search-field"><span>Check-Out</span><input aria-label="Check-out date" name="checkOut" type="date" value={stay.checkOut} onChange={updateStay} min={stay.checkIn ? nextDate(stay.checkIn) : nextDate(today)} required /></span></label>
          <div className="search-control"><span className="search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4.5"/></svg></span><div className="search-field"><span>Rooms For</span><div className="guest-selects"><select aria-label="Adults" name="adults" value={stay.adults} onChange={updateStay}>{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Adult' : 'Adults'}</option>)}</select><select aria-label="Rooms" name="rooms" value={stay.rooms} onChange={updateStay}>{Array.from({ length: 6 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Room' : 'Rooms'}</option>)}</select></div></div></div>
          <button className="stay-search-submit" type="submit">Find Room</button>
        </form>
      </section>
      <dialog className="booking-dialog" ref={dialogRef} onCancel={() => setBooking(false)} onClick={event => { if (event.target === event.currentTarget) setBooking(false); }}>
        <button className="booking-close" type="button" aria-label="Close" onClick={() => setBooking(false)}>&times;</button>
        <span className="booking-eyebrow">BARLI HOTEL</span>
        <h2>{summary ? 'Your stay details' : 'Your stay begins here.'}</h2>
        {summary ? <>
          <dl className="stay-summary">
            <div><dt>Destination</dt><dd>{summary.location}</dd></div>
            <div><dt>Check-in</dt><dd>{new Date(summary.checkIn + 'T12:00:00').toLocaleDateString(undefined, { dateStyle: 'medium' })}</dd></div>
            <div><dt>Check-out</dt><dd>{new Date(summary.checkOut + 'T12:00:00').toLocaleDateString(undefined, { dateStyle: 'medium' })}</dd></div>
            <div><dt>Your stay</dt><dd>{summary.nights} {summary.nights === 1 ? 'night' : 'nights'}, {summary.adults} adults, {summary.rooms} {summary.rooms === '1' ? 'room' : 'rooms'}</dd></div>
          </dl>
          <p>Online availability and reservations are not connected yet. These are your selected details; no booking has been made.</p>
          <button className="stay-primary" type="button" onClick={() => setBooking(false)}>Edit stay details</button>
        </> : <>
        <p>Room reservations, dining and events are coming soon. Discover the story behind Barli in the meantime.</p>
        <a href="/our-story/">Explore Our Story <span aria-hidden="true">&#8599;</span></a></> }
      </dialog>
    </main>
  );
}
