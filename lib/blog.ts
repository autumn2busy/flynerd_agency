export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "AI Automation" | "Email Marketing" | "Marketing Operations" | "AI Agents" | "Analytics";
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: "ai-automation-small-business-2024",
    title: "AI Automation for Small Business: The 2024 Playbook",
    excerpt: "Forget the hype. Here's what actually works when implementing AI automation in small and midsize businesses.",
    category: "AI Automation",
    date: "2024-01-15",
    readTime: "8 min read",
    author: "FlyNerd Tech",
    featured: true,
    content: `
## The Reality Check

Everyone's talking about AI, but most small businesses are still trying to figure out what to actually *do* with it. After implementing AI automation for dozens of SMBs, here's what we've learned.

## Start With These Three Areas

### 1. Customer Communication
The lowest-hanging fruit for most businesses. AI chatbots for FAQ handling, automated email responses, and lead qualification can save 10-20 hours per week.

**Quick win:** Set up a simple AI chatbot that handles your top 10 customer questions. Most queries are repetitive—let AI handle them so your team can focus on complex issues.

### 2. Content Repurposing
Create once, distribute everywhere. AI tools can transform a single blog post into:
- Social media threads
- Email newsletter content
- Video scripts
- Podcast talking points

**Quick win:** Use AI to generate 5 social posts from every blog article you publish.

### 3. Data Entry and Reporting
Manual data entry is expensive and error-prone. AI can:
- Extract data from documents and emails
- Update CRM records automatically
- Generate weekly reports without human intervention

**Quick win:** Automate your weekly reporting with AI-powered dashboards.

## The Tools That Actually Work

After testing dozens of tools, here's our current stack:
- **Make.com** for workflow automation
- **ChatGPT/Claude** for content and analysis
- **ActiveCampaign** for email automation with AI features
- **Zapier** for simple integrations

## Common Mistakes to Avoid

1. **Trying to automate everything at once** - Start small, prove ROI, then expand
2. **Ignoring the human element** - AI should augment your team, not replace judgment
3. **Not measuring results** - Track time saved and revenue impact

## Next Steps

Ready to implement AI automation in your business? [Book a strategy call](/contact) and we'll identify your highest-impact opportunities.
    `,
  },
  {
    slug: "email-automation-that-converts",
    title: "Email Automation That Actually Converts: A Step-by-Step Guide",
    excerpt: "Most email automations fail because they ignore one critical element. Here's how to build sequences that drive revenue.",
    category: "Email Marketing",
    date: "2024-01-10",
    readTime: "6 min read",
    author: "FlyNerd Tech",
    content: `
## Why Most Email Sequences Fail

They're generic. They're loud. And they're irrelevant. Most businesses set up a "welcome sequence" and then forget about it. 

## The Psychology of Effective Drip Campaigns

People don't buy when you're ready to sell. They buy when they're ready to buy. Your automation should be there for that moment.

### 1. Segmentation is Key
Don't send the same message to a new lead and a repeat customer. Use behavioral triggers.

### 2. The Value-First Approach
Provide value in 80% of your emails. Sell in 20%.

### 3. AI-Assisted Copywriting
Use AI to variations of headlines and test what performs better.

## Measuring What Matters

Stop obsessing over open rates. Focus on:
- Click-through rates
- Conversion rates per sequence
- Revenue per subscriber
    `,
  },
  {
    slug: "crm-cleanup-checklist",
    title: "The CRM Cleanup Checklist Every Growing Business Needs",
    excerpt: "Dirty data is costing you deals. Use this systematic approach to clean up your CRM and unlock better marketing performance.",
    category: "Marketing Operations",
    date: "2024-01-05",
    readTime: "5 min read",
    author: "FlyNerd Tech",
    content: `
## Signs Your CRM Needs Cleaning

If your sales team is complaining about "bad leads" or your email bounce rates are rising, you have a data problem.

## The Checklist

1. **Deduplication:** Merge accidental double entries.
2. **Data Enrichment:** Use automation to fill in missing phone numbers or job titles.
3. **Status Audit:** Archive leads that haven't been active in 12+ months.
    `,
  },
  {
    slug: "ai-chatbots-customer-service",
    title: "AI Chatbots for Customer Service: Implementation Guide",
    excerpt: "How to deploy AI agents that actually help customers instead of frustrating them. Lessons from real implementations.",
    category: "AI Agents",
    date: "2024-01-02",
    readTime: "10 min read",
    author: "FlyNerd Tech",
    content: `
## When Chatbots Make Sense

If you're answering the same 5 questions every day, you need a chatbot.

### Training on Brand Voice
Your AI should sound like your business, not like a generic computer.

### Handling Escalation
Never trap a customer in a loop. Always provide a clear way to talk to a human.
    `,
  },
  {
    slug: "marketing-attribution-simplified",
    title: "Marketing Attribution Simplified: What Small Businesses Actually Need",
    excerpt: "Skip the expensive enterprise tools. Here's a practical attribution setup that gives you the insights you need.",
    category: "Analytics",
    date: "2023-12-28",
    readTime: "7 min read",
    author: "FlyNerd Tech",
    content: `
## Why Attribution Matters

How do you know which marketing channel is actually driving revenue? Without attribution, you're just guessing.
    `,
  },
  {
    slug: "workflow-automation-roi",
    title: "Calculating the ROI of Workflow Automation",
    excerpt: "How to build a business case for automation investments with real numbers and honest expectations.",
    category: "AI Automation",
    date: "2023-12-20",
    readTime: "6 min read",
    author: "FlyNerd Tech",
    content: `
## Time Savings vs. Revenue Growth

Automation isn't just about saving time; it's about increasing capacity.
    `,
  },
];

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export const categories = ["All", "AI Automation", "Email Marketing", "Marketing Operations", "AI Agents", "Analytics"] as const;
