import { gregHeadKnowledgeBase, gregHeadPersonality } from '../data/knowledgeBase.js';

export class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  async generateInsight(userQuery, conversationHistory = []) {
    try {
      // Build context from knowledge base
      const context = this.buildContext(userQuery);
      
      // Create system prompt in Greg's voice
      const systemPrompt = this.createSystemPrompt(context);
      
      // Prepare messages for API
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-6), // Include last 6 messages for context
        { role: 'user', content: userQuery }
      ];

      // For demo purposes, return a simulated response
      // In production, this would call the actual OpenAI API
      return this.simulateAIResponse(userQuery, context);
      
    } catch (error) {
      console.error('Error generating AI insight:', error);
      throw new Error('Failed to generate insight. Please try again.');
    }
  }

  buildContext(userQuery) {
    const query = userQuery.toLowerCase();
    let relevantContext = {
      challenges: [],
      drivers: [],
      insights: [],
      mistakes: []
    };

    // Find relevant challenges
    gregHeadKnowledgeBase.challenges.forEach(challenge => {
      if (query.includes(challenge.title.toLowerCase()) || 
          query.includes(challenge.description.toLowerCase())) {
        relevantContext.challenges.push(challenge);
      }
    });

    // Find relevant business drivers
    const allDrivers = [
      ...gregHeadKnowledgeBase.businessDrivers.revenue,
      ...gregHeadKnowledgeBase.businessDrivers.profit,
      ...gregHeadKnowledgeBase.businessDrivers.cashFlow
    ];
    
    allDrivers.forEach(driver => {
      if (query.includes(driver.name.toLowerCase()) ||
          query.includes(driver.category.toLowerCase())) {
        relevantContext.drivers.push(driver);
      }
    });

    // Find relevant insights
    gregHeadKnowledgeBase.keyInsights.forEach(insight => {
      if (query.includes(insight.title.toLowerCase()) ||
          insight.quote.toLowerCase().includes(query.split(' ')[0])) {
        relevantContext.insights.push(insight);
      }
    });

    return relevantContext;
  }

  createSystemPrompt(context) {
    return `You are Greg Head, a seasoned business advisor and former family office founder who has built, scaled, and sold dozens of businesses. You speak directly and practically, using real-world examples and analogies. You've walked the same path as the business owners you advise.

Your expertise includes:
- The 5 Challenges Business Owners Face
- The 12 Business Drivers Framework (Revenue, Profit, Cash Flow)
- Practical, actionable advice over theoretical concepts
- Understanding blue-collar and family-led businesses

Your communication style:
- Direct and conversational ("Look, here's the thing...")
- Use practical analogies (leaky bucket, sailboat test, etc.)
- Challenge conventional wisdom with confidence
- Focus on what actually moves the needle
- Speak as someone who's been in their shoes

Key principles:
- Cash Flow is King, not Cash
- Fix the leaks before pouring more water in the bucket
- Systems and processes scale, not people
- Measure everything you can, ignore what you can't measure
- Business owners need practical plans, not more theory

Relevant context for this query:
${JSON.stringify(context, null, 2)}

Respond as Greg Head would - practical, direct, and focused on actionable insights that will actually help this business owner.`;
  }

  simulateAIResponse(userQuery, context) {
    // This simulates an AI response for demo purposes
    // In production, replace with actual OpenAI API call
    
    const responses = {
      'cash flow': `Look, here's the thing about cash flow - most business owners confuse having cash with managing cash flow. Cash is only king when you're buying something and can negotiate better terms. But Cash Flow is King in business! 

Think about airlines - they have the best cash flow model ever. When do you buy your ticket? Months before you fly. They get all your cash way in advance and don't have to deliver for months. That's the model you want to replicate.

If you're struggling with cash flow, let's look at your Days Sales Outstanding first. Are you sending invoices immediately after completing work? I cannot tell you how many times I see contractors complete a job and wait 9 days to send the invoice. The 30-day clock hasn't even started ticking yet!`,

      'growth': `Stop right there. When someone tells me "I just need more sales," I reframe it this way: that's like saying "I have a leaky bucket, and I just need to pour more water in it until the holes are fixed."

You don't fix a leaky bucket by pouring more water into it. You fix the holes first. Same with your business. Before chasing more leads or more sales, fix your operational leaks:

1. What's your conversion rate from leads to sales?
2. How many customers come back for repeat business?
3. Are you collecting payments promptly?

Focus on the 12 Business Drivers. Revenue is just 2 of them - Number of Sales Transactions and Average Transaction Value. But you've got 4 Profit Drivers and 6 Cash Flow Drivers that are probably bleeding money.`,

      'stress': `I get it. The fear and stress are real because everything depends on you. If you're not there, nothing gets done. You're the chief everything - chief salesperson, chief technician, chief HR person.

Here's what I tell every business owner: if you can't go sit on a sailboat in the middle of the Pacific Ocean, no internet, no phone, and come back a year later with your business better than when you left, then you have a job, not a business machine.

The solution isn't working harder - it's building systems and processes. You cannot hire a business owner to replace you. You can only replace yourself with documented systems and trained people to manage those systems.

Start with one process. Document it. Train someone else to do it. Then move to the next one. That's how you escape the Owner's Trap.`
    };

    // Simple keyword matching for demo
    const query = userQuery.toLowerCase();
    if (query.includes('cash') || query.includes('money')) {
      return responses['cash flow'];
    } else if (query.includes('grow') || query.includes('scale') || query.includes('sales')) {
      return responses['growth'];
    } else if (query.includes('stress') || query.includes('fear') || query.includes('burnout')) {
      return responses['stress'];
    }

    // Default response
    return `I hear you asking about "${userQuery}". As someone who's been in your shoes, running family businesses and turning around underperforming assets, let me cut through the noise.

The first thing we need to understand is which of the 5 Challenges you're facing:
1. Business Owner Dependency (you're the chief everything)
2. Growth Catch-22 (need cash to grow, can't get cash without growing)
3. Lack of simple business intelligence (your P&L doesn't tell the real story)
4. Fear and stress about business failure
5. Struggling to achieve your vision of success

Once we identify the core challenge, we can focus on the specific Business Drivers that will actually move the needle for your situation. Remember - we need a practical plan of action, not more theory.

What specific challenge is keeping you up at night?`;
  }
}

export const aiService = new AIService();