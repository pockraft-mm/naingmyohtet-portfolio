import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

function usePortfolioMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!reducedMotion && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('has-reveal');
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

      revealItems.forEach((item) => observer.observe(item));
      return () => {
        observer.disconnect();
        document.documentElement.classList.remove('has-reveal');
      };
    }

    revealItems.forEach((item) => item.classList.add('is-visible'));
    return undefined;
  }, []);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>('.cursor-follower');
    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add('cursor-visible');
    };
    const updateHover = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a, button')) cursor.classList.add('cursor-link');
      else cursor.classList.remove('cursor-link');
    };
    const hideCursor = () => cursor.classList.remove('cursor-visible');

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('pointerover', updateHover);
    document.documentElement.addEventListener('pointerleave', hideCursor);
    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerover', updateHover);
      document.documentElement.removeEventListener('pointerleave', hideCursor);
    };
  }, []);
}

const projects = [
  {
    title: 'Academic Schedule Optimizer',
    category: 'Full-stack web application',
    year: '2025',
    description: 'A study scheduling application based on exam dates and assignment deadlines. Developed with React, Tailwind CSS, Supabase, and Git as part of a team.',
    technologies: 'React · Tailwind CSS · Supabase · Git',
    link: 'https://github.com/naingmyoxtet009',
  },
  {
    title: 'Personalized Coaching System at Home',
    category: 'Desktop application',
    year: '2024',
    description: 'A Java application for home workout routines, user profiles, schedules, and activity tracking. Led backend development and designed the MySQL database schema.',
    technologies: 'Java · JavaFX · MySQL',
    link: 'https://github.com/naingmyoxtet009',
  },
];

const skills = [
  ['Programming', 'Java, Python, C++, JavaScript, TypeScript'],
  ['Databases', 'MySQL, PostgreSQL, Supabase'],
  ['Tools', 'Git, GitHub, IntelliJ IDEA, Visual Studio Code, RStudio'],
  ['Core skills', 'OOP, Data Structures & Algorithms, Database Design, Problem Solving, Data Analytics'],
  ['Professional skills', 'Teamwork, Communication, Adaptability, Quick Learning'],
];

function App() {
  usePortfolioMotion();

  return (
    <>
      <div className="cursor-follower" aria-hidden="true"><span /></div>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Naing Myo Htet home">Naing Myo Htet</a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="portfolio-hero section-border" data-reveal>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Computer Science &amp; Engineering Student</p>
              <h1>Naing Myo<br className="mobile-break" /> Htet</h1>
              <p className="hero-role">Myanmar Institute of Information Technology</p>
            </div>
            <div className="hero-portrait">
              <img className="profile-image" src="/Coffee%20-%20Naing%20Myo%20Xtet.jpg" alt="Naing Myo Htet" />
            </div>
            <div className="hero-intro">
              <p>Passionate about software development and problem solving, with a willingness to learn and adapt to new technologies.</p>
              <div className="hero-actions">
                <a className="button button-default" href="#work">View My Work <ArrowUpRight size={14} /></a>
                <a className="button button-outline" href="#contact">Contact</a>
                <a className="button button-outline" href="/Black%20and%20White%20Clean%20Professional%20A4%20Resume%20(1)%20-%20Naing%20Myo%20Xtet.pdf" download="Naing-Myo-Htet-CV.pdf">Download CV</a>
              </div>
            </div>
          </div>
        </section>

        <section className="work section-border" id="work" data-reveal>
          <div className="container">
            <div className="section-heading"><p className="eyebrow">Selected Work</p><h2>Recent projects</h2></div>
            <div className="projects">
              {projects.map((project) => (
                <article className="project" key={project.title} data-reveal>
                  <div className="project-copy">
                    <div className="project-kicker"><span>{project.category}</span><span>{project.year}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>{project.technologies}</p>
                    <a className="text-link" href={project.link} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={14} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section-border" id="about" data-reveal>
          <div className="container about-grid" data-reveal>
            <div><p className="eyebrow">About</p><h2>A little about me</h2></div>
            <div>
              <p className="about-description">Final-year Computer Science and Engineering student with a foundation in Java, Python, C++, MySQL, PostgreSQL, and Git/GitHub. A collaborative and responsible team member, eager to gain practical industry experience and contribute to real-world software projects.</p>
              <dl className="facts">
                <div><dt>Education</dt><dd>B.E. (Hons) in Computer Science and Engineering</dd></div>
                <div><dt>Institution</dt><dd>Myanmar Institute of Information Technology</dd></div>
                <div><dt>Study period</dt><dd>2022–2026</dd></div>
                <div><dt>Graduation</dt><dd>Expected 2027</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="services section-border" id="skills" data-reveal>
          <div className="container">
            <div className="section-heading"><p className="eyebrow">Skills</p><h2>Areas of experience</h2></div>
            <div className="service-list">
              {skills.map(([label, value], index) => (
                <div className="service" key={label} data-reveal>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{label}</h3>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="contact" id="contact" data-reveal>
          <div className="container contact-panel" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Naing Myo Htet</h2>
            <p><a href="mailto:naingmyoxtet007@gmail.com">naingmyoxtet007@gmail.com</a> · <a href="tel:+959421104106">+95 9 421 104 106</a></p>
            <div className="contact-bottom">
              <span>2021-MIIT-CSE-044@miit.edu.mm</span>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/naing-myo-htet-032420434" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
                <a href="https://github.com/naingmyoxtet009" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
              </div>
              <span className="pockraft-credit">Built with Pockraft</span>
              <span>© 2026</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
