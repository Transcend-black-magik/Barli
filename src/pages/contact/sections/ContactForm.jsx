import React from 'react';
import { downloadRequest } from '../../../utils/forms/booking.js';
import '../../../components/forms/forms.css';

export default function ContactForm() {
  const [message, setMessage] = React.useState(null);
  const submit = event => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name')).trim(), body = String(fields.get('message')).trim();
    if (!name || !body) return;
    setMessage({ name, email: String(fields.get('email')).trim(), topic: String(fields.get('topic')), body });
  };
  return <section className="contact-form-panel" aria-labelledby="contact-form-title"><span className="page-eyebrow">A CONVERSATION STARTS HERE</span><h2 id="contact-form-title">Tell us a <em>little more.</em></h2><form className="editorial-form" onSubmit={submit} onChange={() => setMessage(null)}><div className="form-two"><label>Your name<input name="name" autoComplete="name" maxLength={100} required pattern=".*\S.*" /></label><label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required /></label></div><label>What brings you here?<select name="topic"><option>A stay at Barli</option><option>Dining &amp; experiences</option><option>Events &amp; gatherings</option><option>Something else</option></select></label><label>Your message<textarea name="message" rows={5} minLength={10} maxLength={3000} required /></label><button className="navy-button" type="submit">Prepare your message <span aria-hidden="true">↗</span></button><small>Our online inbox is being connected. Prepare and download your message here; nothing is sent or stored.</small></form>{message && <div className="form-receipt" role="status"><span className="page-eyebrow">YOUR MESSAGE, READY</span><h3>Thank you, {message.name}.</h3><p>Your note about “{message.topic}” is ready to keep and share with the hotel.</p><button className="text-button" type="button" onClick={() => downloadRequest('barli-contact-message.txt', `BARLI CONTACT MESSAGE\n\nName: ${message.name}\nEmail: ${message.email}\nTopic: ${message.topic}\n\n${message.body}\n\nPrepared locally. This message has not been sent.`)}>Download your message ↓</button></div>}</section>;
}
