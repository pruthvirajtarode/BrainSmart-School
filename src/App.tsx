import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { events, nav, news, pillars, school } from './data';

const image = '/images/students-learning.jpg';

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);
  return <><div className="announcement"><span>Announcement</span><strong>Admissions information is coming soon.</strong><Link to="/admissions">Explore the process <ArrowUpRight size={14} /></Link></div>
    <header className="site-header"><Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="BrainSmart School home"><img className="brand-logo" src="/images/school-logo.jpg" alt="" /><span><b>BrainSmart</b><small>Elementary School</small></span></Link>
      <nav className="desktop-nav">{nav.map(item => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>)}</nav>
      <Link className="header-cta" to="/admissions">Admissions <ArrowUpRight size={16} /></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{nav.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}<Link to="/contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={16} /></Link></motion.nav>}</AnimatePresence></>;
}

function Footer() { return <><footer><div className="footer-main"><div><Link to="/" className="brand inverse" aria-label="BrainSmart School home"><img className="brand-logo footer-logo" src="/images/school-logo.jpg" alt="" /><span><b>BrainSmart</b><small>Elementary School</small></span></Link><p className="footer-copy">{school.description}</p></div><div className="footer-links"><div><span className="footer-label">Explore</span><Link to="/about">About us</Link><Link to="/academics">Academics</Link><Link to="/students">Student life</Link></div><div><span className="footer-label">Connect</span><Link to="/parents">For families</Link><Link to="/news">News & events</Link><Link to="/contact">Contact</Link></div></div><div className="footer-contact"><span className="footer-label">Start a conversation</span><Link to="/contact">Request official contact details</Link><span>{school.contact.address}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BrainSmart Elementary School</span><Link to="/privacy">Privacy policy</Link></div></footer><button type="button" className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top <ArrowUpRight size={14} /></button></>; }

function Button({ to, children, secondary = false }: { to: string; children: React.ReactNode; secondary?: boolean }) { return <Link className={`button ${secondary ? 'secondary' : ''}`} to={to}>{children}<ArrowUpRight size={16} /></Link>; }
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .6 }}>{children}</motion.div>; }
function PageHero({ kicker, title, description }: { kicker: string; title: string; description: string }) { return <section className="page-hero"><div className="container"><span className="kicker">{kicker}</span><h1>{title}</h1><p>{description}</p></div></section>; }
function SectionTitle({ kicker, title, copy, light = false }: { kicker: string; title: string; copy?: string; light?: boolean }) { return <div className={`section-title ${light ? 'light' : ''}`}><span className="kicker">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }

const heroSlides = [
  { src: '/images/hero-campus.jpg', alt: 'BrainSmart School campus and school building' },
  { src: '/images/classroom-diverse.jpg', alt: 'Students learning together in a bright classroom' },
  { src: '/images/family-learning.jpg', alt: 'A teacher helping a student with focused learning' },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    heroSlides.forEach(slide => {
      const image = new Image();
      image.src = slide.src;
    });

    const timer = window.setInterval(() => setActive(current => (current + 1) % heroSlides.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActive(current => (current - 1 + heroSlides.length) % heroSlides.length);
  const showNext = () => setActive(current => (current + 1) % heroSlides.length);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="BrainSmart School highlights"
    >
      <div className="hero-slides">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            className={`hero-slide ${index === active ? 'active' : ''}`}
            src={slide.src}
            alt={index === active ? slide.alt : ''}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            aria-hidden={index !== active}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <span className="kicker light">BRAINSMART SCHOOL · LEARNING WITH PURPOSE</span>
        <h1>Where bright minds<br /><em>find their way.</em></h1>
        <p>A considered learning environment where curiosity becomes confidence, and every student is invited to shape what comes next.</p>
        <div className="button-row"><Button to="/about">Discover our story</Button><Button to="/contact" secondary>Start a conversation</Button></div>
      </div>
      <div className="hero-controls" aria-label="Hero image controls">
        <button type="button" onClick={showPrevious} aria-label="Previous image"><ArrowLeft size={16} /></button>
        <div className="hero-dots" aria-label="Choose hero image">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={index === active ? 'active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Next image"><ArrowRight size={16} /></button>
      </div>
      <div className="hero-note">{String(active + 1).padStart(2, '0')} <span>Scroll to explore</span></div>
    </section>
  );
}

function Home() { return <><HeroCarousel />
  <main><section className="intro section"><div className="container split"><SectionTitle kicker="A school with intention" title="Learning that stays with you." copy={school.description} /><div className="intro-copy"><p className="large-copy">The best education does more than prepare students for the next step. It helps them notice the world, find their voice and build the courage to make it better.</p><Button to="/about" secondary>Our approach</Button></div></div></section>
    <section className="philosophy section dark"><div className="container"><SectionTitle kicker="What guides us" title="The work behind the wonder." copy="Curiosity, creativity and care shape the learning experience at every stage." light /><div className="pillar-grid">{pillars.map(([num, title, copy]) => <Reveal key={num} className="pillar"><span>{num}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
    <section className="section"><div className="container feature-grid"><Reveal className="feature-image"><img src={image} alt="Students reading and learning together in a library" /></Reveal><Reveal className="feature-content"><SectionTitle kicker="A wider view of learning" title="Space to think. Tools to explore." copy="From the first question to the final draft, our academic approach makes space for depth, experimentation and reflection." /><Button to="/academics">Explore academics</Button></Reveal></div></section>
    <section className="section warm"><div className="container"><SectionTitle kicker="The school day, in colour" title="There is more than one way to learn." copy="Discover the programmes, activities and shared experiences that give school life depth." /><div className="programs-grid"><div className="program large"><span>01 / Studio</span><h3>Make something<br />worth sharing.</h3><Link to="/programs">Explore programmes <ArrowUpRight size={16} /></Link></div><div className="program"><span>02 / Community</span><h3>Find your people.</h3><Link to="/students">Student life <ArrowUpRight size={16} /></Link></div><div className="program blue"><span>03 / Support</span><h3>Grow with<br />good company.</h3><Link to="/parents">For families <ArrowUpRight size={16} /></Link></div></div></div></section>
    <section className="section news-section"><div className="container"><div className="row-between"><SectionTitle kicker="From the community" title="Notes from BrainSmart." /><Button to="/news" secondary>View all news</Button></div><div className="news-grid">{news.map((item, index) => <NewsCard key={item.id} item={item} featured={index === 0} />)}</div></div></section>
    <section className="events-band"><div className="container event-layout"><SectionTitle kicker="Save the date" title="Good things are on the horizon." light /><div>{events.slice(0, 2).map(event => <EventRow key={event.id} event={event} />)}<Button to="/events" secondary>See all events</Button></div></div></section>
    <section className="section"><div className="container family-cta"><div><SectionTitle kicker="For families" title="A clear next step starts here." copy="Find the practical information you need, or tell us how we can help." /><Button to="/parents">Family hub</Button></div><div className="family-photo"><img src="/images/family-learning.jpg" alt="A teacher supporting a student" loading="lazy" /><span><Check size={16} /> Questions are welcome</span></div></div></section>
  </main></>; }

function NewsCard({ item, featured = false }: { item: typeof news[number]; featured?: boolean }) { return <Link to={`/news/${item.id}`} className={`news-card ${featured ? 'featured' : ''}`}><div className="news-image"><img src={item.image} alt={item.title} loading="lazy" onError={event => { event.currentTarget.src = '/images/hero-campus.jpg'; }} /></div><div className="news-meta"><span>{item.category}</span><span>{item.date}</span></div><h3>{item.title}</h3><p>{item.summary}</p><span className="text-link">Read story <ArrowUpRight size={15} /></span></Link>; }
function EventRow({ event }: { event: typeof events[number] }) { return <div className="event-row"><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.description}</p></div><ArrowUpRight className="event-arrow" /></div>; }

const pageCopy: Record<string, { kicker: string; title: string; description: string; sections: [string, string, string][] }> = {
  about: { kicker: 'The BrainSmart story', title: 'A school built for becoming.', description: 'A learning community shaped by thoughtful teaching, purposeful questions and genuine relationships.', sections: [['Our mission', school.mission, 'We help learners build confidence, curiosity and the habits they need to contribute to the world around them.'], ['Our vision', school.vision, 'Every young person deserves the opportunity to feel known, challenged and inspired to grow.'], ['Values in practice', 'We believe the everyday details matter.', 'Respect, curiosity, courage and care guide the way we learn, lead and support one another.']] },
  academics: { kicker: 'Learning at BrainSmart', title: 'Go deeper. Wonder further.', description: 'A clear, considered academic experience that balances strong foundations with room for exploration.', sections: [['Curriculum', 'A curriculum with room for depth, dialogue and discovery.', 'Learning connects core knowledge with inquiry, collaboration and purposeful application.'], ['How we teach', 'The right question can change the shape of a lesson.', 'Our approach brings together clear instruction, active exploration and thoughtful reflection.'], ['Support to thrive', 'Every learner deserves the right conditions to do their best work.', 'Personal attention and timely support help students build confidence and independence.']] },
  parents: { kicker: 'For families', title: 'Everything you need, in one place.', description: 'A practical starting point for admissions, communication, policies and family resources.', sections: [['Admissions', 'A warm welcome begins with clear information.', 'Find the next steps for registration and learn what to prepare for each stage of the process.'], ['Staying connected', 'Good communication is a two-way conversation.', 'Parents can find school updates, key contacts and important guidance in one clear place.'], ['Useful resources', 'Handbooks, forms and policies — made easy to find.', 'Visit the resource library for practical documents and helpful family information.']] },
  students: { kicker: 'Student life', title: 'Bring your whole self.', description: 'A vibrant school experience beyond the classroom, built around belonging, exploration and contribution.', sections: [['Make and explore', 'Curiosity does not stop at the classroom door.', 'Creative projects, practical learning and shared challenges encourage students to try, make and improve.'], ['Find your people', 'Community is something we build together.', 'Student leadership and collaborative activities help every learner find a place to belong.'], ['Support to grow', 'Asking for help is part of learning.', 'Students can find guidance, wellbeing support and clear ways to get the help they need.']] },
  programs: { kicker: 'Programmes & services', title: 'More ways to find your spark.', description: 'A considered overview of learning opportunities, student support and extracurricular experiences.', sections: [['Explore', 'Programmes designed around possibility.', 'Creative, academic and practical opportunities help students discover strengths and interests.'], ['Support', 'The right support makes independence possible.', 'Library, learning support and wellbeing services work together around each student.'], ['Take part', 'Learning is richer when it is shared.', 'Clubs and community experiences connect individual interests with wider contribution.']] },
};

const pageImages: Record<keyof typeof pageCopy, string[]> = {
  about: ['/images/classroom-diverse.jpg', '/images/students-learning.jpg', '/images/hero-campus.jpg'],
  academics: ['/images/classroom.jpg', '/images/school-learning.jpg', '/images/students-learning.jpg'],
  parents: ['/images/family-learning.jpg', '/images/classroom-diverse.jpg', '/images/students-learning.jpg'],
  students: ['/images/students-learning.jpg', '/images/classroom-diverse.jpg', '/images/family-learning.jpg'],
  programs: ['/images/classroom.jpg', '/images/school-learning.jpg', '/images/family-learning.jpg'],
};

function GenericPage({ type }: { type: keyof typeof pageCopy }) {
  const copy = pageCopy[type];
  const images = pageImages[type];
  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} description={copy.description} />
      <main>
        {copy.sections.map(([kicker, title, body], i) => (
          <section className={`section ${i === 1 ? 'warm' : ''}`} key={kicker}>
            <div className={`container editorial-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              <Reveal className="editorial-media">
                <img src={images[i]} alt={`${copy.kicker}: ${title}`} loading="lazy" />
              </Reveal>
              <Reveal className="editorial-content">
                <span className="kicker">{String(i + 1).padStart(2, '0')} / {kicker}</span>
                <h2>{title}</h2>
                <p className="large-copy">{body}</p>
                <Button to={type === 'parents' ? '/resources' : '/contact'} secondary>Learn more</Button>
              </Reveal>
            </div>
          </section>
        ))}
        <section className="dark-cta">
          <div className="container">
            <SectionTitle kicker="Keep exploring" title="There is always more to discover." light />
            <Button to="/contact">Get in touch</Button>
          </div>
        </section>
      </main>
    </>
  );
}

function NewsPage() { const [query, setQuery] = useState(''); const filtered = news.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())); return <><PageHero kicker="Notes from the community" title="News, ideas & updates." description="The latest stories, milestones and conversations from across the school community." /><main className="section"><div className="container"><input className="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search stories..." aria-label="Search stories" /><div className="news-grid news-list">{filtered.map(item => <NewsCard key={item.id} item={item} />)}</div>{filtered.length === 0 && <p className="empty">No stories match that search yet.</p>}</div></main></>; }
function NewsDetail() {
  const { slug } = useParams();
  const article = news.find(item => item.id === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <PageHero kicker={article.category} title={article.title} description={article.summary} />
      <main className="section">
        <article className="container narrow prose">
          <img src={article.image} alt="" style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', marginBottom: '40px' }} />
          <span className="kicker">{article.date}</span>
          <p>{article.summary}</p>
          <p>Strong learning communities grow through shared stories, thoughtful reflection and the everyday work of students and educators.</p>
          <Button to="/news" secondary>Back to news</Button>
        </article>
      </main>
    </>
  );
}
function EventsPage() { return <><PageHero kicker="Make a date" title="Gather, learn, celebrate." description="A simple events listing ready for your calendar and confirmed school dates." /><main className="section"><div className="container narrow">{events.map(event => <EventRow key={event.id} event={event} />)}</div></main></>; }
function Resources() { return <><PageHero kicker="Useful things" title="Resources for the journey." description="Official documents and useful information are available through the school office." /><main className="section"><div className="container resource-grid">{['Family handbook', 'Admissions checklist', 'Term dates', 'School policies'].map((item, i) => <div className="resource" key={item}><span>0{i + 1}</span><h3>{item}</h3><p>Request the latest approved version directly from the school office.</p><Link to="/contact">Request document <ArrowUpRight size={15} /></Link></div>)}</div></main></>; }
function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'demo' | 'sent' | 'error'>('idle');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
    if (!endpoint) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatus('demo');
      form.reset();
      return;
    }
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Contact endpoint rejected the enquiry');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }
  return (
    <>
      <PageHero kicker="Start a conversation" title="We would love to hear from you." description="Use the form below to share a question or request more information from the school." />
      <main className="section"><div className="container contact-grid">
        <div><SectionTitle kicker="Say hello" title="Questions are a good place to start." copy="Choose the most convenient way to contact the school community." /><div className="contact-details"><span>{school.contact.address}</span><span>Official phone and email details will be published by the school office.</span></div></div>
        <form onSubmit={submit} className="contact-form">
          <label>Full name<input required name="name" autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Phone (optional)<input type="tel" name="phone" autoComplete="tel" /></label>
          <label>Subject<input required name="subject" /></label>
          <label>Message<textarea required name="message" rows={5} /></label>
          <button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing enquiry...' : 'Send enquiry'} <ArrowUpRight size={16} /></button>
          {status === 'demo' && <p className="form-note" role="status">Demo mode: no message was sent. Connect VITE_CONTACT_ENDPOINT to enable delivery.</p>}
          {status === 'sent' && <p className="form-note" role="status">Thank you. Your enquiry was submitted.</p>}
          {status === 'error' && <p className="form-note" role="alert">We could not submit your enquiry. Please try again or email the school directly.</p>}
        </form>
      </div></main>
    </>
  );
}
function Admissions() { return <><PageHero kicker="Admissions" title="A thoughtful start." description="A clear admissions process for families considering BrainSmart Elementary School." /><main className="section"><div className="container editorial-row"><span className="kicker">01 / The process</span><div><h2>Make the next step feel simple.</h2><p className="large-copy">Contact the school to confirm current enrolment information, required documents and available grade levels.</p><Button to="/contact">Make an enquiry</Button></div></div></main></>; }
function Privacy() { return <><PageHero kicker="Privacy" title="Privacy policy." description="Information about how this website handles information submitted through its communication features." /><main className="section"><div className="container narrow prose"><h2>Information we collect</h2><p>Information submitted through the contact form may include a name, email address, phone number and message. Only use this website for legitimate school enquiries.</p><h2>Cookies and external services</h2><p>This page should be completed with the school’s approved analytics and cookie practices before launch.</p><h2>Questions</h2><p>Privacy questions should be directed to the school using the official contact details published on this website.</p></div></main></>; }
function NotFound() { return <><PageHero kicker="404" title="This page wandered off." description="The link may have changed, but there is more to explore." /><div className="container not-found"><Button to="/">Back home</Button></div></>; }

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const path = location.pathname;
    const titles: Record<string, [string, string]> = {
      '/': ['BrainSmart School | Learning with Purpose', 'Discover a thoughtful school community focused on curiosity, confidence and purposeful learning.'],
      '/about': ['About Us | BrainSmart School', 'Learn about BrainSmart School, its mission, vision and learning philosophy.'],
      '/academics': ['Academics | BrainSmart School', 'Explore the academic approach, curriculum information and learning support.'],
      '/parents': ['For Families | BrainSmart School', 'Find admissions, communication, policies and family resources.'],
      '/students': ['Student Life | BrainSmart School', 'Explore activities, clubs, student resources and learning support.'],
      '/programs': ['Programs & Services | BrainSmart School', 'Discover school programmes and student support services.'],
      '/news': ['News & Stories | BrainSmart School', 'Read the latest school news, ideas and community stories.'],
      '/events': ['Events | BrainSmart School', 'View upcoming school events and community gatherings.'],
      '/resources': ['Resources | BrainSmart School', 'Access handbooks, forms, policies and school resources.'],
      '/contact': ['Contact | BrainSmart School', 'Contact BrainSmart School and start a conversation.'],
      '/admissions': ['Admissions | BrainSmart School', 'Learn about the BrainSmart School admissions process.'],
      '/privacy': ['Privacy Policy | BrainSmart School', 'Read the BrainSmart School website privacy policy.'],
    };
    const [title, description] = titles[path] ?? ['Page Not Found | BrainSmart School', 'Explore the official BrainSmart School website.'];
    document.title = title;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://brain-smart-school-amber.vercel.app${path}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    ogTitle?.setAttribute('content', title);
    ogDescription?.setAttribute('content', description);
    ogUrl?.setAttribute('content', `https://brain-smart-school-amber.vercel.app${path}`);
  }, [location.pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} id="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .25 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<GenericPage type="about" />} />
            <Route path="/academics" element={<GenericPage type="academics" />} />
            <Route path="/parents" element={<GenericPage type="parents" />} />
            <Route path="/students" element={<GenericPage type="students" />} />
            <Route path="/programs" element={<GenericPage type="programs" />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
