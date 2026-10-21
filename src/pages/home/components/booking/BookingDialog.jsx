import React from 'react';

export default function BookingDialog({ dialogRef, summary, setBooking }) {
  return (
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
  );
}
