import React from 'react';

const questions = [
  ['What are the check-in and check-out times?', 'Check-in begins at 3:00 pm, and check-out is by noon. Please contact the hotel to discuss an earlier arrival or later departure.'],
  ['How can I plan a stay at Barli?', 'Use the booking form to enter your destination, dates, and party size. It currently provides a stay summary; live availability and online reservations are not connected yet.'],
  ['What types of accommodation can I explore?', 'Explore Deluxe Room, Garden Retreat, Signature Suite, and The Penthouse in our Rooms & Suites collection. Room details and imagery are illustrative while our final collection is being confirmed.'],
  ['Where can I find room rates and availability?', 'The room collection shows sample rates for illustration. Confirm current rates and availability directly with the hotel before making travel arrangements.'],
  ['What is the cancellation policy?', 'Cancellation terms depend on the rate and booking conditions. Ask for the applicable terms before confirming your reservation.'],
  ['Can I request airport transfers or special arrangements?', 'Please discuss transport, accessibility requirements, dietary preferences, and other requests with the hotel before booking so availability can be confirmed.'],
];

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  return <article className={`faq-item${open ? ' is-open' : ''}`}>
    <h3 className="faq-question-heading"><button className="faq-question" id={`${id}-question`} type="button" aria-expanded={open} aria-controls={`${id}-answer`} onClick={() => setOpen(value => !value)}><span className="faq-number">0{index + 1}</span><span>{question}</span><svg className="faq-plus" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M3 10h14"/><path className="faq-plus-vertical" d="M10 3v14"/></svg></button></h3>
    <div className="faq-reveal" id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} aria-hidden={!open} inert={!open}><div className="faq-reveal-inner"><div className="faq-answer"><p>{answer}</p></div></div></div>
  </article>;
}

export default function FAQ() {
  return <section className="faq-section" id="faq" aria-labelledby="faq-heading">
    <div className="faq-intro"><p className="rooms-eyebrow">A FEW HELPFUL DETAILS</p><h2 id="faq-heading">Before you<br /><em>settle in.</em></h2><p>Questions about your stay?<br />Start right here.</p><span className="faq-note">Frequently asked questions</span></div>
    <div className="faq-list">{questions.map(([question, answer], index) => <FAQItem key={question} question={question} answer={answer} index={index} />)}</div>
  </section>;
}
