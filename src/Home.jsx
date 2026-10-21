import React from 'react';

function RatingStars() {
  const star = 'M12 2.2 14.9 8.1 21.4 9 16.7 13.6 17.8 20.1 12 17 6.2 20.1 7.3 13.6 2.6 9 9.1 8.1Z';
  return <div className="home-stars" role="img" aria-label="Four and a half stars">
    <svg viewBox="0 0 128 24" aria-hidden="true">
      <defs><linearGradient id="rating-half"><stop offset="50%" stopColor="#e99a00" /><stop offset="50%" stopColor="#ffffff" /></linearGradient></defs>
      {[0, 1, 2, 3].map(index => <path key={index} d={star} transform={`translate(${index * 26} 0)`} fill="#e99a00" />)}
      <path d={star} transform="translate(104 0)" fill="url(#rating-half)" stroke="#e99a00" strokeWidth="1" />
    </svg>
  </div>;
}

const slides = [
  { src: '/hotel-lounge.jpg', alt: 'Sunlit hotel lounge with green velvet armchairs, marble walls, and hanging pendant lights' },
  { src: '/hotel-seating.jpg', alt: 'A closer look at the green lounge seating and warm wood details' },
  { src: '/hotel-lighting.jpg', alt: 'Sculptural pendant lighting against the lounge marble wall' },
];

export default function Home() {
  const [slide, setSlide] = React.useState(0);
  const [booking, setBooking] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const openContact = () => { setMenuOpen(false); setBooking(true); };
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    const onPointerDown = event => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const media = window.matchMedia('(min-width: 701px)');
    const closeOnDesktop = () => { if (media.matches) setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    media.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      media.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);
  const dialogRef = React.useRef(null);
  const changeSlide = direction => setSlide(value => (value + direction + slides.length) % slides.length);
  React.useEffect(() => {
    if (booking) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [booking]);

  return (
    <main className="home-page">
      <div className="home-left">
        <header className="home-masthead" ref={headerRef}>
          <a className="home-logo" href="/" aria-label="Barli Hotel home"><span>Barli</span><small>HOTEL</small></a>
          <div className="home-mobile-actions">
            <button className={menuOpen ? 'home-menu-toggle is-open' : 'home-menu-toggle'} ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="home-navigation" onClick={() => setMenuOpen(value => !value)}>
              <span /><span /><span />
            </button>
            <button className="home-mobile-contact" type="button" onClick={openContact}>Contact <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </div>
          <nav id="home-navigation" className={menuOpen ? 'home-nav mobile-open' : 'home-nav'} aria-label="Hotel navigation">
            <a href="/" aria-current="page">Home</a>
            <button type="button" onClick={openContact}>Rooms &amp; Suites</button>
            <button type="button" onClick={openContact}>Dining</button>
            <button type="button" onClick={openContact}>Events</button>
            <a href="/our-story/">Our Story</a>
          </nav>
          <div className="home-contact"><span>Contact</span><button type="button" onClick={() => setBooking(true)}>Plan your stay &#8599;</button></div>
        </header>
        <div className="home-endorsement hero-enter hero-enter-rating">
          <RatingStars />
          <p>Voted the Top-Rated Luxury<br />Hotel by Our Esteemed Guests.</p>
        </div>
        <h1 className="home-title hero-enter hero-enter-title" aria-label="Experience Unparalleled Luxury"><img src="/home-headline.svg" alt="" /></h1>
        <button className="home-book hero-enter hero-enter-book" type="button" onClick={() => setBooking(true)}><span>Book Your Stay Now</span><span aria-hidden="true">&#8250;</span></button>
        <div className="home-language" aria-label="Language"><span aria-current="true">En</span><span className="language-divider">/</span><span>Es</span></div>
      </div>
      <figure className="home-photo hero-enter hero-enter-photo">
        <img key={slide} className={slide === 0 ? 'lounge-photo original-photo' : 'lounge-photo'} src={slides[slide].src} alt={slides[slide].alt} fetchPriority="high" />
        <div className={slide === 0 ? 'home-gallery-controls original-controls' : 'home-gallery-controls'}>
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous hotel image"><span aria-hidden="true">&#8593;</span></button>
          <span className="gallery-count" aria-live="polite">{slide + 1}/3</span>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next hotel image"><span aria-hidden="true">&#8595;</span></button>
        </div>
      </figure>
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
