import React from 'react';
import HomeHero from './sections/hero/HomeHero.jsx';
import BookingDialog from './components/booking/BookingDialog.jsx';
import HotelDetails from './sections/hotel-details/HotelDetails.jsx';
import Restaurant from './sections/restaurant/RestaurantSection.jsx';
import Experiences from './sections/experiences/ExperiencesSection.jsx';
import FAQ from './sections/faq/FAQSection.jsx';
import HotelGallery from './sections/gallery/GallerySection.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import useHeroTransition from './hooks/useHeroTransition.js';

export default function HomePage() {
  useHeroTransition();
  const [heroVisible, setHeroVisible] = React.useState(true);
  const [heroReturning, setHeroReturning] = React.useState(false);
  const heroExited = React.useRef(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < .1) {
        heroExited.current = true;
        setHeroVisible(false);
      } else if (entry.intersectionRatio >= Math.min(1, window.innerHeight / entry.boundingClientRect.height) * .65) {
        if (heroExited.current) setHeroReturning(true);
        setHeroVisible(true);
      }
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20) });
    observer.observe(document.querySelector('.stay-hero'));
    return () => observer.disconnect();
  }, []);
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
    const open = () => { setSummary(null); setBooking(true); };
    window.addEventListener('barli:open-booking', open);
    return () => window.removeEventListener('barli:open-booking', open);
  }, []);

  React.useEffect(() => {
    if (booking) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [booking]);

  return (
    <main className={`stay-home${heroVisible ? " hero-visible" : ""}${heroReturning ? " hero-returning" : ""}`}>
      <HomeHero stay={stay} setStay={setStay} formRef={formRef} submitStay={submitStay} updateStay={updateStay} today={today} nextDate={nextDate} focusBooking={focusBooking} openBooking={openBooking} />
      <HotelDetails onBook={focusBooking} />
      <Restaurant />
      <Experiences />
      <HotelGallery />
      <FAQ />
      <SiteFooter />
      <BookingDialog dialogRef={dialogRef} summary={summary} setBooking={setBooking} />
    </main>
  );
}
