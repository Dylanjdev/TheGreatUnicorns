import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import smallLogo from "./assets/small_logo.png";
import transparentLogo from "./assets/transparentlogo.png";
import logoModel from "./assets/logo.glb?url";
import logoBrightModel from "./assets/logobrigh.glb?url";
import heroBackgroundLightVideo from "./assets/14683943_3840_2160_30fps.mp4";
import heroBackgroundDarkVideo from "./assets/darkmode.mp4";

function collectMeshMaterials(root) {
  const mats = [];
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const meshMats = Array.isArray(obj.material) ? obj.material : [obj.material];
    meshMats.forEach((mat) => {
      if (!mats.includes(mat)) mats.push(mat);
    });
  });
  return mats;
}

function HeroLogoModel({ isDark }) {
  const groupRef = useRef(null);
  const blendRef = useRef(isDark ? 1 : 0);
  const { scene: lightScene } = useGLTF(logoModel);
  const { scene: darkScene } = useGLTF(logoBrightModel);

  const lightModel = useMemo(() => lightScene.clone(true), [lightScene]);
  const darkModel = useMemo(() => darkScene.clone(true), [darkScene]);

  const lightMaterials = useMemo(() => collectMeshMaterials(lightModel), [lightModel]);
  const darkMaterials = useMemo(() => collectMeshMaterials(darkModel), [darkModel]);

  const fitScale = useMemo(() => {
    const lightBox = new THREE.Box3().setFromObject(lightModel);
    const darkBox = new THREE.Box3().setFromObject(darkModel);
    const lightSize = lightBox.getSize(new THREE.Vector3());
    const darkSize = darkBox.getSize(new THREE.Vector3());
    const maxAxis = Math.max(lightSize.x, lightSize.y, lightSize.z, darkSize.x, darkSize.y, darkSize.z) || 1;
    return 2.6 / maxAxis;
  }, [lightModel, darkModel]);

  useEffect(() => {
    const allMaterials = [...lightMaterials, ...darkMaterials];
    allMaterials.forEach((mat) => {
      mat.transparent = true;
      mat.depthWrite = false;
    });

    lightMaterials.forEach((mat) => {
      if ("color" in mat && mat.color?.set) mat.color.set("#000000");
      if ("emissive" in mat && mat.emissive?.set) mat.emissive.set("#000000");
    });

    darkMaterials.forEach((mat) => {
      if ("color" in mat && mat.color?.set) mat.color.set("#ffffff");
      if ("emissive" in mat && mat.emissive?.set) mat.emissive.set("#ffffff");
    });
  }, [lightMaterials, darkMaterials]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetBlend = isDark ? 1 : 0;
    blendRef.current = THREE.MathUtils.damp(blendRef.current, targetBlend, 3.6, delta);

    const lightOpacity = 1 - blendRef.current;
    const darkOpacity = blendRef.current;

    lightMaterials.forEach((mat) => {
      mat.opacity = lightOpacity;
    });
    darkMaterials.forEach((mat) => {
      mat.opacity = darkOpacity;
    });

    groupRef.current.rotation.y = t * 1.2;
    groupRef.current.position.x = Math.cos(t * 0.8) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <group scale={fitScale}>
          <primitive object={lightModel} />
          <primitive object={darkModel} />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload(logoModel);
useGLTF.preload(logoBrightModel);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
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

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className={`app ${isDark ? "app--dark" : ""}`}>
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
          <div className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            {["advisory", "ai-strategy", "outpost", "contact"].map((id) => (
              <button key={id} className="nav__link" onClick={() => scrollTo(id)}>
                {id === "ai-strategy" ? "AI Strategy" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
          <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero__bg">
          <video
            className={`hero__video hero__video--light ${isDark ? "hero__video--hidden" : "hero__video--visible"}`}
            src={heroBackgroundLightVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <video
            className={`hero__video hero__video--dark ${isDark ? "hero__video--visible" : "hero__video--hidden"}`}
            src={heroBackgroundDarkVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__tag">LoveLeeVa LLC &nbsp;·&nbsp; dba Unbridled Nero Information</span>
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
          <Canvas className="hero__model" camera={{ position: [0, 0, 5.5], fov: 30, near: 0.1, far: 100 }} dpr={[1, 2]}>
            <ambientLight intensity={1.25} />
            <directionalLight position={[2, 3, 3]} intensity={2.4} />
            <directionalLight position={[-2, -1, -2]} intensity={0.8} />
            <Suspense fallback={null}>
              <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.2}>
                <HeroLogoModel isDark={isDark} />
              </Float>
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* MANDATE BAR */}
      <div className="mandate-bar">
        <div className="mandate-bar__inner">
          {["Fiduciary-Grade Advisory", "Vendor Independence", "AI Infrastructure Reality", "The Outpost SMDC"].map((item, i) => (
            <span key={i} className="mandate-bar__item">
              <span className="mandate-bar__dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ADVISORY */}
      <section id="advisory" className="section section--white">
        <div className="section__inner">
          <div className="section__label">Engine 01</div>
          <h2 className="section__h2">Fiduciary Advisory</h2>
          <p className="section__lead">
            Executives are surrounded by yes-men and vendors selling bloated roadmaps.
            They are bleeding margin on trends they don't understand.
            We define the bleed as the gap between what gets sold and what can be delivered on time.
          </p>
          <div className="cards">
            {[
              {
                title: "The Reality Bridge",
                body: "We audit your GTM vs. delivery alignment. We look at your pipeline, identify the trust gap, and give you the unbridled truth about why your teams are failing to execute.",
                stat: "40%",
                statLabel: "Margin floor, minimum"
              },
              {
                title: "The Fiduciary Mirror",
                body: "We don't build it for you. We diagnose the bleed and architect the framework to stop it. Retainer-based. C-suite only. No watered-down deliverables.",
                stat: "P&L",
                statLabel: "Owners only"
              },
              {
                title: "The Trust Engine",
                body: "Your consultants have commission breath. UNI has no vendor relationships to protect. We solve for the tech problem, not the vendor spiff.",
                stat: "0",
                statLabel: "Vendor affiliations"
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
          <div className="section__label section__label--light">Engine 02</div>
          <h2 className="section__h2 section__h2--light">AI Infrastructure Strategy</h2>
          <p className="section__lead section__lead--light">
            Every Fortune 500 is panic-buying AI without an infrastructure or data strategy to support it.
            They're funding $2M pilots that never reach production.
          </p>
          <div className="split">
            <div className="split__text">
              <div className="split__item">
                <div className="split__num">01</div>
                <div>
                  <h4 className="split__title">Infrastructure audit</h4>
                  <p className="split__body">We evaluate your current data center footprint, cloud architecture, and data hygiene. We tell you the truth about what it will actually take to operationalize AI.</p>
                </div>
              </div>
              <div className="split__item">
                <div className="split__num">02</div>
                <div>
                  <h4 className="split__title">Reality roadmap</h4>
                  <p className="split__body">Strategic roadmaps that bridge the gap between AI hallucinations and technical reality. We protect your margins from predatory software vendors.</p>
                </div>
              </div>
              <div className="split__item">
                <div className="split__num">03</div>
                <div>
                  <h4 className="split__title">Vendor-neutral delivery</h4>
                  <p className="split__body">No chip allegiances. No cloud spiffs. We recommend what actually solves your problem at the lowest total cost of ownership.</p>
                </div>
              </div>
            </div>
            <div className="split__metrics">
              {[
                { val: "$2M+", label: "Avg. wasted AI pilot spend we recover" },
                { val: "36mo", label: "Typical Tier 1 data center delay we bypass" },
                { val: "1.05", label: "Target PUE at The Outpost" },
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
          <div className="section__label">Engine 03 — Capital North Star</div>
          <h2 className="section__h2">The Outpost</h2>
          <p className="section__lead">
            210 acres. Off-grid. Constitutional Oaks Industrial Park, Lee County, Virginia.
            A modular edge-computing campus designed to bypass the global power shortage.
          </p>
          <div className="outpost-grid">
            <div className="outpost-card outpost-card--featured">
              <div className="outpost-card__label">The model</div>
              <h3 className="outpost-card__title">The data center RV park</h3>
              <p className="outpost-card__body">
                We provide the land, the islanded power, and the standardized liquid-cooled pads.
                You drop your modular compute skid and turn it on. No utility queue.
                No 3-year construction timeline. No monolithic CapEx trap.
              </p>
              <button className="btn btn--primary" style={{marginTop: "1.5rem"}} onClick={() => scrollTo("contact")}>
                Request investment brief
              </button>
            </div>
            {[
              { val: "210ac", label: "Constitutional Oaks", sub: "Lee County, VA" },
              { val: "$2.5M", label: "Land cost", sub: "vs $125M Tier 1" },
              { val: "9–12mo", label: "Time to first compute", sub: "vs 36–48mo monolithic" },
              { val: "100%", label: "Off-grid capable", sub: "Islanded microgrid" },
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
          <blockquote className="philosophy__quote">
            "The unicorns of this industry are not utilization revenue slaves.
            They are the architects of our future. UNI clears the airspace so they can build."
          </blockquote>
          <div className="philosophy__attr">
            <img src={smallLogo} alt="" className="philosophy__logo" />
            <span>Heather Hitchler &nbsp;·&nbsp; Founder & CEO, UNI</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--white">
        <div className="section__inner section__inner--narrow">
          <div className="section__label">Work with us</div>
          <h2 className="section__h2">Start a conversation</h2>
          <p className="section__lead">
            We engage exclusively with P&amp;L owners: CEOs, CIOs, Private Equity Operating Partners,
            and Infrastructure Investors.
          </p>
          {formSent ? (
            <div className="form-success">
              <div className="form-success__icon">✓</div>
              <h3>Message received.</h3>
              <p>We'll be in touch within 24 hours. No fluff.</p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="form__field">
                  <label className="form__label">Name</label>
                  <input className="form__input" type="text" required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Full name" />
                </div>
                <div className="form__field">
                  <label className="form__label">Company</label>
                  <input className="form__input" type="text" required
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    placeholder="Organization" />
                </div>
              </div>
              <div className="form__field">
                <label className="form__label">Email</label>
                <input className="form__input" type="email" required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="you@company.com" />
              </div>
              <div className="form__field">
                <label className="form__label">What are you trying to solve?</label>
                <textarea className="form__textarea" required rows={4}
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src={transparentLogo} alt="UNI" className="footer__logo" />
            <span className="footer__name">UNI</span>
          </div>
          <div className="footer__legal">
            <span>LoveLeeVa LLC dba UNI · Unbridled Nero Information</span>
            <span>Lee County, Virginia</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="footer__links">
            {["Advisory", "AI Strategy", "The Outpost", "Contact"].map((l, i) => (
              <button key={i} className="footer__link"
                onClick={() => scrollTo(l.toLowerCase().replace(" ", "-").replace("the ", ""))}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}