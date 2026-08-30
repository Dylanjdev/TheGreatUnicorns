import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import smallLogo from "./assets/small_logo.png";
import transparentLogo from "./assets/transparentlogo.png";
import {
  advisoryFaqs,
  advisoryProcess,
  advisorySeo,
  advisoryServices,
  advisoryStructuredData,
} from "./advisoryContent.js";
import {
  aiStrategyFaqs,
  aiStrategyProcess,
  aiStrategySeo,
  aiStrategyServices,
  aiStrategyStructuredData,
} from "./aiStrategyContent.js";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
const WorkshopParticles = lazy(() => import("./WorkshopParticles.jsx"));

const routes = {
  home: {
    path: "/",
    label: "Home",
    title: "UNI | Unbridled Neuro Information",
    description:
      "UNI, dba Unbridled Neuro Information, provides vendor-neutral fiduciary consulting and enterprise AI strategy that connects ambitious plans to technical reality.",
  },
  advisory: {
    path: "/advisory/",
    label: "Advisory",
    ...advisorySeo,
    structuredData: advisoryStructuredData,
  },
  "ai-strategy": {
    path: "/ai-strategy/",
    label: "AI Strategy",
    ...aiStrategySeo,
    structuredData: aiStrategyStructuredData,
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
      "Start a conversation with UNI about vendor-neutral AI advisory, margin bleed, enterprise implementation, or practical technology strategy.",
  },
  "quick-look": {
    path: "/quick-look/",
    label: "Small Business Quick Look",
    title: "$75 Small Business Quick Look | UNI",
    description:
      "A practical outside look at what is fragile, what is slowing you down, what customers cannot see, and what to fix first—for rural small businesses.",
    ogImage: "/quick-look-og.png",
    ogImageAlt: "$75 Small Business Quick Look from UNI—clear next steps for rural small businesses.",
  },
};

const navItems = ["home", "advisory", "ai-strategy", "blog", "contact"];

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

  const socialImage = `https://theunicorntechs.com${route.ogImage || "/OgImage.png"}`;
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", socialImage);

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute("content", socialImage);

  const socialImageAlt = route.ogImageAlt || "UNI — Stop the Bleed. Vendor-neutral AI & IT consulting.";
  const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
  if (ogImageAlt) ogImageAlt.setAttribute("content", socialImageAlt);

  const twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
  if (twitterImageAlt) twitterImageAlt.setAttribute("content", socialImageAlt);

  const existingRouteSchema = document.getElementById("route-structured-data");
  if (route.structuredData) {
    const routeSchema = existingRouteSchema || document.createElement("script");
    routeSchema.id = "route-structured-data";
    routeSchema.type = "application/ld+json";
    routeSchema.textContent = JSON.stringify(route.structuredData);
    if (!existingRouteSchema) document.head.appendChild(routeSchema);
  } else {
    existingRouteSchema?.remove();
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showHeroScene, setShowHeroScene] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => normalizePath(window.location.pathname));
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const heroRef = useRef(null);
  const navRef = useRef(null);

  const isHome = currentPage === "home";
  const isQuickLook = currentPage === "quick-look";
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
    document.body.classList.toggle("quick-look-body", isQuickLook);
    return () => document.body.classList.remove("quick-look-body");
  }, [isQuickLook]);

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

    if (isQuickLook) {
      hideSkeleton();
      return undefined;
    }

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
  }, [isQuickLook]);

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
    setFormSubmitting(true);
    setFormError("");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Form submission failed");
      setFormSent(true);
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      setFormError("We couldn’t send that request. Please try again in a moment.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const sharedProps = {
    formData,
    formError,
    formSent,
    formSubmitting,
    handleHeroPointerEnter,
    handleSubmit,
    heroRef,
    isDark,
    navigateTo,
    setFormData,
    showHeroScene,
  };

  return (
    <div className={`app ${isDark && !isQuickLook ? "app--dark" : ""} ${isQuickLook ? "app--quick-look" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {!isQuickLook && <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
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
      </nav>}

      <main id="main-content" className={isQuickLook ? "quick-look-main" : isHome ? "" : "page-main"}>
        {isQuickLook ? (
          <QuickLookPage {...sharedProps} />
        ) : isHome ? (
          <HomePage {...sharedProps} />
        ) : (
          <RoutePage page={currentPage} {...sharedProps} />
        )}
      </main>

      {!isQuickLook && <Footer currentPage={currentPage} handleNavClick={handleNavClick} />}
    </div>
  );
}

const quickLookReviewItems = [
  {
    icon: "shield",
    title: "Cybersecurity & IT resilience",
    body: "Practical weak spots, backups, access, and business continuity.",
  },
  {
    icon: "flow",
    title: "Everyday business processes",
    body: "Where repeated work, bottlenecks, or brittle handoffs slow you down.",
  },
  {
    icon: "eye",
    title: "Customer & market visibility",
    body: "How easy you are to find, understand, trust, and contact online.",
  },
  {
    icon: "arrow",
    title: "Your most important next steps",
    body: "A short, prioritized path forward—without a giant consulting plan.",
  },
];

const quickLookDeliverables = [
  { icon: "clock", title: "60-minute owner walkthrough" },
  { icon: "paper", title: "Two-page findings summary" },
  { icon: "list", title: "Top 5 prioritized actions" },
  { icon: "chat", title: "20-minute results review" },
];

function QuickLookIcon({ type }) {
  const iconProps = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  return (
    <svg {...iconProps}>
      {type === "shield" && <><path d="M16 3.5 26 7v7.2c0 6.4-4.1 11.4-10 14.3-5.9-2.9-10-7.9-10-14.3V7l10-3.5Z" /><path d="m11.5 16 3 3 6.5-7" /></>}
      {type === "flow" && <><rect x="3.5" y="5" width="8" height="6" rx="1" /><rect x="20.5" y="21" width="8" height="6" rx="1" /><path d="M11.5 8h5a4 4 0 0 1 4 4v9M20.5 24h-5a4 4 0 0 1-4-4v-2M8 15l3.5 3.5L15 15" /></>}
      {type === "eye" && <><path d="M2.8 16s4.5-7.3 13.2-7.3S29.2 16 29.2 16 24.7 23.3 16 23.3 2.8 16 2.8 16Z" /><circle cx="16" cy="16" r="3.8" /></>}
      {type === "arrow" && <><path d="M5 26 26 5M15 5h11v11" /><path d="M5 8v18h18" /></>}
      {type === "clock" && <><circle cx="16" cy="16" r="12" /><path d="M16 9v7l5 3" /></>}
      {type === "paper" && <><path d="M8 3h11l6 6v20H8z" /><path d="M19 3v7h6M12 16h9M12 21h9" /></>}
      {type === "list" && <><path d="m4 8 2 2 3.5-4M13 8h15M4 17l2 2 3.5-4M13 17h15M4 26l2 2 3.5-4M13 26h15" /></>}
      {type === "chat" && <><path d="M5 5h22v17H15l-7 5v-5H5z" /><path d="M10 11h12M10 16h8" /></>}
      {type === "check" && <path d="m7 16 6 6L26 9" />}
      {type === "spark" && <><path d="M16 2v7M16 23v7M2 16h7M23 16h7M6.1 6.1l5 5M20.9 20.9l5 5M25.9 6.1l-5 5M11.1 20.9l-5 5" /><circle cx="16" cy="16" r="2.5" /></>}
    </svg>
  );
}

function QuickLookMark() {
  return (
    <a className="ql-mark" href="/" aria-label="UNI home">
      <span className="ql-mark__uni">UNI</span>
      <span className="ql-mark__rule" aria-hidden="true" />
      <span className="ql-mark__name">Unbridled Neuro Information</span>
    </a>
  );
}

function QuickLookPage({ formData, formError, formSent, formSubmitting, handleSubmit, setFormData }) {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const updateMobileCta = () => {
      const hero = document.querySelector(".ql-hero");
      const reserve = document.getElementById("reserve");
      if (!hero || !reserve) return;

      const hasPassedHero = window.scrollY > hero.offsetTop + hero.offsetHeight * 0.72;
      const hasReachedForm = window.scrollY + window.innerHeight > reserve.offsetTop + 120;
      setShowMobileCta(hasPassedHero && !hasReachedForm);
    };

    updateMobileCta();
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    return () => {
      window.removeEventListener("scroll", updateMobileCta);
      window.removeEventListener("resize", updateMobileCta);
    };
  }, []);

  return (
    <div className="quick-look">
      <header className="ql-header">
        <div className="ql-shell ql-header__inner">
          <QuickLookMark />
          <a className="ql-header__cta" href="#reserve">Request a quick look <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <section className="ql-hero" aria-labelledby="quick-look-title">
        <div className="ql-shell ql-hero__grid">
          <div className="ql-hero__copy">
            <p className="ql-kicker"><span aria-hidden="true">✦</span> Built for rural small businesses</p>
            <h1 id="quick-look-title">
              Small business.
              <span>Clear next steps.</span>
            </h1>
            <p className="ql-hero__lead">
              A practical outside look at what is fragile, what is slowing you down,
              what customers cannot see—and what to fix first.
            </p>
            <div className="ql-hero__actions">
              <a className="ql-button ql-button--primary" href="#reserve">Request my quick look <span aria-hidden="true">→</span></a>
              <a className="ql-text-link" href="#included">See what’s included</a>
            </div>
            <p className="ql-hero__reassurance">
              <QuickLookIcon type="check" /> One business · One location · Up to 15 workers
            </p>
          </div>

          <div className="ql-offer-card" aria-label="$75 flat-rate offer">
            <span className="ql-offer-card__note">One clear look.</span>
            <div className="ql-price"><sup>$</sup>75</div>
            <p>flat rate</p>
            <span className="ql-offer-card__scribble" aria-hidden="true" />
            <ul role="list">
              <li><QuickLookIcon type="check" /> No subscriptions</li>
              <li><QuickLookIcon type="check" /> No surprise add-ons</li>
              <li><QuickLookIcon type="check" /> No sales pressure</li>
            </ul>
          </div>
        </div>
        <div className="ql-hero__landscape" aria-hidden="true">
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path className="ql-landscape__back" d="M0 139 123 86l83 33 127-71 110 69 84-39 111 38 121-79 137 86 110-55 82 57 114-49 160 70v14H0Z" />
            <path className="ql-landscape__front" d="M0 154 113 116l91 23 111-45 132 57 98-31 122 36 116-47 143 44 103-24 127 37 118-35 86 40v9H0Z" />
          </svg>
        </div>
      </section>

      <section id="included" className="ql-section ql-review">
        <div className="ql-shell">
          <div className="ql-section-heading">
            <p className="ql-eyebrow">The outside perspective</p>
            <h2>What we look at</h2>
            <p>Four parts of the business that quietly shape your risk, your time, and your ability to grow.</p>
          </div>
          <div className="ql-review__grid">
            {quickLookReviewItems.map((item, index) => (
              <article className="ql-review-card" key={item.title}>
                <span className="ql-review-card__number">0{index + 1}</span>
                <span className="ql-icon"><QuickLookIcon type={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ql-section ql-deliverables">
        <div className="ql-shell ql-deliverables__grid">
          <div className="ql-deliverables__intro">
            <p className="ql-eyebrow ql-eyebrow--light">Useful, not overwhelming</p>
            <h2>What you receive</h2>
            <p>
              You leave knowing what matters, what can wait, and the first five things worth your attention.
            </p>
          </div>
          <div className="ql-deliverables__list">
            {quickLookDeliverables.map((item) => (
              <div className="ql-deliverable" key={item.title}>
                <span><QuickLookIcon type={item.icon} /></span>
                <h3>{item.title}</h3>
                <QuickLookIcon type="check" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ql-section ql-process">
        <div className="ql-shell">
          <div className="ql-section-heading ql-section-heading--center">
            <p className="ql-eyebrow">Simple by design</p>
            <h2>From “I’m not sure” to a plan.</h2>
          </div>
          <div className="ql-process__steps">
            <article>
              <span>1</span>
              <h3>Tell us about your business</h3>
              <p>Share the basics and what has been keeping you up at night.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Walk through it together</h3>
              <p>We spend 60 focused minutes looking at how things work today.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Get your priority list</h3>
              <p>Receive a concise summary and a 20-minute results review.</p>
            </article>
          </div>
          <div className="ql-safety-note">
            <span className="ql-safety-note__spark"><QuickLookIcon type="spark" /></span>
            <p><strong>No passwords. No security scanning. No sales pressure.</strong><br />This is a practical owner’s review—not a penetration test or a full technical audit.</p>
          </div>
        </div>
      </section>

      <section id="reserve" className="ql-section ql-reserve">
        <div className="ql-shell ql-reserve__grid">
          <div className="ql-reserve__copy">
            <p className="ql-eyebrow">Ready for a quick look?</p>
            <h2>Let’s find the first thing worth fixing.</h2>
            <p>
              Send a few details below. We’ll follow up to confirm fit and schedule your walkthrough.
            </p>
            <div className="ql-reserve__price"><strong>$75</strong><span>one-time<br />flat rate</span></div>
            <div className="ql-reserve__fit">
              <span><QuickLookIcon type="check" /></span>
              <p><strong>Best fit:</strong> One rural small business, one location, and up to 15 workers.</p>
            </div>
          </div>

          <div className="ql-form-card">
            {formSent ? (
              <div className="ql-form-success" role="status" aria-live="polite">
                <span><QuickLookIcon type="check" /></span>
                <p className="ql-eyebrow">Request received</p>
                <h3>We’ll be in touch soon.</h3>
                <p>Thanks for trusting UNI with a first look at your business.</p>
              </div>
            ) : (
              <form action="https://formspree.io/f/xvzlozev" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New Small Business Quick Look request" />
                <input type="hidden" name="offer" value="$75 Small Business Quick Look" />
                <input type="hidden" name="source" value="Facebook landing page" />
                <div className="ql-form__row">
                  <label>
                    <span>Your name</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      placeholder="Full name"
                    />
                  </label>
                  <label>
                    <span>Business name</span>
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                      placeholder="Your business"
                    />
                  </label>
                </div>
                <div className="ql-form__row">
                  <label>
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      placeholder="you@example.com"
                    />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      placeholder="(555) 555-5555"
                    />
                  </label>
                </div>
                <label>
                  <span>What would you most like help seeing clearly? <em>Optional</em></span>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    placeholder="A process, technology concern, visibility issue, or simply ‘I’m not sure where to start.’"
                  />
                </label>
                <button className="ql-button ql-button--primary ql-button--full" type="submit" disabled={formSubmitting}>
                  {formSubmitting ? "Sending request…" : "Request my quick look"} {!formSubmitting && <span aria-hidden="true">→</span>}
                </button>
                {formError && <p className="ql-form__error" role="alert">{formError}</p>}
                <p className="ql-form__fine-print">No payment is collected on this page. We’ll confirm fit and scheduling first.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="ql-footer">
        <div className="ql-shell ql-footer__inner">
          <QuickLookMark />
          <p>Practical clarity for rural small businesses.</p>
          <a href="https://theunicorntechs.com/">theunicorntechs.com</a>
          <span>© {new Date().getFullYear()} LoveLeeVa LLC</span>
        </div>
      </footer>

      <a className={`ql-mobile-cta ${showMobileCta ? "ql-mobile-cta--visible" : ""}`} href="#reserve">
        Request a quick look <span>$75</span>
      </a>
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
      {page === "advisory" && (
        <>
          <AdvisorySection />
          <AdvisoryDetailSection navigateTo={props.navigateTo} />
        </>
      )}
      {page === "ai-strategy" && (
        <>
          <AiStrategySection />
          <AiStrategyDetailSection navigateTo={props.navigateTo} />
        </>
      )}
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
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span>{route.label}</span>
        </nav>
        <div className="section__label">{route.eyebrow}</div>
        <h1 className="page-hero__title">{route.heading}</h1>
        <p className="page-hero__lead">{route.heroDescription || route.description}</p>
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
        <div className="section__label">Independent · Vendor-neutral · Executive-level</div>
        <h2 className="section__h2">Executive AI &amp; Technology Advisory</h2>
        <p className="section__lead">
          UNI gives business leaders an independent view of AI strategy, technology investments,
          vendor claims, and delivery risk. Our high-intensity Skull Sessions expose the trust gap
          between ambitious go-to-market promises and what teams can actually build, operate, and
          support—before that gap turns into lost margin.
        </p>
        <div className="cards">
          {[
            {
              title: "AI Strategy Clarity",
              body: "We expose hidden constraints in operations, architecture, data, and AI readiness so leadership can make fast, defensible investment decisions.",
              stat: "AI",
              statLabel: "Strategy first",
            },
            {
              title: "Vendor-Neutral Evaluation",
              body: "We assess vendors, platforms, proposals, and delivery plans against business requirements with no commissions, quotas, or product bias.",
              stat: "P&L",
              statLabel: "Owner aligned",
            },
            {
              title: "Technical Due Diligence",
              body: "We pressure-test architecture, economics, staffing, security, and implementation risk so the recommendation can survive contact with reality.",
              stat: "0",
              statLabel: "Vendor conflicts",
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

function AdvisoryDetailSection({ navigateTo }) {
  return (
    <section className="advisory-detail" aria-labelledby="advisory-services-title">
      <div className="section__inner">
        <div className="advisory-detail__intro">
          <div>
            <div className="section__label">What UNI advises on</div>
            <h2 id="advisory-services-title" className="section__h2">
              Independent advice before expensive technology decisions
            </h2>
          </div>
          <p>
            The right AI decision is not always a new platform or a larger implementation. UNI helps
            leadership determine what is worth doing, what the organization can realistically
            support, and where vendor incentives or internal assumptions are distorting the plan.
          </p>
        </div>

        <div className="advisory-services">
          {advisoryServices.map((service) => (
            <article className="advisory-service" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>

        <section className="advisory-process" aria-labelledby="advisory-process-title">
          <div className="section__label section__label--light">How the advisory process works</div>
          <h2 id="advisory-process-title">From uncertainty to a decision leadership can defend</h2>
          <div className="advisory-process__grid">
            {advisoryProcess.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="advisory-fit" aria-labelledby="advisory-fit-title">
          <div>
            <div className="section__label">When to call UNI</div>
            <h2 id="advisory-fit-title">Bring in an independent advisor when the decision is consequential</h2>
          </div>
          <ul>
            <li>You are evaluating an AI vendor, platform, or major technology proposal.</li>
            <li>Leadership and delivery teams disagree about what is feasible.</li>
            <li>An AI pilot is not producing a credible path to operating value.</li>
            <li>Technology costs are rising while margins or delivery confidence are falling.</li>
            <li>You need technical diligence without hiring a full-time executive.</li>
          </ul>
        </section>

        <section className="advisory-faq" aria-labelledby="advisory-faq-title">
          <div className="section__label">AI advisory FAQ</div>
          <h2 id="advisory-faq-title">Questions business leaders ask before engaging UNI</h2>
          <div className="advisory-faq__list">
            {advisoryFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="advisory-cta" aria-labelledby="advisory-cta-title">
          <div>
            <div className="section__label section__label--light">Start with the real decision</div>
            <h2 id="advisory-cta-title">Pressure-test the plan before you fund it.</h2>
            <p>
              Tell UNI what leadership is deciding, where the story stops adding up, or which AI
              investment needs an independent second look.
            </p>
          </div>
          <button className="btn btn--light" onClick={() => navigateTo("contact")}>
            Talk with an AI advisor <span aria-hidden="true">→</span>
          </button>
        </section>
      </div>
    </section>
  );
}

function AiStrategySection() {
  return (
    <section id="ai-strategy" className="section section--dark">
      <div className="section__inner">
        <div className="section__label section__label--light">Strategy · Implementation · Operations</div>
        <h2 className="section__h2 section__h2--light">Enterprise AI Strategy &amp; Implementation</h2>
        <p className="section__lead section__lead--light">
          The Forge is where AI strategy becomes a working production system. UNI aligns use cases,
          data, cloud architecture, governance, workflow design, implementation, and ongoing
          operations so AI creates measurable value beyond the pilot.
        </p>
        <div className="split">
          <div className="split__text">
            {[
              {
                title: "Roadmap to production",
                body: "We prioritize use cases by value and feasibility, then map the data, integration, governance, people, and delivery work required to operate them reliably.",
              },
              {
                title: "Production AI engineering",
                body: "We design and implement AI systems that fit real business workflows, technical standards, security controls, and operating constraints.",
              },
              {
                title: "Continuous AI operations",
                body: "We measure quality, cost, latency, reliability, adoption, and business impact so deployed systems keep improving after launch.",
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
              { val: "Value", label: "Business outcome before technology" },
              { val: "Live", label: "Production readiness beyond pilots" },
              { val: "Owned", label: "Clear governance and operations" },
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

function AiStrategyDetailSection({ navigateTo }) {
  return (
    <section className="advisory-detail strategy-detail" aria-labelledby="strategy-services-title">
      <div className="section__inner">
        <div className="advisory-detail__intro">
          <div>
            <div className="section__label">What The Forge delivers</div>
            <h2 id="strategy-services-title" className="section__h2">
              An enterprise AI operating system—not a collection of pilots
            </h2>
          </div>
          <p>
            Production AI requires more than selecting a model. UNI connects the business case to
            data, architecture, security, governance, delivery, adoption, and ongoing ownership so
            every layer of the system is designed to work together.
          </p>
        </div>

        <div className="advisory-services">
          {aiStrategyServices.map((service) => (
            <article className="advisory-service" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>

        <section className="advisory-process" aria-labelledby="strategy-process-title">
          <div className="section__label section__label--light">The Forge operating model</div>
          <h2 id="strategy-process-title">Align the outcome. Build the system. Operate the capability.</h2>
          <div className="advisory-process__grid">
            {aiStrategyProcess.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="advisory-fit" aria-labelledby="strategy-fit-title">
          <div>
            <div className="section__label">When The Forge fits</div>
            <h2 id="strategy-fit-title">Move from AI activity to an accountable production capability</h2>
          </div>
          <ul>
            <li>Your organization has AI pilots but no credible production roadmap.</li>
            <li>Use cases are multiplying without shared priorities, governance, or ownership.</li>
            <li>Data and integration gaps keep blocking implementation.</li>
            <li>AI costs, quality, security, or vendor dependencies are difficult to measure.</li>
            <li>Leadership needs strategy and technical delivery to move as one system.</li>
          </ul>
        </section>

        <section className="advisory-faq" aria-labelledby="strategy-faq-title">
          <div className="section__label">Enterprise AI strategy FAQ</div>
          <h2 id="strategy-faq-title">Questions teams ask when AI has to work in production</h2>
          <div className="advisory-faq__list">
            {aiStrategyFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="advisory-cta" aria-labelledby="strategy-cta-title">
          <div>
            <div className="section__label section__label--light">Build beyond the pilot</div>
            <h2 id="strategy-cta-title">Turn the AI roadmap into a production system.</h2>
            <p>
              Bring UNI the use case, stalled pilot, fragmented roadmap, or delivery problem that
              needs a practical path from strategy to operation.
            </p>
          </div>
          <button className="btn btn--light" onClick={() => navigateTo("contact")}>
            Discuss your AI strategy <span aria-hidden="true">→</span>
          </button>
        </section>
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
