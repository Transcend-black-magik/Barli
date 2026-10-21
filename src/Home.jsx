import React from 'react';

const slides = [
  { src: '/hotel-lounge.jpg', alt: 'Sunlit hotel lounge with green velvet armchairs, marble walls, and hanging pendant lights' },
  { src: '/hotel-seating.jpg', alt: 'A closer look at the green lounge seating and warm wood details' },
  { src: '/hotel-lighting.jpg', alt: 'Sculptural pendant lighting against the lounge marble wall' },
];

export default function Home() {
  const [slide, setSlide] = React.useState(0);
  const [booking, setBooking] = React.useState(false);
  const dialogRef = React.useRef(null);
  const changeSlide = direction => setSlide(value => (value + direction + slides.length) % slides.length);
  React.useEffect(() => {
    if (booking) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [booking]);

  return (
    <main className="home-page">
      <div className="home-left">
        <header className="home-masthead">
          <a className="home-logo" href="/" aria-label="Barli Hotel home"><span>Barli</span><small>HOTEL</small></a>
          <nav className="home-nav" aria-label="Hotel navigation">
            <a href="/" aria-current="page">Home</a>
            <button type="button" onClick={() => setBooking(true)}>Rooms &amp; Suites</button>
            <button type="button" onClick={() => setBooking(true)}>Dining</button>
            <button type="button" onClick={() => setBooking(true)}>Events</button>
            <a href="/our-story/">Our Story</a>
          </nav>
          <div className="home-contact"><span>Contact</span><button type="button" onClick={() => setBooking(true)}>Plan your stay &#8599;</button></div>
        </header>
        <div className="home-endorsement">
          <div className="home-stars" aria-label="Four and a half stars">????<span>?</span></div>
          <p>Voted the Top-Rated Luxury<br />Hotel by Our Esteemed Guests.</p>
        </div>
        <h1 className="home-title" aria-label="Experience Unparalleled Luxury"><img src="/home-headline.svg" alt="" /></h1>
        <button className="home-book" type="button" onClick={() => setBooking(true)}><span>Book Your Stay Now</span><span aria-hidden="true">&#8250;</span></button>
        <div className="home-language" aria-label="Language"><span aria-current="true">En</span><span className="language-divider">/</span><span>Es</span></div>
      </div>
      <figure className="home-photo">
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
