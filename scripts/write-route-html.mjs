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
import {
  vendorEvaluationFaqs,
  vendorEvaluationRubric,
  vendorEvaluationSeo,
  vendorEvaluationStructuredData,
} from "../src/vendorEvaluationContent.js";
import {
  businessProcessAutomationArticleHtml,
  businessProcessAutomationSeo,
  businessProcessAutomationStructuredData,
  businessProcessAutomationToc,
} from "../src/businessProcessAutomationContent.js";
import {
  technologyDueDiligenceArticleHtml,
  technologyDueDiligenceSeo,
  technologyDueDiligenceStructuredData,
  technologyDueDiligenceToc,
} from "../src/technologyDueDiligenceContent.js";

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
    path: "/insights/ai-vendor-evaluation-checklist/",
    title: vendorEvaluationSeo.title,
    description: vendorEvaluationSeo.description,
    keywords:
      "AI vendor evaluation checklist, AI vendor selection, AI due diligence checklist, enterprise AI procurement, AI vendor scorecard, questions to ask AI vendors",
    body: vendorEvaluationSnapshot(),
    ogType: "article",
    structuredData: vendorEvaluationStructuredData,
  },
  {
    path: "/blog/business-process-automation/",
    title: businessProcessAutomationSeo.title,
    description: businessProcessAutomationSeo.description,
    keywords:
      "business process automation, BPA guide, robotic process automation, RPA, business process management, BPM, workflow automation, automation map",
    body: businessProcessAutomationSnapshot(),
    ogType: "article",
    structuredData: businessProcessAutomationStructuredData,
  },
  {
    path: "/blog/technology-due-diligence/",
    title: technologyDueDiligenceSeo.title,
    description: technologyDueDiligenceSeo.description,
    keywords:
      "technology due diligence, technical due diligence, IT due diligence, M&A technology review, technology audit, AI due diligence, vendor due diligence",
    body: technologyDueDiligenceSnapshot(),
    image: technologyDueDiligenceSeo.ogImage,
    imageAlt: technologyDueDiligenceSeo.ogImageAlt,
    imageType: technologyDueDiligenceSeo.ogImageType,
    imageWidth: technologyDueDiligenceSeo.ogImageWidth,
    imageHeight: technologyDueDiligenceSeo.ogImageHeight,
    ogType: "article",
    structuredData: technologyDueDiligenceStructuredData,
  },
  {
    path: "/blog/",
    title: "AI & Technology Insights | UNI",
    description:
      "Practical AI buyer guides, enterprise strategy insights, and community writing from UNI on responsible technology, delivery, and rural opportunity.",
    body: blogSnapshot(),
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
            <p class="advisory-resource">Evaluating a platform now? Use UNI's <a href="/insights/ai-vendor-evaluation-checklist/">40-question AI vendor evaluation checklist</a> to organize the evidence before the next demo or proposal review.</p>
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

function vendorEvaluationSnapshot() {
  const rubric = vendorEvaluationRubric
    .map(
      (section) => `
        <section class="guide__rubric-section" id="${escapeAttribute(section.id)}">
          <div class="guide__rubric-heading">
            <span>${escapeHtml(section.number)}</span>
            <div>
              <h2>${escapeHtml(section.title)}</h2>
              <p>${escapeHtml(section.protects)}</p>
            </div>
          </div>
          <ol>${section.questions.map((question) => `<li>${escapeHtml(question)}<span class="guide__print-score" aria-hidden="true">Score: &nbsp; 0 ○ &nbsp; 1 ○ &nbsp; 2 ○ &nbsp; 3 ○</span></li>`).join("")}</ol>
          <div class="guide__evidence">
            <strong>Evidence to request</strong>
            <p>${escapeHtml(section.evidence)}</p>
          </div>
        </section>`,
    )
    .join("");

  const faqs = vendorEvaluationFaqs
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
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href="/blog/">Blog</a><span aria-hidden="true">/</span>
              <span>AI Vendor Evaluation Checklist</span>
            </nav>
            <div class="section__label">${escapeHtml(vendorEvaluationSeo.eyebrow)}</div>
            <h1 class="page-hero__title">${escapeHtml(vendorEvaluationSeo.heading)}</h1>
            <p class="page-hero__lead">${escapeHtml(vendorEvaluationSeo.heroDescription)}</p>
          </div>
        </section>
        <article class="guide">
          <div class="guide__shell">
            <header class="guide__intro">
              <div class="guide__byline">
                <span>By Heather Hitchler</span>
                <span>Founder &amp; Executive Fiduciary Architect</span>
                <time datetime="2026-09-30">Updated September 30, 2026</time>
              </div>
              <div class="guide__answer">
                <p>A defensible AI vendor evaluation starts with a defined business outcome and ends with evidence your team can verify. Score the vendor on workflow fit, data rights, use-case performance, security, integration, governance, operations, total cost, exit terms, and a representative pilot. Do not let a high total score offset a zero in a category that could stop production.</p>
              </div>
            </header>
            <div class="guide__layout">
              <div class="guide__content">
                <section class="guide__section" id="before-you-score">
                  <div class="section__label">Before the first demo</div>
                  <h2>Write the decision before vendors write the story</h2>
                  <p>Before reviewing solutions, define the workflow, users, current baseline, target, deadline, cost boundary, and risk boundary. If the sponsor cannot state those conditions plainly, the organization is still defining the problem—not comparing vendors.</p>
                  <blockquote>We will use this system to improve <strong>[workflow]</strong> for <strong>[users]</strong>, moving <strong>[baseline]</strong> to <strong>[target]</strong> by <strong>[date]</strong>, without exceeding <strong>[cost and risk boundaries]</strong>.</blockquote>
                </section>
                <section class="guide__scorecard" id="scorecard">
                  <div class="section__label section__label--light">A simple evidence scale</div>
                  <h2>Score proof, not presentation quality</h2>
                  <div class="guide__score-grid">
                    <div><strong>0</strong><span>No answer</span><p>The requirement is unmet or unknown.</p></div>
                    <div><strong>1</strong><span>Claim</span><p>The vendor has described an answer.</p></div>
                    <div><strong>2</strong><span>Documented</span><p>Relevant evidence has been provided.</p></div>
                    <div><strong>3</strong><span>Verified</span><p>Your team reproduced or validated it.</p></div>
                  </div>
                  <p class="guide__score-note">Maximum score: 120. Treat data rights, security, quality thresholds, and exit rights as hard gates when the use case requires them. This scorecard is not a compliance assessment or a substitute for legal, privacy, security, or financial review.</p>
                </section>
                <section class="guide__section">
                  <div class="section__label">The 40-question checklist</div>
                  <h2>Ten evidence gates between the demo and the contract</h2>
                  <p>Score each question from 0 to 3. Record the evidence, its owner, and any condition that must be resolved before the next gate. A confident verbal answer is still a 1.</p>
                </section>
                <div class="guide__rubric">${rubric}</div>
                <section class="guide__section guide__section--signals" id="red-flags">
                  <div class="section__label">Six stop signs</div>
                  <h2>Red flags a weighted score should not hide</h2>
                  <ul>
                    <li>The vendor will not state in writing how your data, prompts, or outputs are used.</li>
                    <li>Performance claims rely on a generic benchmark or vendor-controlled demo, not your workflow.</li>
                    <li>The proposal has no named owner for integration, evaluation, monitoring, or incident response.</li>
                    <li>Production pricing cannot be modeled under realistic and stress-case usage.</li>
                    <li>An underlying model or feature can change without notice, re-testing, or a rollback path.</li>
                    <li>Your data and operating artifacts cannot be exported in a usable form when the relationship ends.</li>
                  </ul>
                </section>
                <section class="guide__section" id="decision-gate">
                  <div class="section__label">From score to decision</div>
                  <h2>Make the pilot earn a production decision</h2>
                  <p>Use representative data, real users, required integrations, known edge cases, and expected operating volume. Agree on the decision thresholds before work begins.</p>
                  <div class="guide__decision-grid">
                    <div><strong>96–120</strong><span>Pilot candidate</span><p>Evidence is strong enough to test under controlled conditions, subject to every hard gate.</p></div>
                    <div><strong>72–95</strong><span>Proceed with conditions</span><p>Name the open evidence, owner, deadline, and consequence before pilot approval.</p></div>
                    <div><strong>Below 72</strong><span>Not ready</span><p>Resolve material gaps or evaluate another path before adding implementation cost.</p></div>
                  </div>
                  <p>The ranges are a working heuristic, not a validated risk model. Adjust weights and thresholds to the use case, industry, applicable obligations, and risk tolerance.</p>
                </section>
                <section class="guide__section guide__section--source">
                  <div class="section__label">Framework alignment</div>
                  <h2>Use established risk language without turning the review into theater</h2>
                  <p>This checklist is informed by the NIST AI Risk Management Framework's Govern, Map, Measure, and Manage functions. Use the framework to deepen the review, then translate it into evidence, owners, and decisions that fit the specific system.</p>
                  <div class="guide__source-links"><a href="https://airc.nist.gov/airmf-resources/airmf/">NIST AI Risk Management Framework ↗</a><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence">NIST Generative AI Profile ↗</a></div>
                </section>
                <section class="advisory-faq guide__faq" id="vendor-evaluation-faq">
                  <div class="section__label">AI vendor evaluation FAQ</div>
                  <h2>Questions buyers ask before the contract</h2>
                  <div class="advisory-faq__list">${faqs}</div>
                </section>
                <section class="advisory-cta guide__cta">
                  <div><div class="section__label section__label--light">An independent second look</div><h2>Pressure-test the AI decision before you fund it.</h2><p>UNI evaluates the proposal, evidence, architecture, economics, delivery plan, and exit risk without software commissions or a quota tied to the answer.</p></div>
                  <a class="btn btn--light" href="/contact/">Talk with an AI advisor <span aria-hidden="true">→</span></a>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>`;
}

function blogSnapshot() {
  return `
    <div class="app seo-static-snapshot">
      <main id="main-content" class="page-main">
        <section class="page-hero">
          <div class="page-hero__content">
            <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Blog</span></nav>
            <div class="section__label">Insights &amp; community</div>
            <h1 class="page-hero__title">We Grow Our Own</h1>
            <p class="page-hero__lead">Practical AI guidance, responsible technology, rural opportunity, and ideas for moving knowledge into measurable impact.</p>
          </div>
        </section>
        <section class="section section--blog">
          <div class="section__inner blog__inner">
            <div class="blog__intro">
              <div class="section__label">Featured guide</div>
              <h2 class="section__h2">Make the decision defensible</h2>
              <p class="section__lead">Useful frameworks for leaders making consequential AI and technology decisions.</p>
            </div>
            <div class="blog__posts">
              <a class="insight-feature" href="/blog/technology-due-diligence/">
                <span class="blog-post__meta"><span>Executive guide</span><span>November 2026</span></span>
                <span class="blog-post__title">Technology Due Diligence: What It Covers and How to Use It</span>
                <span class="blog-post__overview">Test the technology behind a deal, investment, or major platform commitment—and turn technical findings into decisions on price, terms, risk, and integration.</span>
                <span class="blog-post__toggle">Read the guide</span>
              </a>
              <a class="insight-feature" href="/blog/business-process-automation/">
                <span class="blog-post__meta"><span>Practical guide</span><span>November 2026</span></span>
                <span class="blog-post__title">Business Process Automation: A Practical Guide for Leaders</span>
                <span class="blog-post__overview">Choose the right process, map the real work, test the economics, and pilot automation without betting the business.</span>
                <span class="blog-post__toggle">Read the guide</span>
              </a>
              <a class="insight-feature" href="/insights/ai-vendor-evaluation-checklist/">
                <span class="blog-post__meta"><span>Practical guide</span><span>September 2026</span></span>
                <span class="blog-post__title">AI Vendor Evaluation Checklist: 40 Questions Before You Buy</span>
                <span class="blog-post__overview">Pressure-test business value, data rights, security, quality, integration, cost, operations, and exit risk before an AI proposal becomes an expensive dependency.</span>
                <span class="blog-post__toggle">Use the checklist</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>`;
}

function businessProcessAutomationSnapshot() {
  const toc = businessProcessAutomationToc
    .map(([id, label]) => `<li><a href="#${escapeAttribute(id)}">${escapeHtml(label)}</a></li>`)
    .join("");

  return `
    <div class="app seo-static-snapshot">
      <main id="main-content" class="page-main">
        <section class="page-hero">
          <div class="page-hero__content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href="/blog/">Blog</a><span aria-hidden="true">/</span>
              <span>Business Process Automation</span>
            </nav>
            <div class="section__label">${escapeHtml(businessProcessAutomationSeo.eyebrow)}</div>
            <h1 class="page-hero__title">${escapeHtml(businessProcessAutomationSeo.heading)}</h1>
            <p class="page-hero__lead">${escapeHtml(businessProcessAutomationSeo.heroDescription)}</p>
          </div>
        </section>
        <article class="guide business-article">
          <div class="guide__shell">
            <header class="guide__intro">
              <div class="guide__byline">
                <span>By Heather Hitchler</span><span>UNI</span>
                <time datetime="2026-11-04">November 4, 2026</time>
              </div>
              <div class="guide__answer">
                <p>Business process automation uses software to run repeatable, multi-step work with little manual effort. It pays off when the process is stable, frequent, measurable, and well understood—and fails when you automate a mess or ignore lifetime cost.</p>
              </div>
            </header>
            <div class="guide__layout">
              <aside class="guide__toc" aria-label="On this page"><p>On this page</p><ol>${toc}</ol></aside>
              <div class="guide__content business-article__content">${businessProcessAutomationArticleHtml}</div>
            </div>
          </div>
        </article>
      </main>
    </div>`;
}

function technologyDueDiligenceSnapshot() {
  const toc = technologyDueDiligenceToc
    .map(([id, label]) => `<li><a href="#${escapeAttribute(id)}">${escapeHtml(label)}</a></li>`)
    .join("");

  return `
    <div class="app seo-static-snapshot">
      <main id="main-content" class="page-main">
        <section class="page-hero">
          <div class="page-hero__content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href="/blog/">Blog</a><span aria-hidden="true">/</span>
              <span>Technology Due Diligence</span>
            </nav>
            <div class="section__label">${escapeHtml(technologyDueDiligenceSeo.eyebrow)}</div>
            <h1 class="page-hero__title">${escapeHtml(technologyDueDiligenceSeo.heading)}</h1>
            <p class="page-hero__lead">${escapeHtml(technologyDueDiligenceSeo.heroDescription)}</p>
          </div>
        </section>
        <article class="guide business-article">
          <div class="guide__shell">
            <header class="guide__intro">
              <div class="guide__byline">
                <span>By Heather Hitchler</span><span>UNI</span>
                <time datetime="2026-11-06">November 6, 2026</time>
              </div>
              <div class="guide__answer">
                <p>Technology due diligence independently tests the software, systems, infrastructure, security, vendors, and technical team behind a deal or major investment—so leaders can see what the technology really is, what it will cost to operate, and what could break the business case.</p>
              </div>
            </header>
            <div class="guide__layout">
              <aside class="guide__toc" aria-label="On this page"><p>On this page</p><ol>${toc}</ol></aside>
              <div class="guide__content business-article__content">${technologyDueDiligenceArticleHtml}</div>
            </div>
          </div>
        </article>
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
  const socialImageType = route.imageType || "image/png";
  const socialImageWidth = route.imageWidth || "1200";
  const socialImageHeight = route.imageHeight || "630";
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
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="${route.ogType || "website"}" />`,
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
      /<meta property="og:image:type" content="[^"]*" \/>/,
      `<meta property="og:image:type" content="${socialImageType}" />`,
    )
    .replace(
      /<meta property="og:image:width" content="[^"]*" \/>/,
      `<meta property="og:image:width" content="${socialImageWidth}" />`,
    )
    .replace(
      /<meta property="og:image:height" content="[^"]*" \/>/,
      `<meta property="og:image:height" content="${socialImageHeight}" />`,
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
