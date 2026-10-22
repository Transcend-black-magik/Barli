import React from 'react';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import usePageReveal from '../../hooks/usePageReveal.js';
import ContactForm from './sections/ContactForm.jsx';
import './ContactPage.css';

export default function ContactPage() {
  const ref = React.useRef(null);
  usePageReveal(ref);
  return <div className="contact-page" ref={ref}><main className="contact-container"><header className="contact-heading" data-reveal><div className="reveal-left"><span className="about-pill">Say hello</span><h1>Good stays start<br />with a <em>conversation.</em></h1></div><p className="reveal-right">A little curiosity. A special occasion.<br />A few days away. We'd love to hear what you have in mind.</p></header><div className="contact-layout"><div className="contact-story" data-reveal><figure className="reveal-left"><img src="/hotel-lounge-neutral.webp" alt="A welcoming sunlit lounge with cream seating and natural finishes" fetchPriority="high" /><figcaption>MAKE A LITTLE TIME FOR YOURSELF.</figcaption></figure><div className="contact-shortcuts reveal-up"><a href="/rooms-and-suites/"><span>Find your space</span><span>Rooms &amp; Suites ↗</span></a><a href="/#faq"><span>A quick answer?</span><span>Guest questions ↗</span></a><a href="https://www.google.com/maps/search/?api=1&query=Abuja+Nigeria" target="_blank" rel="noopener noreferrer"><span>A sense of place</span><span>Explore Abuja ↗</span></a></div></div><ContactForm /></div><section className="contact-closing" data-reveal><div className="reveal-up"><span className="page-eyebrow">YOUR NEXT CHAPTER</span><h2>Until we say<br /><em>welcome.</em></h2><a className="underlined-link" href="/rooms-and-suites/">Explore the collection ↗</a></div></section></main><SiteFooter /></div>;
}
