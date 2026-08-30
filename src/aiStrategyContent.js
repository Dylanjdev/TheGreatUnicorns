export const aiStrategySeo = {
  title: "Enterprise AI Strategy & Implementation Consulting | UNI",
  description:
    "Turn AI strategy into production systems. UNI aligns use cases, data, cloud architecture, governance, implementation, and ongoing AI operations.",
  eyebrow: "Enterprise AI strategy & implementation",
  heading: "Enterprise AI Strategy Built for Production",
  heroDescription:
    "Move beyond disconnected pilots with a practical AI roadmap that connects business value, data, architecture, governance, delivery, and ongoing operations.",
};

export const aiStrategyServices = [
  {
    title: "AI use cases and roadmap",
    body:
      "Prioritize AI opportunities by business value, feasibility, data readiness, operating impact, and total cost—not novelty or vendor pressure.",
  },
  {
    title: "Data and cloud architecture",
    body:
      "Design the data pipelines, integrations, security boundaries, and cloud foundations required to support reliable production AI.",
  },
  {
    title: "Production AI implementation",
    body:
      "Turn validated use cases into working systems that fit existing workflows, technical standards, and delivery capacity.",
  },
  {
    title: "AI governance and controls",
    body:
      "Establish ownership, access, evaluation, human oversight, monitoring, and risk controls that scale with real AI adoption.",
  },
  {
    title: "AI operations and optimization",
    body:
      "Monitor quality, cost, latency, reliability, and business outcomes so deployed AI continues improving after launch.",
  },
  {
    title: "Workflow integration and adoption",
    body:
      "Embed AI into the processes people already use, define accountable operating roles, and build the practical capability teams need to sustain it.",
  },
];

export const aiStrategyProcess = [
  {
    number: "01",
    title: "Align",
    body:
      "Connect the AI opportunity to a measurable business outcome, responsible owner, realistic constraints, and a clear decision path.",
  },
  {
    number: "02",
    title: "Build",
    body:
      "Implement the smallest production-worthy system that proves value while establishing the data, security, and operating foundations for scale.",
  },
  {
    number: "03",
    title: "Operate",
    body:
      "Measure performance, cost, risk, adoption, and business impact continuously—then improve the system based on evidence.",
  },
];

export const aiStrategyFaqs = [
  {
    question: "What should an enterprise AI strategy include?",
    answer:
      "An enterprise AI strategy should connect prioritized use cases to business outcomes, data readiness, architecture, security, governance, delivery ownership, workforce adoption, operating cost, and measurable success criteria. A list of tools or pilot ideas is not a complete strategy.",
  },
  {
    question: "How do you move an AI pilot into production?",
    answer:
      "Moving from pilot to production requires reliable data pipelines, integration with real workflows, security and access controls, quality evaluation, human oversight, monitoring, cost management, accountable ownership, and a plan for ongoing improvement. UNI designs these requirements into the implementation path from the start.",
  },
  {
    question: "Does an AI strategy require replacing our existing technology stack?",
    answer:
      "Not necessarily. UNI first evaluates the systems, data, cloud services, vendor relationships, and internal capabilities already in place. The goal is to reuse sound foundations, address material gaps, and avoid unnecessary platform churn.",
  },
  {
    question: "Where does AI governance fit into implementation?",
    answer:
      "Governance belongs inside the implementation—not after it. Ownership, acceptable use, data access, evaluation, human review, incident response, vendor controls, and monitoring should evolve alongside the system so teams can move quickly without creating unmanaged risk.",
  },
  {
    question: "Can UNI support both AI strategy and implementation?",
    answer:
      "Yes. UNI can help leadership define and pressure-test the strategy, then work with internal teams and vendors to design, implement, operationalize, and continuously improve the approved approach.",
  },
];

export const aiStrategyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://theunicorntechs.com/ai-strategy/#service",
      name: "Enterprise AI Strategy and Implementation Consulting",
      serviceType: [
        "Enterprise AI strategy",
        "AI implementation consulting",
        "AI governance",
        "AI operations and optimization",
      ],
      url: "https://theunicorntechs.com/ai-strategy/",
      description: aiStrategySeo.description,
      provider: {
        "@type": "Organization",
        "@id": "https://theunicorntechs.com/#organization",
        name: "UNI",
        alternateName: "Unbridled Neuro Information",
        legalName: "LoveLeeVa LLC",
        url: "https://theunicorntechs.com/",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Virginia" },
        { "@type": "Country", name: "United States" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Mid-market and enterprise leadership and technology teams",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://theunicorntechs.com/ai-strategy/#faq",
      mainEntity: aiStrategyFaqs.map((item) => ({
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
      "@id": "https://theunicorntechs.com/ai-strategy/#breadcrumb",
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
          name: "Enterprise AI Strategy",
          item: "https://theunicorntechs.com/ai-strategy/",
        },
      ],
    },
  ],
};
