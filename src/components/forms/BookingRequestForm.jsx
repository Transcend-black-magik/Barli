import React from 'react';
import { localDateKey, validateBooking, downloadRequest } from '../../utils/forms/booking.js';
import './forms.css';

export default function BookingRequestForm({ room }) {
  const [values, setValues] = React.useState({ name: '', email: '', checkIn: '', checkOut: '', guests: '2', message: '' });
  const [error, setError] = React.useState('');
  const [review, setReview] = React.useState(null);
  const errorRef = React.useRef(null);
  const update = event => { setValues(previous => ({ ...previous, [event.target.name]: event.target.value })); setError(''); setReview(null); };
  const submit = event => {
    event.preventDefault();
    const validation = validateBooking(values, room.maxGuests);
    if (validation) { setError(validation); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setReview({ ...values, name: values.name.trim(), email: values.email.trim() });
  };
  const text = review ? `BARLI ROOM REQUEST\n\nRoom: ${room.name}\nName: ${review.name}\nEmail: ${review.email}\nArrival: ${review.checkIn}\nDeparture: ${review.checkOut}\nGuests: ${review.guests}\nNotes: ${review.message}\n\nRequest prepared only. Availability, rates, and booking confirmation require hotel approval.` : '';
  return <section className="booking-request" id="room-booking" aria-labelledby="room-booking-title"><span className="page-eyebrow">YOUR NEXT ESCAPE</span><h2 id="room-booking-title">Make it <em>your stay.</em></h2><p>Selected room: <strong>{room.name}</strong></p>
    <form className="editorial-form" onSubmit={submit}>
      <div className="form-two"><label>Your name<input name="name" value={values.name} onChange={update} autoComplete="name" maxLength={100} required /></label><label>Email address<input type="email" name="email" value={values.email} onChange={update} autoComplete="email" maxLength={254} required /></label></div>
      <div className="form-two"><label>Check-in<input type="date" name="checkIn" min={localDateKey()} value={values.checkIn} onChange={update} required /></label><label>Check-out<input type="date" name="checkOut" min={values.checkIn || localDateKey()} value={values.checkOut} onChange={update} required /></label></div>
      <label>Guests<select name="guests" value={values.guests} onChange={update}>{Array.from({ length: room.maxGuests }, (_, index) => <option key={index} value={index + 1}>{index + 1} {index ? 'guests' : 'guest'}</option>)}</select></label>
      <label>Anything that would make your stay special?<textarea name="message" value={values.message} onChange={update} rows={3} maxLength={2000} /></label>
      {error && <p className="form-error" role="alert" ref={errorRef} tabIndex={-1}>{error}</p>}
      <button className="navy-button" type="submit">Review booking request <span aria-hidden="true">↗</span></button>
      <small>Live reservations are not connected. Preparing a request does not reserve this room or send your details.</small>
    </form>
    {review && <div className="form-receipt" role="status"><span className="page-eyebrow">READY TO REVIEW</span><h3>Your room request</h3><p>{room.name}<br />{review.checkIn} — {review.checkOut}<br />{review.guests} guests · {review.name}</p><p>Keep a copy to share with the hotel when confirming your stay.</p><button className="text-button" type="button" onClick={() => downloadRequest(`barli-${room.id}-request.txt`, text)}>Download your request <span aria-hidden="true">↓</span></button></div>}
  </section>;
}
