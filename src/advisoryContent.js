export const advisorySeo = {
  title: "Vendor-Neutral AI Advisory & Technology Consulting | UNI",
  description:
    "Independent AI advisory and technology consulting for executives. UNI pressure-tests AI strategy, vendors, delivery risk, and economics before costly decisions.",
  eyebrow: "Independent AI & technology advisory",
  heading: "Vendor-Neutral AI Advisory for Business Leaders",
  heroDescription:
    "Independent executive guidance for AI strategy, technology investments, vendor decisions, delivery risk, and the economics behind the plan.",
};

export const advisoryServices = [
  {
    title: "AI strategy and readiness",
    body:
      "Clarify where AI can create measurable value, what data and operating foundations are missing, and which ideas should move forward now.",
  },
  {
    title: "Vendor and platform evaluation",
    body:
      "Compare AI vendors, platforms, proposals, and contract assumptions against your real requirements—without commissions, quotas, or product bias.",
  },
  {
    title: "Technical and delivery due diligence",
    body:
      "Pressure-test architecture, staffing, security, implementation plans, and delivery claims before commitments become expensive to unwind.",
  },
  {
    title: "AI economics and margin-risk review",
    body:
      "Connect technical choices to cost, capacity, revenue promises, and delivery constraints so leadership can see where margin is likely to leak.",
  },
  {
    title: "Executive decision support",
    body:
      "Give CEOs, boards, and leadership teams a clear, technically grounded view of the decision—including tradeoffs, risks, and practical next steps.",
  },
  {
    title: "Implementation oversight",
    body:
      "Keep approved initiatives aligned to business outcomes as internal teams and vendors move from strategy through execution.",
  },
];

export const advisoryProcess = [
  {
    number: "01",
    title: "Diagnose",
    body:
      "Identify the real decision, the hidden constraints, and the gap between the commercial promise and technical reality.",
  },
  {
    number: "02",
    title: "Pressure-test",
    body:
      "Challenge the plan across architecture, operations, vendors, cost, risk, people, and delivery capacity.",
  },
  {
    number: "03",
    title: "Decide",
    body:
      "Turn the findings into a prioritized recommendation leadership can defend, fund, and execute.",
  },
];

export const advisoryFaqs = [
  {
    question: "What is vendor-neutral AI advisory?",
    answer:
      "Vendor-neutral AI advisory is independent guidance on AI strategy, platforms, vendors, economics, and delivery. UNI does not base recommendations on software commissions or sales quotas, so the advice stays aligned to the client's operating needs.",
  },
  {
    question: "When should a business bring in an independent AI advisor?",
    answer:
      "Independent advice is most valuable before a major AI purchase, during vendor selection, when an initiative is stuck between leadership and delivery teams, or when projected value and implementation cost no longer line up.",
  },
  {
    question: "How is UNI different from an implementation vendor?",
    answer:
      "An implementation vendor is usually accountable for selling or delivering a defined solution. UNI first helps leadership determine whether the proposed solution, architecture, economics, and delivery plan are right for the business, then can provide oversight as execution moves forward.",
  },
  {
    question: "Can UNI review an AI initiative that is already underway?",
    answer:
      "Yes. UNI can assess an active initiative's strategy, vendor claims, architecture, delivery risks, operating model, and economics to identify what should continue, change, or stop.",
  },
  {
    question: "Who is executive AI advisory for?",
    answer:
      "UNI works with local businesses, growing mid-market companies, and enterprise leadership teams that need a technically grounded, business-first view before making consequential AI and technology decisions.",
  },
];

export const advisoryStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://theunicorntechs.com/advisory/#service",
      name: "Vendor-Neutral AI Advisory and Technology Consulting",
      serviceType: [
        "AI advisory",
        "Executive technology advisory",
        "AI vendor evaluation",
        "Technology due diligence",
      ],
      url: "https://theunicorntechs.com/advisory/",
      description: advisorySeo.description,
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
        audienceType: "Business executives, leadership teams, and technology organizations",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://theunicorntechs.com/advisory/#faq",
      mainEntity: advisoryFaqs.map((item) => ({
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
      "@id": "https://theunicorntechs.com/advisory/#breadcrumb",
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
          name: "AI Advisory",
          item: "https://theunicorntechs.com/advisory/",
        },
      ],
    },
  ],
};
