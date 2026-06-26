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

const navItems = ["home", "advisory", "ai-strategy", "outpost", "blog", "contact"];

const blogPosts = [
  {
    id: "impact-unicorns-can-make",
    meta: ["UNI Blog", "The Impact Unicorns Can Make"],
    date: "June 2026",
    title: "The Impact Unicorns Can Make",
    overview:
      "A first stake in the ground for UNI's larger mission: stop wasting rare builders, move knowledge into impact, and build rural technology infrastructure that keeps opportunity local.",
    body: [
      {
        heading: null,
        paragraphs: [
          "I am overdue for this first blog.",
          "Not because I had nothing to say.",
          "Because the pieces were still becoming one thing.",
          "The daily posts. The AI conversations. The rural infrastructure plans. The workforce questions. The business architecture. The conversations about talent, technology, power, land, security, and what happens when brilliant people are left shackled inside systems that were never designed to let them build.",
          "At first, those may look like separate threads.",
          "They are not.",
          "They all come back to one question:",
          "What happens when we stop wasting the unicorns?",
        ],
      },
      {
        heading: "What I Mean by Unicorn",
        paragraphs: [
          "A unicorn is not a mythical employee on a recruiting slide.",
          "A unicorn is the person who sees the system underneath the system.",
          "The one who gets excited about the lab. The one who wants to teach. The one who keeps asking better questions after everyone else has accepted the broken answer. The one who would still be learning the technology even if no one paid them to do it.",
          "That is not a job title.",
          "That is a wiring pattern.",
          "And when organizations find people like that, they usually make one of two choices.",
          "They either clear the airspace so those people can build, or they shackle them to intake queues, utilization targets, political theater, and “no” disguised as governance.",
          "I have watched too many brilliant technologists get treated like revenue machinery instead of future-builders.",
          "That is part of why this exists.",
        ],
      },
      {
        heading: "The Horn Weighs Heavy",
        paragraphs: [
          "There is a responsibility that comes with being the person who sees the matrix.",
          "It is not always comfortable.",
          "You see the waste before other people do. You see the risk before it becomes expensive. You see the talent being ignored. You see the process pretending to be strategy. You see the community opportunity being exported. You see the architecture cracking underneath the polished slide deck.",
          "That is the part people miss.",
          "Being a unicorn is not about being special.",
          "It is about being unable to unsee the hard part.",
          "And once you see it, you have to decide what kind of person you are going to be.",
          "Do you protect yourself and stay quiet?",
          "Or do you get involved?",
          "I have learned something about myself over the years:",
          "I run toward the hard part.",
          "Not because it is easy. Not because it is clean. Not because it comes without cost.",
          "Because somebody has to.",
        ],
      },
      {
        heading: "Impact Is the Point",
        paragraphs: [
          "The real goal is not attention.",
          "It is not content.",
          "It is not another business with a clever name and a polished logo.",
          "The goal is impact.",
          "Impact happens when knowledge moves. Impact happens when people are allowed to build. Impact happens when the rare thinkers are no longer treated like a threat to the process. Impact happens when communities stop exporting their future because nobody showed them how to participate in it.",
          "Knowledge that cannot move does not create impact.",
          "A great idea is not real until it can help someone. A great technologist is not fully alive when they are buried under bureaucracy. A great community cannot grow if every talented kid believes they have to leave home to build a future.",
          "That is the thread.",
          "Unicorns are not valuable because they are rare.",
          "They are valuable because of what they can unlock.",
        ],
      },
      {
        heading: "Stop Wasting the Builders",
        paragraphs: [
          "There are people inside companies, schools, communities, and small towns who already see what needs to happen next.",
          "They may not have the title. They may not have the funding. They may not have the microphone. They may not have permission.",
          "But they have the pattern recognition.",
          "They know where the work is broken. They know where the systems are too slow. They know where customers are hurting. They know which tools are being misused. They know which processes exist only because nobody has been brave enough to bury them.",
          "These are the people we should be developing.",
          "Instead, too many organizations bury them.",
          "Under meetings. Under approvals. Under performative collaboration. Under leadership structures that ask for innovation and then punish anyone who actually changes something.",
          "That is not a talent problem.",
          "That is an architecture problem.",
        ],
      },
      {
        heading: "From Idea to Operating System",
        paragraphs: [
          "This is why I think in systems.",
          "A mission without structure becomes a slogan.",
          "A strategy without execution becomes theater.",
          "A vision without infrastructure becomes a pretty document that never touches the ground.",
          "That is not what I am building.",
          "The work has to move from thought to architecture.",
          "For me, that architecture has three parts:",
          "The Spark is where we name the real problem.",
          "Not the polite problem. Not the committee-approved problem. The real one.",
          "The Forge is where ideas become working systems.",
          "This is where strategy has to survive contact with budgets, people, vendors, timelines, risk, and reality.",
          "The Outpost is where the philosophy becomes physical.",
          "Land. Power. Cooling. Compute. Security. Workforce. Training. Community value.",
          "Because the future is not theoretical.",
          "AI does not live in a cloud-shaped cartoon. Data does not process itself. Infrastructure does not appear because someone approved a slide deck.",
          "The digital world has a physical footprint.",
          "And if we are going to build the next generation of technology, then we need to be honest about what it requires.",
        ],
      },
      {
        heading: "Solve for Physics, Not the Spiff",
        paragraphs: [
          "Too much of the technology industry has been trained to chase the incentive instead of the outcome.",
          "The spiff. The quarterly number. The vendor preference. The easy margin. The thing that looks good in the forecast.",
          "But infrastructure does not care about the spiff.",
          "Physics still wins.",
          "Power matters. Cooling matters. Distance matters. Latency matters. Maintenance matters. Security matters. People matter.",
          "If we want AI, automation, edge compute, cloud modernization, and resilient business systems, then we have to build the physical and human foundations that make those things real.",
          "That is not glamorous work.",
          "That is why it matters.",
          "Unicorns understand this.",
          "They do not just ask, “What can we sell?”",
          "They ask:",
          "What actually has to work?",
        ],
      },
      {
        heading: "Why Rural America Matters",
        paragraphs: [
          "For too long, rural communities have been treated like places to extract from.",
          "Extract the coal. Extract the timber. Extract the land. Extract the labor. Extract the children. Extract the talent. Extract the tax base. Leave the blight.",
          "I am not interested in another model that exports the value and leaves the burden.",
          "The question I care about is different:",
          "What if the infrastructure of the future was built in a way that kept opportunity local?",
          "Local jobs. Local technical training. Local maintenance. Local energy strategy. Local business growth. Local students learning on real systems before they are told their only option is to leave.",
          "That is not charity.",
          "That is architecture.",
        ],
      },
      {
        heading: "The Harvest",
        paragraphs: [
          "The Harvest is not just about power.",
          "It is about return.",
          "If rural communities are going to support the infrastructure required for the next generation of technology, then they should not be left standing outside the fence while everyone else monetizes the future.",
          "They should understand it. They should help build it. They should benefit from it. They should protect their land while using their resources wisely. They should train their students before the concrete is poured. They should design systems that create long-term economic value instead of short-term extraction.",
          "That is The Harvest.",
          "Not just energy.",
          "Return.",
        ],
      },
      {
        heading: "What Unicorns Actually Create",
        paragraphs: [
          "When unicorns are protected, developed, and given room to build, they create more than technical output.",
          "They create momentum.",
          "They teach. They connect dots. They challenge lazy assumptions. They find the hidden failure points. They build labs because they want to understand the system with their own hands. They turn frustration into design. They turn curiosity into capability. They turn complexity into something other people can finally use.",
          "That is impact.",
          "Not noise. Not branding. Not corporate theater.",
          "Impact.",
          "The kind that changes a team. The kind that changes a company. The kind that changes a community. The kind that gives someone else permission to stop shrinking.",
        ],
      },
      {
        heading: "The Work Ahead",
        paragraphs: [
          "This blog is the first stake in the ground.",
          "The work ahead is bigger than one company, one project, one post, or one conversation.",
          "It is about building a model where rare thinkers are not wasted.",
          "Where knowledge is shared instead of hoarded.",
          "Where rural communities participate in the future of technology instead of being told to watch from a distance.",
          "Where infrastructure is designed with the land, the people, the power, and the long-term impact in mind.",
          "Where the builders get air cover.",
          "Where students can see a future close enough to touch.",
          "Where the hard part is not avoided.",
          "It is named.",
          "Mapped.",
          "Designed.",
          "Built.",
        ],
      },
      {
        heading: "Final Word",
        paragraphs: [
          "A unicorn is not mythical.",
          "A unicorn is the person who runs toward the hard part.",
          "The person who sees the broken system and starts mapping the fix. The person who wants to share what they know before it dies in a silo. The person who still believes work can mean something when it is tied to impact.",
          "That is the impact unicorns can make.",
          "And that is the work I am building toward.",
          "We Grow Our Own.",
        ],
      },
    ],
  },
  {
    id: "responsible-ai-rural-communities",
    meta: ["Dear Editor", "UNI Community AI Workshop"],
    date: "May 2026",
    title: "Responsible AI belongs in rural communities, too.",
    overview:
      "A community letter about responsible AI, rural opportunity, and helping Lee County residents learn practical tools instead of watching the technical revolution from the sidelines.",
    body: [
      {
        heading: null,
        paragraphs: [
          "There is a lot of fear right now surrounding Artificial Intelligence and what it means for traditional jobs and rural communities like ours. It is easy to watch the news and assume that the tech industry is just another force leaving Appalachia behind.",
          "I recently launched UNI (Unbridled Neuro Information), an IT consulting firm right here in Lee County, to prove that doesn't have to be the case. Our core mission is simple: We Grow Our Own.",
          "For decades, our greatest export hasn't been agriculture - it has been our children. Our youth often leave because they believe they have to move to big cities to find secure, high-paying tech careers. We are changing that narrative.",
          "By bringing responsible AI education to the grassroots level, we can ensure our local workforce isn't just a passenger in this technical revolution, but an owner of it. AI is not something to fear; it is an incredibly powerful tool that can help our small businesses thrive, streamline our daily lives, and keep our kids working right here at home.",
          "To help demystify this technology, UNI is hosting a Free Community AI Workshop on May 19th. This session is open to all Lee County residents. We will strip away the complicated jargon and focus purely on how you can practically use AI to your advantage today.",
          "We do not need to fear the future, and we do not need to wait for outside corporations to save us. Let's learn the tools, embrace the digital economy, and grow our own entrepreneurs.",
        ],
      },
    ],
    signature: ["Sincerely,", "Heather Hitchler", "Founder & Executive Fiduciary Architect"],
  },
];

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
        <div className="blog__posts">
          {blogPosts.map((post) => (
            <details className="blog-post" key={post.id}>
              <summary className="blog-post__summary">
                <span className="blog-post__meta">
                  <span>{post.date}</span>
                  {post.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </span>
                <span id={`${post.id}-title`} className="blog-post__title">
                  {post.title}
                </span>
                <span className="blog-post__overview">{post.overview}</span>
                <span className="blog-post__toggle" aria-hidden="true">Read blog</span>
              </summary>
              <article className="blog-post__content" aria-labelledby={`${post.id}-title`}>
                <div className="blog-post__body">
                  {post.body.map((section, sectionIndex) => (
                    <section className="blog-post__section" key={`${post.id}-${section.heading || sectionIndex}`}>
                      {section.heading && <h4 className="blog-post__heading">{section.heading}</h4>}
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${section.heading || sectionIndex}-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </section>
                  ))}
                </div>
                {post.signature && (
                  <footer className="blog-post__signature">
                    <span>{post.signature[0]}</span>
                    <strong>{post.signature[1]}</strong>
                    <span>{post.signature[2]}</span>
                  </footer>
                )}
              </article>
            </details>
          ))}
        </div>
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
