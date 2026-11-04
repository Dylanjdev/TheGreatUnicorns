export const vendorEvaluationSeo = {
  title: "AI Vendor Evaluation Checklist: 40 Questions | UNI",
  description:
    "Use UNI's 10-part AI vendor evaluation checklist to pressure-test business value, data, security, performance, integration, costs, support, and exit risk.",
  eyebrow: "Practical guide · 12 minute read",
  heading: "AI Vendor Evaluation Checklist: 40 Questions Before You Buy",
  heroDescription:
    "A vendor-neutral scorecard for leaders who need to separate an impressive AI demo from a system their organization can afford, govern, operate, and leave.",
};

export const vendorEvaluationRubric = [
  {
    number: "01",
    id: "business-outcome",
    title: "Business outcome and workflow fit",
    protects: "Protects against buying a capable tool for an undefined problem.",
    questions: [
      "What specific decision, task, or workflow will the system improve?",
      "Which measurable baseline will change, by how much, and by when?",
      "Who owns the outcome after the vendor leaves the room?",
      "What work, review step, or cost will be removed—not merely added to?",
    ],
    evidence:
      "Ask for a one-page use-case definition, current baseline, target metric, named business owner, and an explicit list of work that is out of scope.",
  },
  {
    number: "02",
    id: "data-rights",
    title: "Data use, ownership, and privacy",
    protects: "Protects the information entering the system and the value created from it.",
    questions: [
      "Exactly what data enters the system, where is it processed, and where is it stored?",
      "Can customer data, prompts, outputs, or feedback be used to train any model?",
      "Which subprocessors and model providers can access the data?",
      "How are deletion, retention, export, and legal holds handled?",
    ],
    evidence:
      "Request a current data-flow diagram, retention schedule, subprocessor list, data-processing terms, and written confirmation of training and ownership rights.",
  },
  {
    number: "03",
    id: "quality-evaluation",
    title: "Quality, evaluation, and failure behavior",
    protects: "Protects the business from a demo that succeeds only on curated examples.",
    questions: [
      "How is acceptable performance defined for our use case—not a public benchmark?",
      "What representative test set will be used, and who approves it?",
      "Which failure modes are known, and how does the system behave when uncertain?",
      "How will quality be re-tested after model, prompt, data, or workflow changes?",
    ],
    evidence:
      "Require a use-case evaluation plan, pass/fail thresholds, failure examples, change-testing procedure, and results your team can reproduce on representative data.",
  },
  {
    number: "04",
    id: "security-access",
    title: "Security and access control",
    protects: "Protects systems and data when AI gains access to real workflows.",
    questions: [
      "How do identity, least privilege, role separation, and administrative access work?",
      "Are data encrypted in transit and at rest, and how are secrets managed?",
      "What security testing, audit evidence, and incident-response process can the vendor show?",
      "What actions can the AI take, and which require human approval?",
    ],
    evidence:
      "Ask for architecture and access-control diagrams, relevant audit reports, penetration-test scope, incident terms, and a complete inventory of tools or actions the AI can invoke.",
  },
  {
    number: "05",
    id: "architecture-integration",
    title: "Architecture and integration burden",
    protects: "Protects delivery teams from hidden implementation and maintenance work.",
    questions: [
      "Which systems, APIs, data pipelines, and identity services must be integrated?",
      "What latency, availability, volume, and context limits apply in production?",
      "Which implementation tasks belong to the vendor, your team, or another partner?",
      "How does the system degrade when a model, integration, or upstream data source fails?",
    ],
    evidence:
      "Request a target architecture, dependency map, responsibility matrix, nonfunctional requirements, and a tested fallback or continuity plan.",
  },
  {
    number: "06",
    id: "governance-oversight",
    title: "Governance and human oversight",
    protects: "Protects leadership from deploying a system with no accountable operator.",
    questions: [
      "Who can approve the use case, changes, exceptions, and expansion to new users?",
      "Where is human review required, and what information does the reviewer receive?",
      "Can decisions and outputs be traced well enough to investigate an incident?",
      "How can users report a harmful, incorrect, biased, or unexpected result?",
    ],
    evidence:
      "Ask for named decision rights, review workflows, audit-log examples, escalation paths, and the vendor's process for receiving and resolving user feedback.",
  },
  {
    number: "07",
    id: "operations-support",
    title: "Operations, monitoring, and support",
    protects: "Protects the organization after the pilot team hands the system over.",
    questions: [
      "Who monitors quality, cost, latency, availability, adoption, and model changes?",
      "What service levels apply, and what happens when they are missed?",
      "How are releases communicated, tested, approved, and rolled back?",
      "What skills and weekly operating effort will our team need?",
    ],
    evidence:
      "Request sample dashboards, service-level terms, a change log, support escalation procedures, rollback evidence, and a realistic runbook for the buyer's team.",
  },
  {
    number: "08",
    id: "economics",
    title: "Total economics and margin risk",
    protects: "Protects the business case from usage charges and labor hidden outside the quote.",
    questions: [
      "What drives cost: users, tokens, calls, compute, storage, integrations, or support?",
      "What does the three-year cost look like at expected and stress-case volume?",
      "Which internal labor, data preparation, oversight, and change-management costs are excluded?",
      "At what adoption or accuracy level does the business case stop working?",
    ],
    evidence:
      "Build a three-year total-cost model with volume assumptions, sensitivity ranges, implementation labor, operating labor, support, and the cost of failed or manually reviewed outputs.",
  },
  {
    number: "09",
    id: "contract-exit",
    title: "Contract, dependency, and exit",
    protects: "Protects the buyer's leverage if the system, price, or vendor changes.",
    questions: [
      "Who owns configurations, prompts, evaluation sets, fine-tuning artifacts, and outputs?",
      "Can our data and operating artifacts be exported in a usable format?",
      "What happens if an underlying model, price, feature, or subprocessor changes?",
      "How long, expensive, and disruptive would replacement or termination be?",
    ],
    evidence:
      "Require clear IP terms, change-notification rights, renewal limits, transition assistance, deletion certification, and an exit plan tested before production approval.",
  },
  {
    number: "10",
    id: "proof-pilot",
    title: "Proof, pilot, and production gate",
    protects: "Protects the final decision from being made on promises or a theatrical pilot.",
    questions: [
      "Can the vendor substantiate relevant outcomes in a comparable operating environment?",
      "Will the pilot use representative data, users, integrations, and failure cases?",
      "Are success, stop, remediation, and production criteria agreed before the pilot begins?",
      "Will security, legal, operations, finance, and business owners sign the production decision?",
    ],
    evidence:
      "Ask for referenceable evidence, a time-boxed pilot charter, pre-agreed thresholds, a decision log, and a cross-functional go/no-go record—not a vendor-authored success recap.",
  },
];

export const vendorEvaluationFaqs = [
  {
    question: "What is the most important criterion when evaluating an AI vendor?",
    answer:
      "The most important criterion is verified fit to a defined business outcome. A vendor should be able to show, using representative data and operating conditions, that its system can improve a named workflow within your cost, risk, integration, and governance constraints. Features and model benchmarks are supporting evidence, not the decision itself.",
  },
  {
    question: "How should an AI vendor scorecard be weighted?",
    answer:
      "Weight the scorecard according to use-case risk and business value. Security, data rights, evaluation quality, and exit terms should often be hard gates rather than points a vendor can offset with a strong demo or a low price. Document the weights and gates before proposals arrive so vendor enthusiasm does not rewrite the criteria.",
  },
  {
    question: "What evidence should an AI vendor provide?",
    answer:
      "Useful evidence includes a data-flow diagram, evaluation method and results, security and access-control documentation, subprocessor details, service levels, monitoring examples, incident and change procedures, implementation responsibilities, customer references, a total-cost model, and written ownership and exit terms. The right evidence depends on the use case and its risk.",
  },
  {
    question: "How long should an enterprise AI pilot run?",
    answer:
      "An AI pilot should be long enough to test representative volume, users, edge cases, integrations, operating effort, and cost, but short enough to force a decision. Define the time box only after agreeing on success, stop, and remediation criteria. A pilot without a scheduled go, change, or stop decision can become an expensive holding pattern.",
  },
  {
    question: "When should a company use an independent AI advisor?",
    answer:
      "Independent review is most valuable before a consequential purchase, when internal stakeholders disagree, when the buyer lacks technical evaluation capacity, or when vendor claims, economics, and production requirements do not line up. An advisor should disclose conflicts and have no commission or quota tied to the selected product.",
  },
];

export const vendorEvaluationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://theunicorntechs.com/insights/ai-vendor-evaluation-checklist/#article",
      headline: vendorEvaluationSeo.heading,
      description: vendorEvaluationSeo.description,
      datePublished: "2026-09-30",
      dateModified: "2026-09-30",
      mainEntityOfPage: "https://theunicorntechs.com/insights/ai-vendor-evaluation-checklist/",
      author: {
        "@type": "Person",
        name: "Heather Hitchler",
        jobTitle: "Founder & Executive Fiduciary Architect",
      },
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
        "AI vendor evaluation",
        "AI procurement",
        "AI due diligence",
        "Enterprise artificial intelligence",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://theunicorntechs.com/insights/ai-vendor-evaluation-checklist/#faq",
      mainEntity: vendorEvaluationFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://theunicorntechs.com/insights/ai-vendor-evaluation-checklist/#breadcrumb",
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
          name: "AI Vendor Evaluation Checklist",
          item: "https://theunicorntechs.com/insights/ai-vendor-evaluation-checklist/",
        },
      ],
    },
  ],
};
