export const gregHeadKnowledgeBase = {
  // Core Framework
  challenges: [
    {
      id: 1,
      title: "Business Owner Dependency",
      description: "Business relies heavily on the owner - they're the 'chief everything'",
      details: "Most business owners are the chief salesperson, chief technician, chief HR person, chief customer service person. If they take time off, the business doesn't run smoothly, leading to burnout and lower profitability.",
      solution: "Build systems and processes that allow the business to run without constant owner involvement"
    },
    {
      id: 2,
      title: "Growth Catch-22",
      description: "Need cash to grow but can't get cash without growing",
      details: "Business owners face a paradox where they need cash to grow their business but can't get more cash without growing. This is complicated by their lack of business and financial strategy expertise.",
      solution: "Focus on cash flow optimization and strategic planning rather than just revenue growth"
    },
    {
      id: 3,
      title: "Lack of Simple Business Intelligence",
      description: "No simple way to understand business performance",
      details: "Business owners receive complex accounting reports (P&L, balance sheets) instead of simple, actionable business managerial reports, making decision-making difficult.",
      solution: "Implement the 12 Business Drivers framework for clear, actionable insights"
    },
    {
      id: 4,
      title: "Fear and Stress",
      description: "Deals with fear and stress related to business failure",
      details: "Many business owners experience fear of failure and stress about providing for their families, which negatively impacts their mental health and personal relationships.",
      solution: "Create predictable systems and clear performance metrics to reduce uncertainty"
    },
    {
      id: 5,
      title: "Vision Achievement Gap",
      description: "Struggles to achieve their vision of success",
      details: "While business owners have their own definitions of success, they often lack the knowledge and tools to achieve their vision, struggling just to keep their business afloat.",
      solution: "Develop a clear strategic plan with measurable objectives and actionable next steps"
    }
  ],

  // 12 Business Drivers Framework
  businessDrivers: {
    revenue: [
      {
        name: "Number of Sales Transactions",
        category: "Revenue Driver",
        description: "Total number of sales completed in a given period",
        keyQuestions: [
          "How many sales transactions did you complete this month?",
          "What's driving the number of transactions?",
          "How can you increase transaction volume?"
        ]
      },
      {
        name: "Average Sales Transaction Value",
        category: "Revenue Driver",
        description: "Average dollar amount per sale",
        keyQuestions: [
          "What's your average ticket size?",
          "How can you increase the average transaction value?",
          "Are you pricing correctly for the value you provide?"
        ]
      }
    ],
    profit: [
      {
        name: "Cost of Sales as % of Revenue",
        category: "Profit Driver",
        description: "Direct costs associated with producing your product or service",
        keyQuestions: [
          "What percentage of revenue goes to direct costs?",
          "How can you reduce cost of sales without sacrificing quality?",
          "Are you tracking job costs accurately?"
        ]
      },
      {
        name: "Payroll Expenses",
        category: "Profit Driver",
        description: "Total compensation costs for employees",
        keyQuestions: [
          "Is everyone in the right position?",
          "Are you getting adequate ROI from payroll?",
          "Can any roles be outsourced or eliminated?"
        ]
      },
      {
        name: "Marketing Expenses as % of Revenue",
        category: "Profit Driver",
        description: "Marketing and advertising costs as percentage of revenue",
        keyQuestions: [
          "What's the ROI on each marketing channel?",
          "Are you tracking leads and conversions by source?",
          "Can you measure everything you're spending on marketing?"
        ]
      },
      {
        name: "Overhead Expenses",
        category: "Profit Driver",
        description: "Fixed costs not directly tied to production",
        keyQuestions: [
          "Are all overhead expenses necessary?",
          "Can any expenses be renegotiated or eliminated?",
          "Before spending, ask: Does it directly contribute to revenue?"
        ]
      }
    ],
    cashFlow: [
      {
        name: "Days Sales Outstanding",
        category: "Cash Flow Driver",
        description: "Average number of days to collect receivables",
        keyQuestions: [
          "How quickly are you collecting payments?",
          "Do you have a formal collections process?",
          "Can you require deposits or change payment terms?"
        ]
      },
      {
        name: "Days Inventory Outstanding",
        category: "Cash Flow Driver",
        description: "How long inventory sits before being sold",
        keyQuestions: [
          "How efficiently are you managing inventory?",
          "Can you reduce inventory levels without affecting service?",
          "Are you forecasting inventory needs accurately?"
        ]
      },
      {
        name: "Sale or Purchase of Assets",
        category: "Cash Flow Driver",
        description: "Impact of buying or selling business assets",
        keyQuestions: [
          "Are asset purchases generating adequate ROI?",
          "Should you lease vs. buy equipment?",
          "Do you have non-productive assets you can sell?"
        ]
      },
      {
        name: "Days Payable Outstanding",
        category: "Cash Flow Driver",
        description: "How long you take to pay suppliers",
        keyQuestions: [
          "Are you optimizing payment timing?",
          "Can you negotiate better payment terms?",
          "Are you taking advantage of early payment discounts when beneficial?"
        ]
      },
      {
        name: "Additions or Repayments to Debt",
        category: "Cash Flow Driver",
        description: "Impact of borrowing or paying down debt",
        keyQuestions: [
          "Is debt being used for profit-producing assets?",
          "Is your debt-to-equity ratio manageable?",
          "Do you have adequate access to working capital?"
        ]
      },
      {
        name: "Owner Investments or Distributions",
        category: "Cash Flow Driver",
        description: "Money put into or taken out of the business by owners",
        keyQuestions: [
          "Are owner withdrawals impacting business growth?",
          "When making distributions, are you considering cash flow impact?",
          "Are you reinvesting adequately for future growth?"
        ]
      }
    ]
  },

  // Greg's Key Insights and Quotes
  keyInsights: [
    {
      title: "Cash Flow vs Cash",
      quote: "Cash is NOT King... Cash Flow is King! Cash is only king when you're a buyer. Cash flow is what will allow the business to grow and allow the owner to make more money.",
      context: "Understanding the difference between having cash and managing cash flow timing"
    },
    {
      title: "The Leaky Bucket Analogy",
      quote: "When someone says, 'I just need more sales,' I reframe it: that's like saying, 'I have a leaky bucket, and I just need to pour more water in it until the holes are fixed.'",
      context: "Fix operational problems before chasing more revenue"
    },
    {
      title: "Systems Over People",
      quote: "You cannot hire a business owner. You can only replace them with systems and processes.",
      context: "Building scalable operations that don't depend on any individual"
    },
    {
      title: "The Sailboat Test",
      quote: "If you can't go sit on a sailboat in the middle of the Pacific Ocean, no internet, no phone, and come back a year later and your business is better than when you left, then you have a job. You don't have a business machine.",
      context: "True business ownership means the business runs without you"
    },
    {
      title: "Measuring What Matters",
      quote: "If you ever have a marketing person come in and say, 'we're going to do brand building,' you fire them immediately. How do you measure brand building? You can't.",
      context: "Only invest in marketing you can measure and track ROI"
    }
  ],

  // Common Business Owner Mistakes
  commonMistakes: [
    {
      title: "The No-Show Contractor Epidemic",
      description: "Reliability is a massive competitive advantage in service businesses",
      solution: "Simply showing up when you say you will sets you apart from competitors"
    },
    {
      title: "Invoice Delay That Kills Cash Flow",
      description: "Completing a job but waiting days to send the invoice",
      solution: "Send invoices immediately upon job completion - the 30-day clock hasn't even started"
    },
    {
      title: "Job Costing Reality Check",
      description: "Bidding based on theoretical hours rather than real productivity",
      solution: "Account for travel time, breaks, and actual productivity in job costing"
    },
    {
      title: "Outdated Payment Methods",
      description: "Accepting only checks while paying 8% on credit lines to avoid 3% card fees",
      solution: "Modernize payment methods to improve cash flow timing"
    }
  ],

  // Target Client Profile
  targetClient: {
    description: "Small to medium-sized business owners ($500K-$10M revenue) who are experts in their craft but not necessarily in business or financial strategy",
    characteristics: [
      "Expert in their craft/trade",
      "Not necessarily expert in business or financials",
      "Experiencing pain they want resolved",
      "Want a successful business but don't know how to get there"
    ],
    whatTheyWant: [
      "A business that doesn't rely on them",
      "Plenty of cash to grow their business",
      "Clear understanding of their financial health",
      "Reduced stress and fear",
      "A clear path to success"
    ]
  }
};

// AI Context for generating responses in Greg's voice
export const gregHeadPersonality = {
  voice: "Direct, conversational, and practical. Uses real-world examples and analogies. Challenges conventional wisdom with confidence.",
  language_patterns: [
    "Look, here's the thing...",
    "I'm telling you...",
    "This drives me insane...",
    "It baffles me...",
    "I cannot tell you how many times..."
  ],
  approach: "Shoulder-to-shoulder guidance, not theoretical consulting. Focuses on actionable steps that actually move the needle.",
  expertise: "Business owner who's walked the same path - building, scaling, and navigating the pressure of running companies with family's financial future at risk."
};