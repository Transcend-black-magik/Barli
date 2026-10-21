import React from 'react';
const courses = [
  { title: 'Appetizer', description: 'Start with our herb-baked bread and a fresh seasonal salad.', position: '0% 0%', label: 'Fresh green salad with parmesan and bread' },
  { title: 'Main Dish', description: 'Our juicy, freshly grilled steak is served with a savoury sauce and roasted vegetables.', position: '100% 0%', label: 'Grilled steak with roasted onions and cherry tomatoes' },
  { title: 'Side Dish', description: 'A beautifully grilled salmon fillet with bright greens and a squeeze of lemon.', position: '0% 100%', label: 'Grilled salmon, green salad and lemon' },
  { title: 'Dessert', description: 'Finish your kitchen experience with a little sweetness.', position: '100% 100%', label: 'Caramel pastry tart with chocolate drizzle' },
];
const random = seed => { const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
function SaltTrail({ index, halo = false }) {
  const reversed = index % 2 === 1;
  const count = halo ? 340 : 680;
  const grains = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const seed = i + index * 997 + (halo ? 53 : 0);
    let x, y;
    if (halo) {
      const angle = t * Math.PI * 2 - Math.PI / 2;
      // Uneven pockets of crystals, with a few grains scattered further out.
      const pocket = Math.sin(angle * 3 + index) * 3;
      const radius = 41 + pocket + random(seed + 2) * 14 + (random(seed + 8) > .8 ? random(seed + 9) * 10 : 0);
      x = 50 + Math.cos(angle) * radius;
      y = 50 + Math.sin(angle) * radius;
    } else {
      const spread = 45 + 80 * Math.sin(Math.PI * t) ** 2;
      const swirl = Math.sin(t * Math.PI * 3.5 + index * .7) * 55 * Math.sin(Math.PI * t);
      const curve = 260 + 480 * (3 * t * t - 2 * t * t * t);
      const scatter = (random(seed + 2) - .5) * spread * 2;
      const outlier = random(seed + 8) > .87 ? (random(seed + 9) - .5) * 160 : 0;
      x = (reversed ? 1000 - curve : curve) + swirl + scatter + outlier;
      y = 200 + 600 * t + (random(seed + 3) - .5) * 95;
    }
    const size = halo ? .13 + random(seed + 4) * .35 : 1 + random(seed + 4) * 2.7;
    return <path key={i} className="salt-grain" d={`M${x} ${y-size}l${size} ${size*.6}-.3 ${size} -${size*1.4} ${size*.3}Z`} fill={['#aca493','#d5cfc2','#8e887c','#e6e0d5'][i % 4]} fillOpacity={.4 + random(seed + 5) * .6} />;
  });
  return <svg className={halo ? 'salt-halo' : 'salt-trail'} data-salt={halo ? 'halo' : 'trail'} viewBox={halo ? '0 0 100 100' : '0 0 1000 1000'} preserveAspectRatio="none" aria-hidden="true">{grains}</svg>;
}
export default function Restaurant() {
  const ref = React.useRef(null);
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    const root = ref.current;
    const scene = root.querySelector('.restaurant-scene');
    const track = root.querySelector('.restaurant-track');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const panels = [...root.querySelectorAll('.course')];
    const saltGroups = panels.map(panel => [...panel.querySelectorAll('[data-salt]')].map(svg => ({ kind: svg.dataset.salt, grains: [...svg.children], shown: 0 })));
    const showGrains = (group, progress) => {
      const count = Math.floor(progress * group.grains.length);
      for (let i = Math.min(count, group.shown); i < Math.max(count, group.shown); i++) group.grains[i].style.opacity = i < count ? '1' : '0';
      group.shown = count;
    };
    let frame = 0, target = 0, current = 0, last = 0;
    const draw = time => {
      const elapsed = last ? Math.min(64, time - last) : 16;
      last = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 150));
      if (Math.abs(target - current) < .05 || !motion.matches) current = target;
      track.style.setProperty('--menu-lift', `${-current}px`);
      const clamp = value => Math.max(0, Math.min(1, value));
      const trails = panels.map(course => motion.matches ? clamp((current - course.offsetTop + scene.clientHeight * .3) / Math.max(1, course.offsetHeight - scene.clientHeight * .1)) : 1);
      panels.forEach((course, index) => {
        const incoming = index === 0 ? 1 : trails[index - 1];
        course.style.setProperty('--plate-angle', `${index === 0 ? 0 : (1 - incoming) * (index % 2 ? 65 : -50)}deg`);
        course.classList.toggle('course-is-active', incoming >= .94);
        course.querySelector('.course-copy').inert = incoming < .94;
        saltGroups[index].forEach(group => showGrains(group, group.kind === 'trail' ? trails[index] : index === 0 ? 1 : clamp((incoming - .55) / .45)));
      });
      if (Math.abs(target - current) >= .05) frame = requestAnimationFrame(draw);
      else { frame = 0; last = 0; }
    };
    const schedule = () => {
      const rect = root.getBoundingClientRect();
      const header = document.querySelector('.shared-header')?.offsetHeight || 80;
      const distance = Math.max(1, root.offsetHeight - scene.offsetHeight);
      const progress = Math.max(0, Math.min(1, (header - rect.top) / distance));
      target = motion.matches ? progress * Math.max(0, track.scrollHeight - scene.clientHeight + 30) : 0;
      setEntered(rect.top < window.innerHeight * .8 && rect.bottom > header);
      if (!frame) frame = requestAnimationFrame(draw);
    };
    schedule();
    const resize = new ResizeObserver(schedule); resize.observe(scene); resize.observe(track);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule); motion.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); motion.removeEventListener('change', schedule); };
  }, []);
  return <section ref={ref} id="restaurant" className={`restaurant-section${entered ? ' restaurant-entered' : ''}`} aria-labelledby="restaurant-heading">
    <div className="restaurant-scene"><div className="restaurant-track">
      <header className="restaurant-intro"><div><span>Discover</span><h2 id="restaurant-heading">Our Menu</h2></div><p>Every dish begins with a little inspiration. Fresh ingredients, thoughtful flavours, and something worth slowing down for. Come hungry. Stay for one more course.</p></header>
      {courses.map((course, index) => <article className={`course course-${index + 1}`} key={course.title}>
        {index < courses.length - 1 && <SaltTrail index={index} />}
        <SaltTrail index={index} halo />
        <div className="course-plate" role="img" aria-label={course.label}><div className="course-food" style={{ backgroundPosition: course.position }} /></div>
        <div className="course-copy"><span className="course-number">0{index + 1} / A TASTE OF BARLI</span><h3>{course.title}</h3><p>{course.description}</p>{index === 3 && <a href="/#booking">Make a stay of it <span aria-hidden="true">&#8599;</span></a>}</div>
      </article>)}
    </div><div className="restaurant-progress" aria-hidden="true"><span>A JOURNEY IN FOUR COURSES</span><span>SCROLL TO SAVOUR &#8595;</span></div></div>
  </section>;
}
