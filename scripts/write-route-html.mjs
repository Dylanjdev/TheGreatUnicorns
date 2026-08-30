import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  advisoryFaqs,
  advisoryProcess,
  advisorySeo,
  advisoryServices,
  advisoryStructuredData,
} from "../src/advisoryContent.js";
import {
  aiStrategyFaqs,
  aiStrategyProcess,
  aiStrategySeo,
  aiStrategyServices,
  aiStrategyStructuredData,
} from "../src/aiStrategyContent.js";

const siteUrl = "https://theunicorntechs.com";

const routes = [
  {
    path: "/advisory/",
    title: advisorySeo.title,
    description: advisorySeo.description,
    keywords:
      "vendor-neutral AI advisory, executive AI advisory, AI strategy consulting, technology advisory, AI vendor evaluation, technology due diligence, Virginia AI consultant",
    body: advisorySnapshot(),
    structuredData: advisoryStructuredData,
  },
  {
    path: "/ai-strategy/",
    title: aiStrategySeo.title,
    description: aiStrategySeo.description,
    keywords:
      "enterprise AI strategy, AI implementation consulting, production AI, AI governance consulting, AI operations, AI roadmap, Virginia AI consultant",
    body: aiStrategySnapshot(),
    structuredData: aiStrategyStructuredData,
  },
  {
    path: "/blog/",
    title: "Blog | UNI",
    description:
      "A UNI community letter about responsible AI, rural opportunity, and growing local technical talent in Lee County.",
  },
  {
    path: "/contact/",
    title: "Contact | UNI",
    description:
      "Start a conversation with UNI about vendor-neutral AI advisory, margin bleed, enterprise implementation, or practical technology strategy.",
  },
  {
    path: "/quick-look/",
    title: "$75 Small Business Quick Look | UNI",
    description:
      "A practical outside look at what is fragile, what is slowing you down, what customers cannot see, and what to fix first—for rural small businesses.",
    image: "/quick-look-og.png",
    imageAlt: "$75 Small Business Quick Look from UNI—clear next steps for rural small businesses.",
  },
];

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function advisorySnapshot() {
  const services = advisoryServices
    .map(
      (service) => `
        <article class="advisory-service">
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.body)}</p>
        </article>`,
    )
    .join("");

  const process = advisoryProcess
    .map(
      (step) => `
        <article>
          <span>${escapeHtml(step.number)}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.body)}</p>
        </article>`,
    )
    .join("");

  const faqs = advisoryFaqs
    .map(
      (item) => `
        <details>
          <summary>${escapeHtml(item.question)}</summary>
          <p>${escapeHtml(item.answer)}</p>
        </details>`,
    )
    .join("");

  return `
    <div class="app seo-static-snapshot">
      <main id="main-content" class="page-main">
        <section class="page-hero">
          <div class="page-hero__content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span>Advisory</span>
            </nav>
            <div class="section__label">${escapeHtml(advisorySeo.eyebrow)}</div>
            <h1 class="page-hero__title">${escapeHtml(advisorySeo.heading)}</h1>
            <p class="page-hero__lead">${escapeHtml(advisorySeo.heroDescription)}</p>
          </div>
        </section>
        <section id="advisory" class="section section--white">
          <div class="section__inner">
            <div class="section__label">Independent · Vendor-neutral · Executive-level</div>
            <h2 class="section__h2">Executive AI &amp; Technology Advisory</h2>
            <p class="section__lead">UNI gives business leaders an independent view of AI strategy, technology investments, vendor claims, and delivery risk. We expose the trust gap between ambitious go-to-market promises and what teams can actually build, operate, and support—before that gap turns into lost margin.</p>
          </div>
        </section>
        <section class="advisory-detail" aria-labelledby="advisory-services-title">
          <div class="section__inner">
            <div class="advisory-detail__intro">
              <div>
                <div class="section__label">What UNI advises on</div>
                <h2 id="advisory-services-title" class="section__h2">Independent advice before expensive technology decisions</h2>
              </div>
              <p>The right AI decision is not always a new platform or a larger implementation. UNI helps leadership determine what is worth doing, what the organization can realistically support, and where vendor incentives or internal assumptions are distorting the plan.</p>
            </div>
            <div class="advisory-services">${services}</div>
            <section class="advisory-process" aria-labelledby="advisory-process-title">
              <div class="section__label section__label--light">How the advisory process works</div>
              <h2 id="advisory-process-title">From uncertainty to a decision leadership can defend</h2>
              <div class="advisory-process__grid">${process}</div>
            </section>
            <section class="advisory-fit" aria-labelledby="advisory-fit-title">
              <div>
                <div class="section__label">When to call UNI</div>
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
            <section class="advisory-faq" aria-labelledby="advisory-faq-title">
              <div class="section__label">AI advisory FAQ</div>
              <h2 id="advisory-faq-title">Questions business leaders ask before engaging UNI</h2>
              <div class="advisory-faq__list">${faqs}</div>
            </section>
            <section class="advisory-cta" aria-labelledby="advisory-cta-title">
              <div>
                <div class="section__label section__label--light">Start with the real decision</div>
                <h2 id="advisory-cta-title">Pressure-test the plan before you fund it.</h2>
                <p>Tell UNI what leadership is deciding, where the story stops adding up, or which AI investment needs an independent second look.</p>
              </div>
              <a class="btn btn--light" href="/contact/">Talk with an AI advisor <span aria-hidden="true">→</span></a>
            </section>
          </div>
        </section>
      </main>
    </div>`;
}

function aiStrategySnapshot() {
  const services = aiStrategyServices
    .map(
      (service) => `
        <article class="advisory-service">
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.body)}</p>
        </article>`,
    )
    .join("");

  const process = aiStrategyProcess
    .map(
      (step) => `
        <article>
          <span>${escapeHtml(step.number)}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.body)}</p>
        </article>`,
    )
    .join("");

  const faqs = aiStrategyFaqs
    .map(
      (item) => `
        <details>
          <summary>${escapeHtml(item.question)}</summary>
          <p>${escapeHtml(item.answer)}</p>
        </details>`,
    )
    .join("");

  return `
    <div class="app seo-static-snapshot">
      <main id="main-content" class="page-main">
        <section class="page-hero">
          <div class="page-hero__content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span>AI Strategy</span>
            </nav>
            <div class="section__label">${escapeHtml(aiStrategySeo.eyebrow)}</div>
            <h1 class="page-hero__title">${escapeHtml(aiStrategySeo.heading)}</h1>
            <p class="page-hero__lead">${escapeHtml(aiStrategySeo.heroDescription)}</p>
          </div>
        </section>
        <section id="ai-strategy" class="section section--dark">
          <div class="section__inner">
            <div class="section__label section__label--light">Strategy · Implementation · Operations</div>
            <h2 class="section__h2 section__h2--light">Enterprise AI Strategy &amp; Implementation</h2>
            <p class="section__lead section__lead--light">The Forge is where AI strategy becomes a working production system. UNI aligns use cases, data, cloud architecture, governance, workflow design, implementation, and ongoing operations so AI creates measurable value beyond the pilot.</p>
          </div>
        </section>
        <section class="advisory-detail strategy-detail" aria-labelledby="strategy-services-title">
          <div class="section__inner">
            <div class="advisory-detail__intro">
              <div>
                <div class="section__label">What The Forge delivers</div>
                <h2 id="strategy-services-title" class="section__h2">An enterprise AI operating system—not a collection of pilots</h2>
              </div>
              <p>Production AI requires more than selecting a model. UNI connects the business case to data, architecture, security, governance, delivery, adoption, and ongoing ownership so every layer of the system is designed to work together.</p>
            </div>
            <div class="advisory-services">${services}</div>
            <section class="advisory-process" aria-labelledby="strategy-process-title">
              <div class="section__label section__label--light">The Forge operating model</div>
              <h2 id="strategy-process-title">Align the outcome. Build the system. Operate the capability.</h2>
              <div class="advisory-process__grid">${process}</div>
            </section>
            <section class="advisory-fit" aria-labelledby="strategy-fit-title">
              <div>
                <div class="section__label">When The Forge fits</div>
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
            <section class="advisory-faq" aria-labelledby="strategy-faq-title">
              <div class="section__label">Enterprise AI strategy FAQ</div>
              <h2 id="strategy-faq-title">Questions teams ask when AI has to work in production</h2>
              <div class="advisory-faq__list">${faqs}</div>
            </section>
            <section class="advisory-cta" aria-labelledby="strategy-cta-title">
              <div>
                <div class="section__label section__label--light">Build beyond the pilot</div>
                <h2 id="strategy-cta-title">Turn the AI roadmap into a production system.</h2>
                <p>Bring UNI the use case, stalled pilot, fragmented roadmap, or delivery problem that needs a practical path from strategy to operation.</p>
              </div>
              <a class="btn btn--light" href="/contact/">Discuss your AI strategy <span aria-hidden="true">→</span></a>
            </section>
          </div>
        </section>
      </main>
    </div>`;
}

function routeHtml(template, route) {
  const canonicalUrl = `${siteUrl}${route.path}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);
  const socialImage = `${siteUrl}${route.image || "/OgImage.png"}`;
  const socialImageAlt = escapeAttribute(
    route.imageAlt || "UNI — Stop the Bleed. Vendor-neutral AI & IT consulting.",
  );
  const structuredData = route.structuredData
    ? `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(route.structuredData).replace(/</g, "\\u003c")}</script>`
    : "";

  return template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta name="keywords" content="[^"]*" \/>/,
      `<meta name="keywords" content="${escapeAttribute(route.keywords || "UNI, Unbridled Neuro Information, AI advisory, enterprise AI strategy, technology consulting")}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${socialImage}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${socialImage}" />`,
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*" \/>/,
      `<meta property="og:image:alt" content="${socialImageAlt}" />`,
    )
    .replace(
      /<meta name="twitter:image:alt" content="[^"]*" \/>/,
      `<meta name="twitter:image:alt" content="${socialImageAlt}" />`,
    )
    .replace("</head>", `${structuredData}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${route.body || ""}</div>`);
}

const distDir = path.resolve("dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route.path);
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, "index.html"), routeHtml(template, route));
  }),
);
