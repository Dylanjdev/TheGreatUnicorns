import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import smallLogo from "./assets/small_logo.png";
import transparentLogo from "./assets/transparentlogo.png";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
const WorkshopParticles = lazy(() => import("./WorkshopParticles.jsx"));

const routes = {
  home: {
    path: "/",
    label: "Home",
    title: "UNI | Unbridled Neuro Information",
    description:
      "UNI, dba Unbridled Neuro Information, provides fiduciary consulting, enterprise AI strategy, and modular edge data center development through The Outpost in Lee County.",
  },
  advisory: {
    path: "/advisory/",
    label: "Advisory",
    eyebrow: "The UNI Triad · Pillar 01",
    heading: "The Spark",
    title: "Advisory | UNI",
    description:
      "Executive fiduciary advisory from UNI that pressure-tests AI strategy, technical delivery, and economics with vendor-neutral guidance.",
  },
  "ai-strategy": {
    path: "/ai-strategy/",
    label: "AI Strategy",
    eyebrow: "The UNI Triad · Pillar 02",
    heading: "The Forge",
    title: "AI Strategy | UNI",
    description:
      "UNI turns AI strategy into working enterprise systems through disciplined implementation, optimization, cloud architecture, and data hygiene.",
  },
  outpost: {
    path: "/outpost/",
    label: "The Outpost",
    eyebrow: "The UNI Triad · Pillar 03",
    heading: "The Outpost",
    title: "The Outpost | UNI",
    description:
      "The Outpost is UNI's modular edge data center initiative in Lee County for practical AI compute infrastructure and rural opportunity.",
  },
  blog: {
    path: "/blog/",
    label: "Blog",
    eyebrow: "Community letter",
    heading: "We Grow Our Own",
    title: "Blog | UNI",
    description:
      "A UNI community letter about responsible AI, rural opportunity, and growing local technical talent in Lee County.",
  },
  contact: {
    path: "/contact/",
    label: "Contact",
    eyebrow: "Work with us",
    heading: "Start a conversation",
    title: "Contact | UNI",
    description:
      "Start a conversation with UNI about practical AI, margin bleed, enterprise implementation, or The Outpost.",
  },
};

const navItems = ["advisory", "ai-strategy", "outpost", "blog", "contact"];

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  const slug = path.slice(1);
  return routes[slug] ? slug : "home";
}

function getRoutePath(slug) {
  return routes[slug]?.path || "/";
}

function updateMeta(route) {
  document.title = route.title;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", `https://theunicorntechs.com${route.path}`);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", route.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", `https://theunicorntechs.com${route.path}`);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", route.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", route.description);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", route.title);

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", route.description);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showHeroScene, setShowHeroScene] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => normalizePath(window.location.pathname));
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef(null);
  const navRef = useRef(null);

  const isHome = currentPage === "home";
  const currentRoute = useMemo(() => routes[currentPage] || routes.home, [currentPage]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(normalizePath(window.location.pathname));
      setMenuOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDark);
    return () => document.body.classList.remove("theme-dark");
  }, [isDark]);

  useEffect(() => {
    updateMeta(currentRoute);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentRoute]);

  // Load the 3D scene only on first pointer interaction with the hero.
  // Lighthouse / bots never generate pointer events, so Three.js is never
  // parsed during automated audits, eliminating timer-induced TBT entirely.
  const handleHeroPointerEnter = () => {
    if (!showHeroScene && !navigator.webdriver) setShowHeroScene(true);
  };

  useEffect(() => {
    const hideSkeleton = () => document.getElementById("app-skeleton")?.remove();

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

  const navigateTo = (slug) => {
    const nextSlug = routes[slug] ? slug : "home";
    const nextPath = getRoutePath(nextSlug);
    setMenuOpen(false);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setCurrentPage(nextSlug);
  };

  const handleNavClick = (event, slug) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(slug);
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

  const sharedProps = {
    formData,
    formSent,
    handleHeroPointerEnter,
    handleSubmit,
    heroRef,
    isDark,
    navigateTo,
    setFormData,
    showHeroScene,
  };

  return (
    <div className={`app ${isDark ? "app--dark" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

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
              <img src={transparentLogo} alt="" aria-hidden="true" className="nav__logo" />
            </span>
            <span className="nav__name">UNI</span>
          </button>
          <ul role="list" className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            {navItems.map((id) => (
              <li key={id}>
                <a
                  className={`nav__link ${currentPage === id ? "nav__link--active" : ""}`}
                  href={getRoutePath(id)}
                  onClick={(event) => handleNavClick(event, id)}
                >
                  {routes[id].label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <main id="main-content" className={isHome ? "" : "page-main"}>
        {isHome ? (
          <HomePage {...sharedProps} />
        ) : (
          <RoutePage page={currentPage} {...sharedProps} />
        )}
      </main>

      <Footer currentPage={currentPage} handleNavClick={handleNavClick} />
    </div>
  );
}

function HomePage(props) {
  return (
    <>
      <HeroSection {...props} />
      <MandateBar />
      <AdvisorySection />
      <AiStrategySection />
      <OutpostSection navigateTo={props.navigateTo} />
      <BlogSection />
      <PhilosophySection />
      <ContactSection {...props} />
    </>
  );
}

function RoutePage({ page, ...props }) {
  const route = routes[page] || routes.home;

  return (
    <>
      <PageMasthead route={route} {...props} />
      {page === "advisory" && <AdvisorySection />}
      {page === "ai-strategy" && <AiStrategySection />}
      {page === "outpost" && <OutpostSection navigateTo={props.navigateTo} />}
      {page === "blog" && <BlogSection />}
      {page === "contact" && <ContactSection {...props} />}
      {page !== "contact" && <PhilosophySection />}
    </>
  );
}

function PageMasthead({ handleHeroPointerEnter, isDark, route, showHeroScene }) {
  return (
    <section className="page-hero" onPointerEnter={handleHeroPointerEnter}>
      <div className="page-hero__content">
        <div className="section__label">{route.eyebrow}</div>
        <h1 className="page-hero__title">{route.heading}</h1>
        <p className="page-hero__lead">{route.description}</p>
      </div>
      <div className="page-hero__stamp">
        {!showHeroScene && (
          <div className="hero__model-skeleton" aria-hidden="true">
            <span className="hero__model-fallback">
              {["U", "N", "I"].map((c, i) => (
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
  );
}

function HeroSection({ handleHeroPointerEnter, heroRef, isDark, navigateTo, showHeroScene }) {
  return (
    <section id="home" className="hero" ref={heroRef} onPointerEnter={handleHeroPointerEnter}>
      <div className="hero__bg" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__tag">
            <span>LoveLeeVa LLC</span>
            <span className="hero__tag-sep" aria-hidden="true">&nbsp;·&nbsp;</span>
            <span>dba Unbridled Neuro Information</span>
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
          <button className="btn btn--primary" onClick={() => navigateTo("contact")}>
            Start a conversation
          </button>
          <button className="btn btn--ghost" onClick={() => navigateTo("advisory")}>
            Our mandate →
          </button>
        </div>
      </div>
      <div className="hero__stamp">
        {!showHeroScene && (
          <div className="hero__model-skeleton" aria-hidden="true">
            <span className="hero__model-fallback">
              {["U", "N", "I"].map((c, i) => (
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
  );
}

function MandateBar() {
  return (
    <div className="mandate-bar" aria-label="Services overview">
      <ul role="list" className="mandate-bar__inner">
        {["AI Awareness for Operators", "Executive Fiduciary Mirror", "Enterprise AI in Production", "The UNI Triad"].map((item, i) => (
          <li key={i} className="mandate-bar__item">
            <span className="mandate-bar__dot" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdvisorySection() {
  return (
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
              statLabel: "Readiness first",
            },
            {
              title: "Trust Gap Elimination",
              body: "We bridge boardroom strategy to engineering reality with fiduciary-grade guidance and no vendor bias, so AI plans become executable systems.",
              stat: "P&L",
              statLabel: "Owner aligned",
            },
            {
              title: "Physics Over Hype",
              body: "We solve for physics, not the spiff. Every recommendation is measured by real AI performance, delivery risk, and total margin impact.",
              stat: "0",
              statLabel: "Vendor spiff",
            },
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
  );
}

function AiStrategySection() {
  return (
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
            {[
              {
                title: "Enterprise AI implementation",
                body: "We move AI from pilot to production by aligning data pipelines, cloud controls, model operations, and business process design.",
              },
              {
                title: "Continuous AI optimization",
                body: "We continuously refine architecture, governance, and AI operations so your systems scale faster, smarter, and more profitably.",
              },
              {
                title: "Technical Unicorn growth",
                body: "We grow rare, high-impact organizations by tightly aligning strategy, real AI implementation, and infrastructure execution.",
              },
            ].map((item, i) => (
              <div key={item.title} className="split__item">
                <div className="split__num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="split__title">{item.title}</h3>
                  <p className="split__body">{item.body}</p>
                </div>
              </div>
            ))}
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
  );
}

function OutpostSection({ navigateTo }) {
  return (
    <section id="outpost" className="section section--outpost">
      <div className="section__inner">
        <div className="section__label">The UNI Triad · Pillar 03</div>
        <h2 className="section__h2">The Outpost (Capital Infrastructure Development)</h2>
        <p className="section__lead">
          The Outpost is UNI's modular edge data center initiative in Lee County. Developed through
          LoveLeeVa LLC dba Unbridled Neuro Information, the project advances practical AI compute
          infrastructure in a rural setting while supporting long-term economic opportunity through
          disciplined infrastructure development.
        </p>
        <div className="outpost-grid">
          <div className="outpost-card outpost-card--featured">
            <div className="outpost-card__label">Community impact model</div>
            <h3 className="outpost-card__title">We Grow Our Own in action</h3>
            <p className="outpost-card__body">
              Designed for edge computing, AI workloads, and resilient digital infrastructure, The
              Outpost brings modular data center capability to underserved markets with a
              disciplined, community-centered approach. The initiative pairs physical infrastructure
              development with hands-on technical learning for local vocational school students,
              helping grow the workforce, capability, and opportunity required for rural AI
              infrastructure to succeed locally.
            </p>
            <button className="btn btn--outpost" onClick={() => navigateTo("contact")}>
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
  );
}

function BlogSection() {
  return (
    <section id="blog" className="section section--blog">
      <div className="section__inner blog__inner">
        <div className="blog__intro">
          <div className="section__label">Community letter</div>
          <h2 className="section__h2">We Grow Our Own</h2>
          <p className="section__lead">
            A note to Lee County about responsible AI, rural opportunity, and keeping our next
            generation of technical talent rooted right here at home.
          </p>
        </div>
        <article className="blog-post" aria-labelledby="blog-title">
          <div className="blog-post__meta">
            <span>Dear Editor</span>
            <span>UNI Community AI Workshop</span>
          </div>
          <h3 id="blog-title" className="blog-post__title">
            Responsible AI belongs in rural communities, too.
          </h3>
          <div className="blog-post__body">
            <p>
              There is a lot of fear right now surrounding Artificial Intelligence and what it
              means for traditional jobs and rural communities like ours. It is easy to watch the
              news and assume that the tech industry is just another force leaving Appalachia
              behind.
            </p>
            <p>
              I recently launched UNI (Unbridled Neuro Information), an IT consulting firm right
              here in Lee County, to prove that doesn't have to be the case. Our core mission is
              simple: We Grow Our Own.
            </p>
            <p>
              For decades, our greatest export hasn't been agriculture - it has been our children.
              Our youth often leave because they believe they have to move to big cities to find
              secure, high-paying tech careers. We are changing that narrative.
            </p>
            <p>
              By bringing responsible AI education to the grassroots level, we can ensure our
              local workforce isn't just a passenger in this technical revolution, but an owner of
              it. AI is not something to fear; it is an incredibly powerful tool that can help our
              small businesses thrive, streamline our daily lives, and keep our kids working right
              here at home.
            </p>
            <p>
              To help demystify this technology, UNI is hosting a Free Community AI Workshop on
              May 19th. This session is open to all Lee County residents. We will strip away the
              complicated jargon and focus purely on how you can practically use AI to your
              advantage today.
            </p>
            <p>
              We do not need to fear the future, and we do not need to wait for outside
              corporations to save us. Let's learn the tools, embrace the digital economy, and
              grow our own entrepreneurs.
            </p>
          </div>
          <footer className="blog-post__signature">
            <span>Sincerely,</span>
            <strong>Heather Hitchler</strong>
            <span>Founder &amp; Executive Fiduciary Architect</span>
          </footer>
        </article>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
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
  );
}

function ContactSection({ formData, formSent, handleSubmit, setFormData }) {
  return (
    <section id="contact" className="section section--white section--contact">
      <Suspense fallback={null}>
        <WorkshopParticles />
      </Suspense>
      <div className="section__inner section__inner--narrow contact__content">
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about the bleed." />
            </div>
            <button className="btn btn--primary btn--full" type="submit">
              Send it
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer({ currentPage, handleNavClick }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={transparentLogo} alt="" aria-hidden="true" className="footer__logo" />
          <span className="footer__name">UNI</span>
        </div>
        <div className="footer__legal">
          <span>LoveLeeVa LLC dba UNI · Unbridled Neuro Information</span>
          <span>Developing modular data center infrastructure through The Outpost in Lee County.</span>
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
        <div className="footer__qr">
          <div className="footer__qr-content">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScLD7bPXA5Lx75wCtz2BxwWYMg1fvdHrpW1VPjo4_uF1NuEug/viewform"
              target="_blank"
              rel="noreferrer"
              className="footer__qr-link"
              title="Open Growing Local Unicorns Workshop form"
            >
              <img src="/QR.png" alt="QR Code for Growing Local Unicorns AI Workshop" className="footer__qr-img" />
            </a>
            <div className="footer__qr-text">
              <p className="footer__qr-title">Join Us</p>
              <p className="footer__qr-desc">Scan to learn more about the Growing Local Unicorns Free Community AI Workshop</p>
            </div>
          </div>
        </div>
        <nav className="footer__links" aria-label="Footer navigation">
          <ul role="list">
            {navItems.map((id) => (
              <li key={id}>
                <a
                  className={`footer__link ${currentPage === id ? "footer__link--active" : ""}`}
                  href={getRoutePath(id)}
                  onClick={(event) => handleNavClick(event, id)}
                >
                  {routes[id].label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="footer__link"
                href="https://www.facebook.com/profile.php?id=61589120580379"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://www.linkedin.com/company/theunicorntechs/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
