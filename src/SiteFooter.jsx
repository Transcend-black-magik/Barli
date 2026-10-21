import React from 'react';

function Landscape() {
  const trees = Array.from({ length: 32 }, (_, index) => ({ x: index * 49 - 20, scale: .55 + ((index * 7) % 11) / 15, y: 112 + Math.sin(index * 1.8) * 9 }));
  return <svg className="footer-landscape" viewBox="0 0 1500 180" preserveAspectRatio="none" aria-hidden="true"><defs><g id="barli-footer-tree"><path d="M-4 0 0-62 5 0Z"/><path d="M0-28c-20 5-38-4-35-17-18-10-9-28 5-29-3-17 17-25 30-16 14-12 34-3 31 12 21 0 26 21 11 30 6 14-14 25-32 20Z"/></g></defs><path d="M0 125q50-20 95-6t85-10 85 10 85-5 95 5 100-8 90 7 95-1 105 0 115-9 110 10 90-6 100 12 150-3v59H0Z"/><path d="M675 126c12-17 17-62 39-76 17-12 44-21 62-12 25 13 32 38 42 59l19 31Z"/>{trees.filter(tree => tree.x < 645 || tree.x > 840).map((tree, index) => <use key={index} href="#barli-footer-tree" transform={`translate(${tree.x} ${tree.y}) scale(${tree.scale})`} />)}<path d="m707 107 9-44 22-17 15-7 30 19 16 44m-61-56 11 46 12-38m-45 9 17 22m20-46 3 37" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.3"/></svg>;
}

export default function SiteFooter() {
  const [message, setMessage] = React.useState('');
  return <footer className="barli-footer landscape-footer" id="footer" aria-label="Barli Hotel footer">
    <Landscape />
    <div className="landscape-footer-body"><div className="landscape-footer-columns">
      <nav className="landscape-footer-nav" aria-label="Footer navigation"><a href="/our-story/">About Barli</a><a href="/rooms-and-suites/">Rooms &amp; Suites</a><a href="/#amenities">Amenities</a><a href="/#restaurant">Dining</a><a href="/#gallery">Hotel Gallery</a><a href="/#experiences">Experiences &amp; Location</a><a className="landscape-brand" href="/" aria-label="Barli home">Barli<span>HOTEL</span></a></nav>
      <div className="footer-newsletter"><h2>Get Updates</h2><p>Stay a little closer to Barli.<br />News, little escapes, and special moments.</p><form onSubmit={event => { event.preventDefault(); setMessage('Newsletter registration is coming soon. No details have been sent or saved.'); }}><label><span className="footer-field-label">Email address</span><input type="email" name="email" placeholder="*Email" autoComplete="email" required maxLength={254} /></label><div className="footer-signup-row"><label><span className="footer-field-label">First name</span><input name="firstName" placeholder="*First Name" autoComplete="given-name" required maxLength={80} /></label><button type="submit">SIGN UP <span aria-hidden="true">&#8599;</span></button></div><p className="footer-signup-status" role="status">{message}</p></form></div>
      <div className="landscape-footer-contact"><a className="footer-message-link" href="/#booking">Plan Your Visit <span aria-hidden="true">&#8594;</span></a><p>A thoughtful stay.<br />An extraordinary escape.</p><a href="/#faq">Questions about your stay?<br /><span>Find your answers here.</span></a><a href="https://www.google.com/maps/search/?api=1&query=Abuja+Nigeria" target="_blank" rel="noopener noreferrer">Explore Abuja, Nigeria <span aria-hidden="true">&#8599;</span></a><div className="footer-seal" aria-hidden="true"><span>Barli</span><small>STAY A LITTLE LONGER</small></div></div>
    </div></div>
    <div className="landscape-footer-base"><div><p>&copy; {new Date().getFullYear()} Barli Hotel. All rights reserved.</p><a href="/#faq">Guest information</a><a href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>Back to top <span aria-hidden="true">&#8593;</span></a></div></div>
  </footer>;
}
