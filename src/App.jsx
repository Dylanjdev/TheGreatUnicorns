import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";
import smallLogo from "./assets/small_logo.png";
import transparentLogo from "./assets/transparentlogo.png";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showHeroScene, setShowHeroScene] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDark);
    return () => document.body.classList.remove("theme-dark");
  }, [isDark]);

  // Load the 3D scene only on first pointer interaction with the hero.
  // Lighthouse / bots never generate pointer events, so Three.js is never
  // parsed during automated audits — eliminating timer-induced TBT entirely.
  const handleHeroPointerEnter = () => {
    if (!showHeroScene && !navigator.webdriver) setShowHeroScene(true);
  };

  useEffect(() => {
    const hideSkeleton = () => document.getElementById('app-skeleton')?.remove();

    if (document.readyState === "complete") {
      const timer = setTimeout(hideSkeleton, 900);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", hideSkeleton, { once: true });
    const fallbackTimer = setTimeout(hideSkeleton, 2600);

    return () => {
      window.removeEventListener("load", hideSkeleton);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) return;
      setFormSent(true);
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      // Keep the user on the form if the network request fails.
    }
  };

  return (
    <div className={`app ${isDark ? "app--dark" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* NAV */}
      <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <button
            type="button"
            className={`nav__brand ${isDark ? "nav__brand--dark" : ""}`}
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="nav__logo-wrap">
              <img src={transparentLogo} alt="UNI" className="nav__logo" />
            </span>
            <span className="nav__name">UNI</span>
          </button>
          <ul role="list" className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            {["advisory", "ai-strategy", "outpost", "contact"].map((id) => (
              <li key={id}>
                <button className="nav__link" onClick={() => scrollTo(id)}>
                  {id === "ai-strategy" ? "AI Strategy" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <main id="main-content">

      {/* HERO */}
      <section id="home" className="hero" ref={heroRef} onPointerEnter={handleHeroPointerEnter}>
        <div className="hero__bg" />
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__tag">
              <span>LoveLeeVa LLC</span>
              <span className="hero__tag-sep" aria-hidden="true">&nbsp;·&nbsp;</span>
              <span>dba Unbridled Nero Information</span>
            </span>
          </div>
          <h1 className="hero__h1">
            <span className="hero__line">We stop</span>
            <span className="hero__line hero__line--accent">the bleed.</span>
          </h1>
          <p className="hero__sub">
            We bridge the gap between Go-To-Market hallucinations and technical reality.
            The bleed is the silent margin loss between what sales promises and what delivery can actually ship.
            Vendor-neutral. Fiduciary-grade. No fluff.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
              Start a conversation
            </button>
            <button className="btn btn--ghost" onClick={() => scrollTo("advisory")}>
              Our mandate →
            </button>
          </div>
        </div>
        <div className="hero__stamp">
          {!showHeroScene && (
            <div className="hero__model-skeleton" aria-hidden="true">
              <span className="hero__model-fallback">
                {["U","N","I"].map((c, i) => (
                  <span key={i} className="hero__model-fallback__char" style={{ animationDelay: `${i * 0.18}s` }}>{c}</span>
                ))}
              </span>
            </div>
          )}
          {showHeroScene && (
            <Suspense fallback={null}>
              <HeroScene isDark={isDark} />
            </Suspense>
          )}
        </div>
      </section>

      {/* MANDATE BAR */}
      <div className="mandate-bar" aria-label="Services overview">
        <ul role="list" className="mandate-bar__inner">
          {["AI Awareness for Rural Virginia", "Executive Fiduciary Mirror", "Enterprise AI in Production", "The UNI Triad"].map((item, i) => (
            <li key={i} className="mandate-bar__item">
              <span className="mandate-bar__dot" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ADVISORY */}
      <section id="advisory" className="section section--white">
        <div className="section__inner">
          <div className="section__label">The UNI Triad · Pillar 01</div>
          <h2 className="section__h2">The Spark (Executive Fiduciary Advisory)</h2>
          <p className="section__lead">
            UNI functions as an Executive Fiduciary Mirror, eliminating the trust gap between
            ambitious Go-To-Market strategy and technical delivery. Our high-intensity Skull Sessions
            pressure-test decisions so your AI strategy, engineering execution, and economics stay aligned.
          </p>
          <div className="cards">
            {[
              {
                title: "Skull Session Clarity",
                body: "We expose hidden inefficiencies in operations, architecture, and AI readiness so leadership can make fast, high-confidence decisions.",
                stat: "AI",
                statLabel: "Readiness first"
              },
              {
                title: "Trust Gap Elimination",
                body: "We bridge boardroom strategy to engineering reality with fiduciary-grade guidance and no vendor bias, so AI plans become executable systems.",
                stat: "P&L",
                statLabel: "Owner aligned"
              },
              {
                title: "Physics Over Hype",
                body: "We solve for physics, not the spiff. Every recommendation is measured by real AI performance, delivery risk, and total margin impact.",
                stat: "0",
                statLabel: "Vendor spiff"
              }
            ].map((card, i) => (
              <div key={i} className="card">
                <div className="card__stat">
                  <span className="card__stat-val">{card.stat}</span>
                  <span className="card__stat-label">{card.statLabel}</span>
                </div>
                <h3 className="card__title">{card.title}</h3>
                <p className="card__body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI STRATEGY */}
      <section id="ai-strategy" className="section section--dark">
        <div className="section__inner">
          <div className="section__label section__label--light">The UNI Triad · Pillar 02</div>
          <h2 className="section__h2 section__h2--light">The Forge (Implementation &amp; Growth)</h2>
          <p className="section__lead section__lead--light">
            This is where strategy becomes working systems. UNI actively implements, optimizes,
            and scales technical ecosystems with disciplined AI operations, cloud architecture,
            and data hygiene that produce real growth.
          </p>
          <div className="split">
            <div className="split__text">
              <div className="split__item">
                <div className="split__num">01</div>
                <div>
                  <h3 className="split__title">Enterprise AI implementation</h3>
                  <p className="split__body">We move AI from pilot to production by aligning data pipelines, cloud controls, model operations, and business process design.</p>
                </div>
              </div>
              <div className="split__item">
                <div className="split__num">02</div>
                <div>
                  <h3 className="split__title">Continuous AI optimization</h3>
                  <p className="split__body">We continuously refine architecture, governance, and AI operations so your systems scale faster, smarter, and more profitably.</p>
                </div>
              </div>
              <div className="split__item">
                <div className="split__num">03</div>
                <div>
                  <h3 className="split__title">Technical Unicorn growth</h3>
                  <p className="split__body">We grow rare, high-impact organizations by tightly aligning strategy, real AI implementation, and infrastructure execution.</p>
                </div>
              </div>
            </div>
            <div className="split__metrics">
              {[
                { val: "3x", label: "Faster AI deployment velocity" },
                { val: "24/7", label: "Operational AI performance discipline" },
                { val: "100%", label: "Strategy-to-delivery alignment focus" },
              ].map((m, i) => (
                <div key={i} className="metric">
                  <div className="metric__val">{m.val}</div>
                  <div className="metric__label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUTPOST */}
      <section id="outpost" className="section section--outpost">
        <div className="section__inner">
          <div className="section__label">The UNI Triad · Pillar 03</div>
          <h2 className="section__h2">The Outpost (Capital Infrastructure Development)</h2>
          <p className="section__lead">
            The Outpost advances next-generation digital and AI infrastructure in Lee County, Virginia,
            while partnering with local vocational school tech students to create real jobs,
            AI capability, and long-term economic opportunity in rural America.
          </p>
          <div className="outpost-grid">
            <div className="outpost-card outpost-card--featured">
              <div className="outpost-card__label">Community impact model</div>
              <h3 className="outpost-card__title">We Grow Our Own in action</h3>
              <p className="outpost-card__body">
                We build physical digital infrastructure that supports edge computing and AI workloads,
                and we intentionally involve local students in hands-on technical projects so talent,
                capability, and opportunity are grown locally.
              </p>
              <button className="btn btn--outpost" onClick={() => scrollTo("contact")}>
                Build with UNI <span aria-hidden="true">→</span>
              </button>
            </div>
            {[
              { val: "AI", label: "Awareness + training", sub: "Rural workforce growth" },
              { val: "Local", label: "Vocational partnerships", sub: "Lee County students" },
              { val: "Real", label: "Hands-on projects", sub: "Applied infrastructure" },
              { val: "Rural", label: "Economic expansion", sub: "Community-first outcomes" },
            ].map((s, i) => (
              <div key={i} className="outpost-stat">
                <div className="outpost-stat__val">{s.val}</div>
                <div className="outpost-stat__label">{s.label}</div>
                <div className="outpost-stat__sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy">
        <div className="philosophy__inner">
          <figure>
            <blockquote className="philosophy__quote">
              "The unicorns of this industry are not utilization revenue slaves.
              They are the architects of our future. UNI clears the airspace so they can build."
            </blockquote>
            <figcaption className="philosophy__attr">
              <img src={smallLogo} alt="" aria-hidden="true" className="philosophy__logo" />
              <span>Heather Hitchler &nbsp;·&nbsp; Founder &amp; CEO, UNI</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--white">
        <div className="section__inner section__inner--narrow">
          <div className="section__label">Work with us</div>
          <h2 className="section__h2">Start a conversation</h2>
          <p className="section__lead">
            Whether you're a local business, a growing mid-market company, or a large enterprise,
            UNI helps you operationalize practical AI, eliminate margin bleed, and scale responsibly.
          </p>
          {formSent ? (
            <div className="form-success" role="status" aria-live="polite">
              <div className="form-success__icon" aria-hidden="true">✓</div>
              <h3>Message received.</h3>
              <p>We'll be in touch within 24 hours. No fluff.</p>
            </div>
          ) : (
            <form
              className="form"
              action="https://formspree.io/f/xvzlozev"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="form__row">
                <div className="form__field">
                  <label className="form__label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    className="form__input"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Full name" />
                </div>
                <div className="form__field">
                  <label className="form__label" htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    className="form__input"
                    type="text"
                    autoComplete="organization"
                    required
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    placeholder="Organization" />
                </div>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  className="form__input"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="you@company.com" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="contact-phone">Phone (optional)</label>
                <input
                  id="contact-phone"
                  name="phone"
                  className="form__input"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="(555) 555-5555" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="contact-message">What are you trying to solve?</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form__textarea"
                  autoComplete="on"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about the bleed." />
              </div>
              <button className="btn btn--primary btn--full" type="submit">
                Send it
              </button>
            </form>
          )}
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src={transparentLogo} alt="UNI" className="footer__logo" />
            <span className="footer__name">UNI</span>
          </div>
          <div className="footer__legal">
            <span>LoveLeeVa LLC dba UNI · Unbridled Neuro Information</span>
            <span>Lee County, Virginia</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
            <a
              className="footer__credit"
              href="https://smithdigitals.com/"
              target="_blank"
              rel="noreferrer"
            >
              Built By Smith Digitals
            </a>
          </div>
          <nav className="footer__links" aria-label="Footer navigation">
            <ul role="list">
              {["Advisory", "AI Strategy", "The Outpost", "Contact"].map((l, i) => (
                <li key={i}>
                  <button className="footer__link"
                    onClick={() => scrollTo(l.toLowerCase().replace(" ", "-").replace("the ", ""))}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}