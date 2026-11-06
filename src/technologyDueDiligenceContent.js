export const technologyDueDiligenceSeo = {
  title: "Technology Due Diligence: What It Covers & How to Use It | UNI",
  description:
    "Learn what technology due diligence covers, how a review works, which technical and AI red flags matter, and how findings should change a deal or investment.",
  eyebrow: "Executive guide · 16 minute read",
  heading: "Technology Due Diligence: What It Covers and How to Use It",
  heroDescription:
    "An independent review of the software, systems, infrastructure, security, vendors, and technical team behind a deal or major investment.",
  ogImage: "/blog/technology-due-diligence/DueDiliagenceHero.webp",
  ogImageAlt: "Technology Due Diligence: What It Covers and How to Use It",
  ogImageType: "image/webp",
  ogImageWidth: "1260",
  ogImageHeight: "720",
};

export const technologyDueDiligenceToc = [
  ["what-technology-due-diligence-is", "What technology due diligence is"],
  ["when-business-leaders-use-it", "When leaders use it"],
  ["what-a-review-examines", "What a review examines"],
  ["how-the-reviews-relate", "How reviews and audits relate"],
  ["the-stages-of-a-review", "The stages of a review"],
  ["red-flags-a-review-can-uncover", "Red flags to uncover"],
  ["turning-findings-into-decisions", "Turn findings into decisions"],
  ["how-to-choose-the-scope-and-the-reviewer", "Choose scope and reviewer"],
  ["perspective", "Perspective"],
  ["get-an-independent-view", "Get an independent view"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
];

export const technologyDueDiligenceArticleHtml = `
  <figure class="business-article__figure business-article__figure--lead">
    <img src="/blog/technology-due-diligence/DueDiliagenceHero.webp" alt="Technology Due Diligence: What It Covers and How to Use It" />
  </figure>

  <section class="business-article__section business-article__tldr" aria-labelledby="technology-diligence-tldr-title">
    <div class="section__label">The short version</div>
    <h2 id="technology-diligence-tldr-title">TL;DR</h2>
    <ul>
      <li>Technology due diligence tests the claims behind a deal or investment against what the systems, code, vendors, and people can actually deliver.</li>
      <li>It is most often tied to M&amp;A, funding rounds, and partnerships, but the same method works for a large vendor purchase or an internal technology review.</li>
      <li>A typical review runs in four stages: data collection, stakeholder interviews, risk analysis and recommendations, and a reported result you review with the reviewer.</li>
      <li>The value is in the output: findings should change the price, the contract terms, the integration plan, or the decision to go ahead.</li>
      <li>Scope it to the decision. A few critical systems call for a focused review, not a full audit of everything.</li>
    </ul>
  </section>

  <section class="business-article__section" id="what-technology-due-diligence-is">
    <h2>What technology due diligence is</h2>
    <p>At its core, it is an in-depth analysis of a company's products, technical infrastructure and architecture, product roadmap, services, practices, and IT staff. <a href="https://snyk.io/articles/what-is-technical-due-diligence-tdd/" target="_blank" rel="noreferrer">Snyk describes it</a> as something usually carried out before mergers, acquisitions, or IPOs, typically started by investors, though a company may commission one itself before seeking funds.</p>
    <p>You will see it called IT due diligence, technical due diligence, or tech due diligence. The labels overlap heavily. What matters is the question underneath: can this technology support the plan we are paying for, without cost, risk, or delay we have not priced in?</p>
    <p>A seller's presentation describes the technology as intended. A diligence review looks at it as it runs. <a href="https://www.catio.tech/blog/technology-due-diligence" target="_blank" rel="noreferrer">Catio's buyer guide</a> frames this as assessing software, architecture, infrastructure, security, engineering, intellectual property, and production reality against the assumptions built into a deal. That gap between assumption and reality is where most surprises live.</p>
  </section>

  <section class="business-article__section" id="when-business-leaders-use-it">
    <h2>When business leaders use it</h2>
    <p>The obvious trigger is an acquisition. But the same guide points to growth investments and strategic partnerships, and notes that fresh reviews may also be warranted by deep-API partnerships, large vendor consolidations, and follow-on investments.</p>
    <p>In practice, leaders reach for it in situations like these:</p>
    <ul>
      <li><strong>Buying or merging with a company.</strong> You need to know what you are inheriting and what it costs to integrate.</li>
      <li><strong>Investing in a company.</strong> You want the technology claims in the pitch checked before the term sheet hardens.</li>
      <li><strong>Preparing to sell or raise funds.</strong> A review on your own side finds problems while you can still fix them, instead of while a buyer negotiates the price down.</li>
      <li><strong>Signing a major technology commitment.</strong> A multi-year platform contract, a vendor consolidation, or a deep integration with a partner is a transaction in everything but name.</li>
      <li><strong>Funding an AI initiative.</strong> Pilots are easy to demo and hard to run in production. A review before scale-up asks what the pilot hides.</li>
    </ul>
    <p>Small and midsize organizations often assume this is only for large deals. It is not. The scale of the review should match the scale of the decision, and a modest, tightly scoped look can still prevent an expensive mistake.</p>
  </section>

  <section class="business-article__section" id="what-a-review-examines">
    <h2>What a review examines</h2>
    <p>A review covers five broad areas. The exact weighting depends on the decision.</p>
    <h3>Software and architecture</h3>
    <p>Reviewers look at how the product is built, how well the code is maintained, how much of it is outdated or undocumented, and whether the architecture can handle growth. They compare what the roadmap promises with what the current design can support.</p>
    <h3>Infrastructure and operations</h3>
    <p>This covers hosting, deployment, monitoring, incident history, backup, and recovery. A system that works on a good day but has no tested recovery path is a liability, whatever the demo shows.</p>
    <h3>Security and data</h3>
    <p>Cybersecurity practices, data privacy handling, and access controls all belong here. In a transaction, weaknesses become the buyer's problem on the day the deal closes.</p>
    <h3>People and process</h3>
    <p>A review assesses team skills and capabilities, how work is planned and released, and how dependent the system is on one or two individuals. Key-person risk is among the most common findings and among the cheapest to see early.</p>
    <h3>Vendors, licenses, and intellectual property</h3>
    <p>What the company owns, what it licenses, and what happens when a vendor relationship ends. Contract terms, license compliance, and assignment clauses affect what you can actually take over.</p>
  </section>

  <section class="business-article__section" id="how-the-reviews-relate">
    <h2>Business systems review, technology audit, and due diligence: how they relate</h2>
    <p>People searching for a business systems review, an enterprise technology assessment, or a business technology audit are often asking the same underlying question from a different angle. The distinctions are mostly about purpose.</p>
    <p>An academic overview from <a href="https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1585&amp;context=misqe" target="_blank" rel="noreferrer">MISQE on information systems due diligence</a> explains that such an exercise may assess the overall state of a business and its ICT infrastructure, or focus on business systems. A focused evaluation examines systems development and maintenance, cybersecurity, supporting ICT architecture, team skills and capabilities, code, and remediation costs. The authors' view is that the right scope depends on the decision: a broad evaluation can review the entire ICT environment, while a focused one is more economical when a few systems are critical to business continuity.</p>
    <p>Here is a simple way to tell them apart:</p>
    <div class="business-article__table-wrap" role="region" aria-label="Comparison of technology reviews and audits" tabindex="0">
      <table>
        <thead><tr><th scope="col">Review type</th><th scope="col">Main question</th><th scope="col">Typical trigger</th></tr></thead>
        <tbody>
          <tr><th scope="row">Technology due diligence</th><td>Does the technology support the deal, and what will it cost?</td><td>Acquisition, investment, partnership, sale preparation</td></tr>
          <tr><th scope="row">Business systems or enterprise technology review</th><td>Are our core systems fit for how we operate?</td><td>Growth, a failing system, a planned replacement</td></tr>
          <tr><th scope="row">Business technology audit</th><td>Are controls and processes working as designed?</td><td>Compliance, governance, repeated incidents</td></tr>
          <tr><th scope="row">Operational performance review</th><td>Where does technology slow the business down?</td><td>Rising costs, missed targets, process friction</td></tr>
        </tbody>
      </table>
    </div>
    <p>The categories blur, and a good review borrows from all of them. What should not blur is the link to a decision.</p>
    <h3>How an audit connects technology to performance</h3>
    <p>The Institute of Internal Auditors' guidance on <a href="https://www.theiia.org/globalassets/documents/content/articles/guidance/gtag/gtag-auditing-business-applications/auditing-business-applications_update.pdf" target="_blank" rel="noreferrer">auditing business applications</a> describes comparing business requirements with application design and user-acceptance testing results, and checking whether management analyzes the root causes of performance issues. It also asks whether frequent or high-impact events lead to configuration or code changes. That is an operational lens: it asks whether the system does what the business needs, not only whether it is secure.</p>
    <p>On the governance side, the IIA's guide to <a href="https://www.theiia.org/globalassets/documents/content/articles/guidance/practice-guides/gtag-auditing-it-governance/gtag-17-auditing-it-governance.pdf" target="_blank" rel="noreferrer">auditing IT governance</a> says effective governance requires meaningful performance metrics, reporting, root-cause analysis, benchmarking, and resource management. Those are the measures that let a review tie technology weaknesses to productivity and financial outcomes instead of producing a list of control gaps.</p>
  </section>

  <section class="business-article__section" id="the-stages-of-a-review">
    <h2>The stages of a review</h2>
    <p>The MISQE paper describes four stages:</p>
    <ol>
      <li><strong>Data collection.</strong> The reviewer gathers documents, access, and metrics.</li>
      <li><strong>Review through stakeholder interviews.</strong> Engineers, product owners, and managers explain how things really work.</li>
      <li><strong>Risk analysis and recommendations.</strong> Findings are ranked by impact and likelihood, with remediation options.</li>
      <li><strong>Reporting and client review.</strong> The report is delivered and walked through with the client.</li>
    </ol>
    <h3>Timing in a transaction</h3>
    <p>Catio's guide identifies three practical windows in a deal. First, a lightweight review before a letter of intent, based on public signals. Second, confirmatory diligence after the letter of intent, with data-room and interview access. Third, post-close validation that turns findings into an integration backlog. Treat these as one iterative process: early screening forms hypotheses, confirmatory work tests them with evidence, and post-close work resolves what could not be verified before closing.</p>
    <figure class="business-article__figure">
      <img src="/blog/technology-due-diligence/TransactionWindow.webp" alt="Three transaction diligence windows: pre-LOI screening, confirmatory review, and post-close validation" loading="lazy" />
    </figure>
    <h3>What to prepare</h3>
    <p>Whether you are the buyer or the company under review, collecting the following early shortens the process. The MISQE paper lists the kinds of material reviewers ask for:</p>
    <ul>
      <li>Roadmaps, backlogs, and release plans</li>
      <li>Requirements evidence</li>
      <li>Architecture diagrams and technical designs</li>
      <li>Vendor arrangements</li>
      <li>Cybersecurity and data-privacy information</li>
      <li>Quality metrics, defect lists, problem statistics, and test reports</li>
      <li>Team and skills profiles</li>
    </ul>
    <p>A practical tip: add a one-page list of known problems you already carry. Reviewers will find them anyway, and a candid list builds credibility.</p>
  </section>

  <section class="business-article__section" id="red-flags-a-review-can-uncover">
    <h2>Red flags a review can uncover</h2>
    <p>The patterns below are the ones experienced reviewers tend to look for. They are general patterns, not a checklist for any specific company.</p>
    <p><strong>Software.</strong> Heavy reliance on outdated components, little documentation, no automated testing, or code that only one person understands. A demo that works while production incidents pile up is a warning on its own.</p>
    <p><strong>Cybersecurity.</strong> No clear ownership of security, unpatched systems, weak access control, or data handled without a clear privacy basis. Inherited exposure becomes yours at closing.</p>
    <p><strong>Scalability.</strong> An architecture that performs at today's volume but would need a rebuild at the volume your plan assumes. Ask what the cost per customer or per transaction looks like as usage grows.</p>
    <p><strong>Vendors.</strong> Lock-in, contracts that do not transfer on a change of control, and critical dependencies on a single supplier with no exit plan. Vendor exits and unit costs are among the evidence points in <a href="https://digitaldefynd.com/IQ/cto-technology-audit/" target="_blank" rel="noreferrer">DigitalDefynd's technology audit framework</a>, which frames the executive question as whether technology can support strategy without unacceptable risk, cost, or execution drag.</p>
    <p><strong>People.</strong> High turnover in key roles, thin teams supporting large systems, or knowledge concentrated in a few individuals.</p>
    <h3>Red flags specific to AI implementations</h3>
    <p>AI adds failure modes that traditional reviews can miss, and this is where polished vendor claims often drift furthest from operations.</p>
    <ul>
      <li><strong>Pilot-to-production gap.</strong> A model that performs in a controlled test but depends on manual cleanup, hand-picked data, or constant tuning to keep working.</li>
      <li><strong>Unclear economics.</strong> Usage-based costs—inference, API calls, and data processing—that look small in a pilot and erode margins at scale. We call this margin risk, and it deserves its own line in the analysis.</li>
      <li><strong>Data dependence.</strong> Unclear ownership or quality of training and input data, and no plan for what happens when data drifts.</li>
      <li><strong>Hidden operating load.</strong> Monitoring, retraining, human review, and support that the sales proposal never counted.</li>
      <li><strong>Third-party model dependence.</strong> Core functionality resting on a provider whose pricing, terms, or availability can change.</li>
      <li><strong>Weak controls.</strong> No documented controls over AI and data use, which matters more as regulators and customers ask harder questions.</li>
    </ul>
    <p>If you are evaluating an AI vendor specifically, our <a href="/insights/ai-vendor-evaluation-checklist/">AI vendor evaluation checklist</a> lists 40 questions to put to them before you sign.</p>
  </section>

  <section class="business-article__section" id="turning-findings-into-decisions">
    <h2>Turning findings into decisions</h2>
    <p>A report that only catalogs weaknesses has failed. The point is to change what you do.</p>
    <h3>Put a number on it</h3>
    <p><a href="https://mnatools.com/playbooks/it-due-diligence" target="_blank" rel="noreferrer">M&amp;A Tools' playbook</a> says diligence should provide both the stand-alone operating cost and the one-off integration cost. That includes separation, migration, replacement, license changes, transition services, urgent remediation, recurring changes, and synergies, each with its assumptions and confidence level. A finding without a cost range is hard to negotiate with.</p>
    <h3>Route each finding to a lever</h3>
    <p>The same playbook says findings commonly flow into price, purchase-agreement protections, pre-closing undertakings, day-one requirements, transition-service needs, or the integration plan. Counsel may use the evidence on systems, license compliance, data protection, assignment clauses, and change-of-control terms. In a non-deal setting, the levers are contract terms, budget, sequencing, and vendor choice.</p>
    <h3>Decide, don't just list</h3>
    <p>DigitalDefynd's model emphasizes translating technical evidence into leadership decisions: modernize, retire, remediate, accept, renegotiate, fund resilience, or investigate further. A useful sorting exercise is to give every finding one of those labels, an owner, and a date. Anything labeled “accept” should be a conscious choice, written down.</p>
    <h3>Keep it going after close</h3>
    <p>Post-close validation matters because some questions cannot be answered before you have access. Convert open items into a backlog with owners, and re-check the assumptions that justified the price.</p>
  </section>

  <section class="business-article__section" id="how-to-choose-the-scope-and-the-reviewer">
    <h2>How to choose the scope and the reviewer</h2>
    <p><strong>Match scope to the decision.</strong> If three systems keep the business running, review those three in depth rather than skimming everything. If you are buying a company, go broader.</p>
    <p><strong>Insist on independence.</strong> The reviewer should have no stake in which vendor, platform, or deal wins. Commissions and referral arrangements bend conclusions, often invisibly.</p>
    <p><strong>Ask for a report you can act on.</strong> It should rank risks, estimate cost ranges, state its confidence, and say what could not be verified.</p>
    <p><strong>Plan access.</strong> Reviews stall when engineers are unavailable or documents are scattered. Name an internal contact and set interview times in advance.</p>
    <p><strong>Budget for the follow-up.</strong> Findings are only valuable if someone has authority and money to act on them.</p>
  </section>

  <section class="business-article__section business-article__perspective" id="perspective">
    <div class="section__label">From UNI</div>
    <h2>Perspective</h2>
    <blockquote>
      <p>We built our work around one observation: the gap between what was promised and what runs in production is where most technology money is lost. Traditional due diligence is good at checking code and contracts. It is less often asked to test the sales story itself.</p>
      <p>In AI especially, we see the same pattern. A pilot succeeds, the vendor's deck promises scale, and nobody has priced the operating load, the data work, or the usage costs that arrive later. Our view is that a review should put those hidden constraints on the table before the signature, not after the first invoice.</p>
      <p>That is why we stay vendor-neutral and commission-free. If we earned from the platform you chose, our advice would be worth less to you. Our job is to align the technology decision to measurable business outcomes, protect your margins, and tell you plainly what is ready for production and what is not.</p>
      <p>We also care about who gets left out of these decisions. Smaller and rural organizations rarely have an in-house technical expert to question a vendor, and they pay for it later. Independent, practical advice should not be a privilege of large enterprises.</p>
      <footer>— Heather Hitchler</footer>
    </blockquote>
  </section>

  <section class="business-article__section" id="get-an-independent-view">
    <h2>Get an independent view of your own situation</h2>
    <p>If you are weighing an acquisition, an AI purchase, or a platform commitment, we can review the technology and the vendor claims behind it, without any commission riding on the outcome. Our <a href="/advisory/">Executive AI &amp; Technology Advisory</a> covers vendor-neutral evaluation, technical due diligence, AI economics and margin-risk review, and implementation oversight.</p>
    <p>If you want a fast first opinion before committing to anything larger, the <a href="/quick-look/">Quick Look</a> is a one-off $75 review. For work that continues into build and operations, see our <a href="/ai-strategy/">enterprise AI strategy and implementation</a> services.</p>
  </section>

  <section class="business-article__section business-article__faq" id="faq">
    <div class="section__label">Technology due diligence FAQ</div>
    <h2>Questions leaders ask before a review</h2>
    <details>
      <summary>How long does technology due diligence take?</summary>
      <p>It depends on scope and access. A lightweight screening based on public information is quick, while confirmatory diligence with interviews and document review takes longer. Scope, the number of systems, and how ready the company's documentation is will drive the timeline more than anything else.</p>
    </details>
    <details>
      <summary>Who pays for it?</summary>
      <p>In a transaction, the buyer or investor usually commissions it, since they carry the risk. A seller may commission its own review before going to market to find and fix problems early. In non-deal cases, such as a major vendor purchase, the organization making the commitment pays.</p>
    </details>
    <details>
      <summary>Is it only for mergers and acquisitions?</summary>
      <p>No. Funding rounds, strategic partnerships, deep integrations, large vendor consolidations, and follow-on investments are all common triggers. Leaders also use the same approach before scaling an AI project or replacing a core system.</p>
    </details>
    <details>
      <summary>What is the difference between technology due diligence and a technology audit?</summary>
      <p>Due diligence supports a specific decision, such as a deal or an investment, and focuses on value, risk, and cost. An audit tests whether controls and processes work as designed, often on a recurring basis. They share methods, and many leaders use both.</p>
    </details>
    <details>
      <summary>What should I prepare before a review starts?</summary>
      <p>Gather roadmaps, backlogs, architecture diagrams, vendor contracts, security and privacy documentation, quality metrics, and team profiles. Name one internal contact who can arrange interviews. A short list of known issues helps the reviewer focus and speeds things up.</p>
    </details>
  </section>

  <section class="business-article__section business-article__sources" id="sources">
    <div class="section__label">Research and references</div>
    <h2>Sources</h2>
    <ul>
      <li><a href="https://snyk.io/articles/what-is-technical-due-diligence-tdd/" target="_blank" rel="noreferrer">Snyk: What is technical due diligence (TDD)?</a></li>
      <li><a href="https://www.catio.tech/blog/technology-due-diligence" target="_blank" rel="noreferrer">Catio: Technology Due Diligence, a Practical Guide for Buyers</a></li>
      <li><a href="https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1585&amp;context=misqe" target="_blank" rel="noreferrer">MISQE Insight on Information Systems Due Diligence</a></li>
      <li><a href="https://www.theiia.org/globalassets/documents/content/articles/guidance/gtag/gtag-auditing-business-applications/auditing-business-applications_update.pdf" target="_blank" rel="noreferrer">The IIA: Auditing Business Applications</a></li>
      <li><a href="https://www.theiia.org/globalassets/documents/content/articles/guidance/practice-guides/gtag-auditing-it-governance/gtag-17-auditing-it-governance.pdf" target="_blank" rel="noreferrer">The IIA: Auditing IT Governance</a></li>
      <li><a href="https://digitaldefynd.com/IQ/cto-technology-audit/" target="_blank" rel="noreferrer">DigitalDefynd: CTO Technology Audit &amp; Audit Checklist</a></li>
      <li><a href="https://mnatools.com/playbooks/it-due-diligence" target="_blank" rel="noreferrer">M&amp;A Tools: IT Due Diligence Playbook</a></li>
    </ul>
  </section>

  <section class="business-article__section business-article__recommended" aria-labelledby="technology-diligence-recommended-title">
    <div class="section__label">Continue reading</div>
    <h2 id="technology-diligence-recommended-title">Recommended</h2>
    <ul>
      <li><a href="/insights/ai-vendor-evaluation-checklist/">AI Vendor Evaluation Checklist: 40 Questions</a></li>
      <li><a href="/blog/business-process-automation/">Business Process Automation: A Practical Guide</a></li>
      <li><a href="/ai-strategy/">Enterprise AI Strategy &amp; Implementation Consulting</a></li>
    </ul>
  </section>
`;

const technologyDueDiligenceFaqs = [
  {
    question: "How long does technology due diligence take?",
    answer:
      "It depends on scope and access. A lightweight screening based on public information is quick, while confirmatory diligence with interviews and document review takes longer.",
  },
  {
    question: "Who pays for technology due diligence?",
    answer:
      "In a transaction, the buyer or investor usually commissions it. A seller may commission its own review before going to market, and an organization making a major technology commitment may commission one directly.",
  },
  {
    question: "Is technology due diligence only for mergers and acquisitions?",
    answer:
      "No. Funding rounds, strategic partnerships, deep integrations, large vendor consolidations, follow-on investments, AI scale-ups, and core-system replacements can all warrant the same approach.",
  },
  {
    question: "What is the difference between technology due diligence and a technology audit?",
    answer:
      "Due diligence supports a specific decision and focuses on value, risk, and cost. An audit tests whether controls and processes work as designed, often on a recurring basis.",
  },
  {
    question: "What should I prepare before a technology due diligence review?",
    answer:
      "Gather roadmaps, backlogs, architecture diagrams, vendor contracts, security and privacy documentation, quality metrics, team profiles, and a short list of known issues.",
  },
];

export const technologyDueDiligenceStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://theunicorntechs.com/blog/technology-due-diligence/#article",
      headline: technologyDueDiligenceSeo.heading,
      description: technologyDueDiligenceSeo.description,
      image: "https://theunicorntechs.com/blog/technology-due-diligence/DueDiliagenceHero.webp",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06",
      mainEntityOfPage: "https://theunicorntechs.com/blog/technology-due-diligence/",
      author: { "@type": "Person", name: "Heather Hitchler" },
      publisher: {
        "@type": "Organization",
        "@id": "https://theunicorntechs.com/#organization",
        name: "UNI",
        url: "https://theunicorntechs.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://theunicorntechs.com/android-chrome-512x512.png",
        },
      },
      about: [
        "Technology due diligence",
        "Technical due diligence",
        "IT due diligence",
        "Technology audit",
        "AI vendor evaluation",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://theunicorntechs.com/blog/technology-due-diligence/#faq",
      mainEntity: technologyDueDiligenceFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://theunicorntechs.com/blog/technology-due-diligence/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://theunicorntechs.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://theunicorntechs.com/blog/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Technology Due Diligence",
          item: "https://theunicorntechs.com/blog/technology-due-diligence/",
        },
      ],
    },
  ],
};
