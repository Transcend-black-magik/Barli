import React from 'react';
import landmarkCredits from './abuja-landmark-credits.json';

const landmarks = [
  { image: '/abuja-mosque.jpg', alt: 'The dome and minarets of the National Mosque in Abuja', caption: 'NATIONAL MOSQUE / ABUJA' },
  { image: '/abuja-park.jpg', alt: 'A green outdoor scene at Millennium Park in Abuja', caption: 'MILLENNIUM PARK / ABUJA' },
  { image: '/abuja-zuma.jpg', alt: 'Zuma Rock rising above the surrounding landscape near Abuja', caption: 'ZUMA ROCK / NIGER STATE' },
];

export default function Experiences() {
  const ref = React.useRef(null);
  const [activeLandmark, setActiveLandmark] = React.useState(0);
  React.useEffect(() => {
    const root = ref.current;
    const scene = root.querySelector('.experience-scene');
    const image = root.querySelector('.experience-image');
    const photos = [...image.querySelectorAll('img')];
    let previousLandmark = 0;
    const opening = root.querySelector('.experience-opening');
    const first = root.querySelector('.experience-copy-first');
    const second = root.querySelector('.experience-copy-second');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0, target = 0, current = 0, last = 0;
    let top = 0, travel = 1;
    const clamp = value => Math.max(0, Math.min(1, value));
    const draw = time => {
      const dt = last ? Math.min(64, time - last) : 16;
      last = time;
      current += (target - current) * (1 - Math.exp(-dt / 90));
      if (Math.abs(target - current) < .0003) current = target;
      const a = clamp(current), b = clamp(current - 1);
      const firstFade = clamp((a - .25) / .5);
      const secondFade = clamp((b - .25) / .5);
      photos[0].style.opacity = 1 - firstFade;
      photos[1].style.opacity = firstFade * (1 - secondFade);
      photos[2].style.opacity = secondFade;
      const active = current < .5 ? 0 : current < 1.5 ? 1 : 2;
      if (active !== previousLandmark) { setActiveLandmark(active); previousLandmark = active; }
      image.style.setProperty('--experience-x', `${-32 * (a + b)}vw`);
      opening.style.opacity = 1 - clamp(a * 2);
      first.style.setProperty('--copy-y', `${-85 * (1 - a)}svh`);
      first.style.opacity = a * (1 - b);
      second.style.setProperty('--copy-x', `${65 * (1 - b)}vw`);
      second.style.opacity = b;
      first.inert = motion.matches && (a < .75 || b > .5);
      second.inert = motion.matches && b < .75;
      if (current !== target) frame = requestAnimationFrame(draw);
      else { frame = 0; last = 0; }
    };
    const schedule = () => {
      target = motion.matches ? clamp((window.scrollY - top) / travel) * 2 : 0;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const measure = () => {
      const header = document.querySelector('.shared-header')?.offsetHeight || 80;
      top = root.getBoundingClientRect().top + window.scrollY - header;
      travel = Math.max(1, root.offsetHeight - scene.offsetHeight);
      schedule();
    };
    const resize = new ResizeObserver(measure); resize.observe(root); resize.observe(scene);
    measure(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', measure); motion.addEventListener('change', measure);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure); motion.removeEventListener('change', measure); };
  }, []);
  return <section className="experiences-section" id="experiences" ref={ref} aria-labelledby="experiences-title">
    <div className="experience-scene">
      <div className="experience-topline"><span>BARLI / BEYOND YOUR ROOM</span><span>EXPERIENCES &amp; LOCATION</span></div>
      <div className="experience-opening"><span className="experience-eyebrow">A DIFFERENT PERSPECTIVE</span><h2 id="experiences-title">GO<br />SOMEWHERE<br /><em>extraordinary.</em></h2><p>Discover the world outside your door.</p></div>
      <figure className="experience-image">{landmarks.map((landmark, index) => <img key={landmark.image} src={landmark.image} alt={landmark.alt} aria-hidden={activeLandmark !== index} loading="lazy" />)}<figcaption>{landmarks[activeLandmark].caption} <span aria-hidden="true">&#8599;</span></figcaption></figure>
      <div className="experience-copy experience-copy-first"><span className="experience-eyebrow">01 / EXPERIENCES</span><h3>Follow your<br /><em>curiosity.</em></h3><p>City landmarks. Open green spaces. A slower kind of afternoon. Find a different side of Abuja beyond your room.</p></div>
      <div className="experience-copy experience-copy-second"><span className="experience-eyebrow">02 / LOCATION</span><h3>A sense<br />of <em>place.</em></h3><p>From the National Mosque to Millennium Park, discover the architecture, open spaces, and everyday character of Nigeria's capital.</p><a href="https://www.google.com/maps/search/?api=1&query=Abuja+Nigeria" target="_blank" rel="noopener noreferrer">Explore Abuja on the map <span aria-hidden="true">&#8599;</span></a><small>Discover the capital at your own pace.</small></div>
      <div className="experience-bottomline"><a href={landmarkCredits[[0, 3, 1][activeLandmark]].source} target="_blank" rel="noopener noreferrer">Photo: {landmarkCredits[[0, 3, 1][activeLandmark]].author} / {landmarkCredits[[0, 3, 1][activeLandmark]].license}</a><span>SCROLL TO DISCOVER &#8595;</span></div>
    </div>
  </section>;
}
