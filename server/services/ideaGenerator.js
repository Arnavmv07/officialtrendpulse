// AI Idea Engine & Content Strategy Generator for Content Creators

export function generateCreatorStrategy(trend, customPreferences = {}) {
  const genre = trend.genre || 'tech';
  const platform = trend.platform || 'youtube';
  const title = trend.title || 'Surging Topic';
  const tone = customPreferences.tone || 'engaging'; // 'analytical', 'controversial', 'entertaining', 'educational'

  // Extract core subject keyword
  const cleanSubject = title
    .replace(/^Search Surge:\s*"/i, '')
    .replace(/^#\w+:\s*/i, '')
    .replace(/\"/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();

  // Generate 3 High-Impact Title Concepts
  const titleVariants = [
    {
      style: 'Curiosity Gap / Intrigue',
      title: `The Dangerous Truth About ${cleanSubject} Nobody Mentions`,
      hookRating: 94,
      whyItWorks: 'Taps into fear of missing out and skepticism against mainstream consensus.'
    },
    {
      style: 'Direct Value / How-To',
      title: `How to Leverage ${cleanSubject} Before It Gets Saturated (2026 Guide)`,
      hookRating: 89,
      whyItWorks: 'Clear utility for viewers wanting immediate competitive advantage.'
    },
    {
      style: 'Contrarian / Hot Take',
      title: `Why 99% of People Are Completely Wrong About ${cleanSubject}`,
      hookRating: 97,
      whyItWorks: 'High cognitive dissonance creates immediate click-through and lively comment debates.'
    }
  ];

  // 0-5s Scroll-Stopping Hook Script
  const hooks = {
    shortForm: {
      spokenHook: `Wait, before you scroll—if you think ${cleanSubject} is just hype, look at what happened in the last 24 hours.`,
      visualAction: 'Hold phone or object directly towards camera lens, cut quickly to a highlighted red metric screenshot within 1.2 seconds.',
      textOnScreen: `⚠️ STOP DOING THIS with ${cleanSubject.slice(0, 20)}...`
    },
    longForm: {
      spokenHook: `In the next 10 minutes, I’m going to show you why ${cleanSubject} is about to disrupt everything we thought we knew about ${genre}.`,
      visualAction: 'Direct high-energy talking head, fast B-roll montage with dynamic sound design hits on every word.',
      textOnScreen: `The 2026 Shift Nobody Predicted`
    }
  };

  // 5-Point Production Outline Blueprint
  const outline = [
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
  ];

  // Thumbnail Composition Strategy
  const thumbnailConcept = {
    visualDescription: `Split composition: Left side shows dark moody background with glowing contrast element; right side shows expressive creator reaction (raised eyebrow or laser focus, NOT open mouth scream).`,
    mainTextOverlay: `IT CHANGED EVERYTHING.`,
    colorPalette: 'High contrast Cyber Blue (#00F0FF) and Hazard Yellow (#FFD600) on obsidian dark gradient',
    ctrScore: 92
  };

  // Viral Angles by Format
  const formats = [
    {
      format: 'YouTube Long-Form (8-14 mins)',
      suitability: 'Very High (High AdSense CPM & Authority Building)',
      estimatedRetention: '64 - 72%',
      recommendedPacing: 'Fast intro, steady chapter marks, B-roll every 4-6 seconds'
    },
    {
      format: 'Shorts / Reels / TikTok (30-55s)',
      suitability: 'Explosive (Rapid subscriber acquisition & discovery)',
      estimatedRetention: '85 - 110%',
      recommendedPacing: '1 sentence per cut, continuous background movement, seamless audio loop'
    }
  ];

  return {
    trendId: trend.id,
    generatedAt: new Date().toISOString(),
    topic: cleanSubject,
    genre: genre,
    viralPotentialScore: Math.floor(Math.random() * 8 + 91), // 91-98
    opportunityWindow: 'High (Next 48 to 72 hours before mass channel coverage)',
    recommendedTone: tone,
    titleVariants,
    hooks,
    outline,
    thumbnailConcept,
    formats,
    targetAudience: {
      demographic: getDemographicForGenre(genre),
      viewerPainPoint: `Wanting to stay ahead of the curve without wasting hours filtering noise on social media.`,
      retentionSecret: `Give them an immediate mental model they can share with their friends or peers.`
    }
  };
}

function getDemographicForGenre(genre) {
  switch (genre) {
    case 'tech': return 'Tech professionals, curious devs, early adopters & AI enthusiasts (Ages 18-40)';
    case 'gaming': return 'PC & console gamers, indie game fans, gaming tech nerds (Ages 16-35)';
    case 'finance': return 'Retail investors, young earners, side-hustlers & financial freedom seekers (Ages 22-45)';
    case 'entertainment': return 'Movie buffs, pop-culture followers, streaming fans (Ages 16-38)';
    case 'fitness': return 'Gym-goers, health optimizers, science-based training enthusiasts (Ages 18-36)';
    case 'lifestyle': return 'Solopreneurs, students, focus & productivity seekers (Ages 20-38)';
    default: return 'Online creators & digital natives (Ages 18-40)';
  }
}
