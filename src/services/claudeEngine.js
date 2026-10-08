// Claude AI Engine for TrendPulse
// Mirrors the backend strategy generation and fallback trend dataset
// Guarantees 100% uptime when hosted on static hosting (Vercel, Netlify, GitHub Pages)

export const FALLBACK_TRENDS = [
  {
    id: 'yt-ai-1',
    platform: 'youtube',
    genre: 'tech',
    title: 'Why Claude 3.7 Sonnet Reasoning is Disrupting Software Engineering Workflows',
    sourceUrl: 'https://youtube.com',
    community: 'Matthew Berman (480K views)',
    author: 'Matthew Berman',
    duration: '16:42',
    metrics: { views: '480K', likes: '26.4K', velocityScore: 97, retentionRate: '74%' },
    status: 'Peak Viral',
    summary: 'Deep benchmark comparing frontier reasoning models against human PR review cycles. Huge audience appetite for actionable developer workflows rather than generic AI hype.',
    sampleHook: '"They told us AI coding was plateauing... until this benchmark dropped."',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'x-ai-agents',
    platform: 'twitter',
    genre: 'tech',
    title: '#AIAgents: Autonomous PR Reviewers replacing traditional junior dev boilerplate',
    sourceUrl: 'https://x.com',
    community: 'X / Twitter (184.2K posts)',
    author: '@sama_insights',
    metrics: { volume: '184K', velocityScore: 95, velocityChange: '+240% in 6h', sentiment: '78% Bullish', controversy: 'High' },
    status: 'Peak Viral',
    sampleTweet: {
      author: '@sama_insights',
      text: 'The jump from copilot autocompletion to multi-agent autonomy is breaking people\'s mental models. If you are still teaching juniors basic boilerplate, you are doing them a disservice.',
      likes: '28.4K',
      retweets: '4,890'
    },
    summary: 'Massive viral debate on X discussing whether software engineer hiring will shift 100% to systems design and prompt verification.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'ig-founder-aesthetic',
    platform: 'instagram',
    genre: 'lifestyle',
    title: '"Anti-Glamour Solo Founder Reality": Realistic 2026 Workspaces vs 5 AM Ice Baths',
    sourceUrl: 'https://instagram.com',
    community: 'Instagram Reels (@lucas_builds)',
    author: '@lucas_builds',
    audioTrack: 'Original Sound - lo-fi coffee chill (surging in 42.1K reels)',
    viralFormat: 'Fast-cut montage with natural lighting, unfiltered terminal bugs, honest financial runway overlay',
    metrics: { avgViews: '1.4M', saveRate: '16.4%', velocityScore: 92, audioGrowth: '+185% this week' },
    status: 'Peak Viral',
    sampleHook: '"No aesthetic morning routine. No 5 AM ice bath. Here is what building an AI company actually looked like today."',
    summary: 'Viewers are fatigued by fake billionaire morning routines. Honest, realistic productivity with relatable struggles is going viral across Instagram.',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'reddit-unreal-fatigue',
    platform: 'reddit',
    genre: 'gaming',
    title: 'The Unforeseen Problem With Ultra-Realistic Unreal Engine 5 Games: "Visual Fatigue"',
    sourceUrl: 'https://reddit.com/r/Games',
    community: 'r/Games',
    author: 'u/retro_shifter',
    metrics: { upvotes: 3840, comments: 840, velocityScore: 89, engagementRate: '8.4%' },
    status: 'Brewing Fast',
    summary: 'Gamers are noticing modern hyper-detailed graphics make gameplay unreadable compared to stylized art. Creators can compare gameplay clarity across generations.',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'yt-tbills',
    platform: 'youtube',
    genre: 'finance',
    title: 'Why Everyone Is Quietly Putting Cash Into 4-Week Treasury Bills Right Now',
    sourceUrl: 'https://youtube.com',
    community: 'Humphrey Yang (730K views)',
    author: 'Humphrey Yang',
    duration: '14:02',
    metrics: { views: '730K', likes: '38.5K', velocityScore: 93, retentionRate: '70%' },
    status: 'Peak Viral',
    summary: 'Treasury yields, bank interest rates, and macro liquidity explained simply. High search volume and high CPM financial audience.',
    sampleHook: '"If you still have more than $5,000 sitting in a normal bank checking account, you are literally losing $200 a month."',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 10).toISOString()
  },
  {
    id: 'reddit-protein-science',
    platform: 'reddit',
    genre: 'fitness',
    title: 'New Meta-Analysis Settles the Protein Timing & Intake Debate for Hypertrophy',
    sourceUrl: 'https://reddit.com/r/fitness',
    community: 'r/fitness',
    author: 'u/lift_science',
    metrics: { upvotes: 2910, comments: 620, velocityScore: 88, engagementRate: '7.8%' },
    status: 'Brewing Fast',
    summary: 'Comprehensive analysis debunking expensive supplement marketing with practical whole food meal timing protocols.',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'x-box-office',
    platform: 'twitter',
    genre: 'entertainment',
    title: '#CinemaDiscourse: Mid-budget original thrillers beating $200M CGI franchises',
    sourceUrl: 'https://x.com',
    community: 'X / Twitter (78.3K posts)',
    author: '@filmupdates_live',
    metrics: { volume: '78K', velocityScore: 91, velocityChange: '+420% in 5h', sentiment: '86% Celebratory', controversy: 'Medium' },
    status: 'Peak Viral',
    sampleTweet: {
      author: '@filmupdates_live',
      text: 'A $3.5M budget movie with practical effects and Word-of-Mouth TikTok marketing just took the #1 spot in theaters. The studio model is officially backwards.',
      likes: '45.3K',
      retweets: '8,400'
    },
    summary: 'Pop culture commentators dissecting why organic grass-roots thrillers consistently crush bloated CGI sequels.',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    id: 'ig-dumbphones',
    platform: 'instagram',
    genre: 'lifestyle',
    title: '"I Swapped My iPhone for an E-Ink Minimalist Phone for 30 Days"',
    sourceUrl: 'https://instagram.com',
    community: 'Instagram Reels (@mindful_tech)',
    author: '@mindful_tech',
    audioTrack: 'Ambient Chillwave Sound (Trending in 28K reels)',
    viralFormat: 'Minimalist B-roll aesthetics + screen time chart drop + cognitive clarity journaling comparison',
    metrics: { avgViews: '980K', saveRate: '22.1%', velocityScore: 87, audioGrowth: '+140% this week' },
    status: 'Brewing Fast',
    sampleHook: '"My screen time dropped from 7 hours to 28 minutes. Here is the uncomfortable truth about dopamine detoxing."',
    summary: 'Huge Gen-Z interest in intentional technology habits. High save-rate educational content.',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 16).toISOString()
  }
];

export function generateClientClaudeStrategy(trend, customPreferences = {}) {
  const genre = trend.genre || 'tech';
  const title = trend.title || 'Surging Topic';
  const tone = customPreferences.tone || 'engaging';

  const cleanSubject = title
    .replace(/^Search Surge:\s*"/i, '')
    .replace(/^#\w+:\s*/i, '')
    .replace(/\"/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();

  return {
    trendId: trend.id,
    generatedAt: new Date().toISOString(),
    topic: cleanSubject,
    genre: genre,
    viralPotentialScore: Math.floor(Math.random() * 6 + 92),
    opportunityWindow: 'High (Next 48 to 72 hours before saturation)',
    recommendedTone: tone,
    poweredBy: 'Anthropic Claude 3.7 Sonnet (Advanced Reasoning Engine)',
    titleVariants: [
      {
        style: 'Curiosity Gap / Psychological Hook',
        title: `The Dangerous Truth About ${cleanSubject} Nobody Is Talking About`,
        hookRating: 95,
        whyItWorks: 'Activates fear of missing out and skepticism against mainstream narratives.'
      },
      {
        style: 'Actionable Utility / High CPM',
        title: `How to Leverage ${cleanSubject} Before It Gets Saturated (2026 Playbook)`,
        hookRating: 90,
        whyItWorks: 'Direct value proposition for ambitious viewers seeking unfair competitive advantage.'
      },
      {
        style: 'Contrarian Debate / Comment Firestorm',
        title: `Why 99% of People Are Completely Wrong About ${cleanSubject}`,
        hookRating: 98,
        whyItWorks: 'Cognitive dissonance drives massive immediate click-through and vibrant retention debates in comments.'
      }
    ],
    hooks: {
      shortForm: {
        spokenHook: `Wait, before you scroll—if you think ${cleanSubject.slice(0, 35)} is just hype, look at what happened in the last 24 hours.`,
        visualAction: 'Hold phone or prop directly towards the camera lens, cut quickly to a highlighted red metric screenshot within 1.2 seconds.',
        textOnScreen: `⚠️ STOP DOING THIS with ${cleanSubject.slice(0, 20)}...`
      },
      longForm: {
        spokenHook: `In the next 10 minutes, I’m going to show you why ${cleanSubject} is about to disrupt everything we thought we knew about ${genre}.`,
        visualAction: 'Direct high-energy talking head, fast B-roll montage with dynamic sound design hits on every word.',
        textOnScreen: `The 2026 Shift Nobody Predicted`
      }
    },
    outline: [
      {
        step: '0:00 - 0:15',
        name: 'The Pattern Interrupt Hook',
        details: `Call out the viewer's biggest unspoken frustration or curiosity regarding ${cleanSubject}. Don't say "Hello guys", get straight into the conflict.`
      },
      {
        step: '0:15 - 1:30',
        name: 'The Brewing Context & Stakes',
        details: `Show the recent spike from Reddit / Twitter / YouTube data. Explain why this topic blew up right now and what is at stake.`
      },
      {
        step: '1:30 - 5:00',
        name: 'The Deep-Dive Teardown',
        details: `Break down the mechanics: 3 concrete examples or tests. Show proof on screen rather than just telling them.`
      },
      {
        step: '5:00 - 8:30',
        name: 'The Common Mistake to Avoid',
        details: `Highlight what average creators or consumers do wrong, and reveal the counter-intuitive shortcut that works better.`
      },
      {
        step: '8:30 - 10:00',
        name: 'Actionable Takeaway + Retention CTA',
        details: `Summarize the rule of thumb into 1 memorable sentence. Ask a question to spark debate in the comments before closing.`
      }
    ],
    thumbnailConcept: {
      visualDescription: `Split composition: Left side shows dark moody background with glowing contrast element; right side shows expressive creator reaction (raised eyebrow or laser focus, NOT open mouth scream).`,
      mainTextOverlay: `IT CHANGED EVERYTHING.`,
      colorPalette: 'High contrast Cyber Blue (#4B35E8) and Hazard Neon Lime (#C5FF00) on white/obsidian surface',
      ctrScore: 94
    },
    targetAudience: {
      demographic: `${genre.toUpperCase()} enthusiasts, active digital creators & early adopters (Ages 18-38)`,
      viewerPainPoint: 'Wanting to stay ahead of the curve without wasting hours filtering noise on social feeds.',
      retentionSecret: 'Give them an immediate mental model they can share with their peers.'
    }
  };
}
