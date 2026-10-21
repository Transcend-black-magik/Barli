import React from 'react';
import AboutSection from './sections/about/AboutSection.jsx';
import StoryChapters from './sections/chapters/StoryChapters.jsx';
import WhyChooseSection from './sections/why-choose/WhyChooseSection.jsx';
import StoryInvitation from './sections/invitation/StoryInvitation.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import useEditorialScroll from '../../hooks/scroll/useEditorialScroll.js';
import './OurStoryPage.css';

export default function OurStoryPage() {
  const ref = React.useRef(null);
  useEditorialScroll(ref, '[data-story-stop]');
  React.useEffect(() => {
    let frame = 0, started = false;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('story-visible', entry.isIntersecting)), { threshold: .12 });
    const start = () => {
      if (started) return;
      started = true;
      frame = requestAnimationFrame(() => ref.current?.querySelectorAll('[data-story-reveal]').forEach(element => observer.observe(element)));
    };
    window.addEventListener('barli:page-ready', start);
    if (document.documentElement.dataset.routeTransition !== 'pending') start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('barli:page-ready', start); };
  }, []);
  return <div className="barli-story-page" ref={ref}><main>
    <AboutSection />
    <StoryChapters />
    <WhyChooseSection />
    <StoryInvitation />
  </main><SiteFooter /></div>;
}
