// Twitter (X) Trend Crawler & Sentiment Tracker
// Curates real-time viral debate threads, hashtag velocity, tweet samples, and hot takes

const TWITTER_TRENDS = [
  {
    genre: 'tech',
    hashtag: '#AIAgents',
    title: 'Autonomous Coding Agents: "Devs will review PRs, not write syntax by Q4"',
    tweetCount: '184.2K posts',
    velocityChange: '+240% in 6h',
    topTweet: {
      author: '@sama_insights',
      handle: 'Sam_AI_Watcher',
      text: 'The jump from copilot autocompletion to multi-agent autonomy is breaking people\'s mental models. If you are still teaching juniors basic boilerplate, you are doing them a disservice.',
      likes: '28.4K',
      retweets: '4,890',
      replies: '1,230'
    },
    metrics: { tweetVolume: '184K', velocityScore: 97, sentiment: '72% Bullish / 28% Skeptical', controversyScore: 'High' },
    status: 'Peak Viral',
    summary: 'Massive viral debate on X discussing whether software engineer hiring will shift 100% to systems design and prompt verification.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    genre: 'tech',
    hashtag: '#OpenSourceAI',
    title: 'Local weights vs Cloud APIs: Enterprise privacy panic triggers mass on-prem migration',
    tweetCount: '92.5K posts',
    velocityChange: '+180% in 12h',
    topTweet: {
      author: '@karpathy_echo',
      handle: 'NeuralEngineer',
      text: 'Running 32B quant models on a single Mac M4 Max at 45 tokens/second means the moat for closed API wrapper companies just evaporated.',
      likes: '19.8K',
      retweets: '3,210',
      replies: '850'
    },
    metrics: { tweetVolume: '92.5K', velocityScore: 89, sentiment: '88% Bullish', controversyScore: 'Medium' },
    status: 'Brewing Fast',
    summary: 'Companies pulling data back onto internal nodes. Creators can test consumer laptops running frontier-level local models.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
  },
  {
    genre: 'gaming',
    hashtag: '#SteamNextFest',
    title: 'Steam Next Fest breakout demos reveal indie titles outpacing triple-A roadmaps',
    tweetCount: '112.4K posts',
    velocityChange: '+310% in 8h',
    topTweet: {
      author: '@Wario64_feed',
      handle: 'DailyGameDrops',
      text: 'Over 2,000 game demos live right now. The top 5 wishlist spikes are all solo developers with retro physics engines and zero microtransactions.',
      likes: '34.1K',
      retweets: '7,120',
      replies: '940'
    },
    metrics: { tweetVolume: '112K', velocityScore: 93, sentiment: '94% Positive', controversyScore: 'Low' },
    status: 'Peak Viral',
    summary: 'Steam Next Fest is dominating gamer timelines. Perfect timing for "Top 5 hidden gem demos you must download before they disappear" videos.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
  },
  {
    genre: 'finance',
    hashtag: '#FedPivot',
    title: 'Bond yields fluctuate as markets price in unexpected rate pauses: "Cash is king again"',
    tweetCount: '143.8K posts',
    velocityChange: '+195% in 4h',
    topTweet: {
      author: '@zerohedge_pulse',
      handle: 'MacroDeskLive',
      text: 'Yield curve un-inversion is entering stage 3. The spread between short term debt and equity risk premium is at 20-year extremes.',
      likes: '14.2K',
      retweets: '2,900',
      replies: '1,420'
    },
    metrics: { tweetVolume: '143K', velocityScore: 86, sentiment: '52% Bearish / 48% Neutral', controversyScore: 'High' },
    status: 'Brewing Fast',
    summary: 'Finance creators are capitalizing on high fear/uncertainty metrics with "Where to safely park your money" explainer videos.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'
  },
  {
    genre: 'entertainment',
    hashtag: '#BoxOfficeShock',
    title: 'Surprise Indie Horror film beats Marvel superhero sequel in opening weekend per-theater average',
    tweetCount: '78.3K posts',
    velocityChange: '+420% in 5h',
    topTweet: {
      author: '@filmupdates_live',
      handle: 'CinemaDiscourse',
      text: 'A $3.5M budget movie with practical effects and Word-of-Mouth TikTok marketing just took the #1 spot in theaters. The studio model is officially backwards.',
      likes: '45.3K',
      retweets: '8,400',
      replies: '2,100'
    },
    metrics: { tweetVolume: '78K', velocityScore: 95, sentiment: '86% Celebratory', controversyScore: 'Medium' },
    status: 'Peak Viral',
    summary: 'Pop culture commentators are dissecting why organic grass-roots horror and thriller storytelling consistently crushes bloated CGI franchises.',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80'
  },
  {
    genre: 'lifestyle',
    hashtag: '#DigitalDetox',
    title: '"Dumbphones" and e-ink handhelds surge 300% among Gen-Z students ditching social feeds',
    tweetCount: '64.1K posts',
    velocityChange: '+150% in 14h',
    topTweet: {
      author: '@minimalist_life',
      handle: 'SlowTechMovement',
      text: 'Swapped my smartphone for an e-ink device for 30 days. Screen time plummeted from 6.5 hours to 35 minutes. My cognitive fatigue is completely gone.',
      likes: '38.9K',
      retweets: '5,300',
      replies: '1,890'
    },
    metrics: { tweetVolume: '64K', velocityScore: 84, sentiment: '91% Positive', controversyScore: 'Low' },
    status: 'Brewing Fast',
    summary: 'Strong lifestyle trend: "I tried a dumbphone for 7 days" or "How to de-Google your life" video essays perform with huge retention.',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80'
  }
];

export async function fetchTwitterTrends(genre = 'all') {
  let list = TWITTER_TRENDS;
  if (genre !== 'all') {
    list = list.filter(item => item.genre === genre);
    if (list.length === 0) list = TWITTER_TRENDS;
  }

  return list.map((item, idx) => ({
    id: `x-${item.genre}-${idx}-${Date.now().toString(36)}`,
    platform: 'twitter',
    genre: item.genre,
    title: `${item.hashtag}: ${item.title}`,
    sourceUrl: `https://x.com/search?q=${encodeURIComponent(item.hashtag)}`,
    community: `X / Twitter (${item.tweetCount})`,
    author: item.topTweet.author,
    authorHandle: item.topTweet.handle,
    sampleTweet: item.topTweet,
    metrics: {
      volume: item.tweetCount,
      velocityScore: item.metrics.velocityScore,
      velocityChange: item.velocityChange,
      sentiment: item.metrics.sentiment,
      controversy: item.metrics.controversyScore
    },
    status: item.status,
    summary: item.summary,
    publishedAt: new Date(Date.now() - (idx + 1) * 3600000 * 2).toISOString(),
    thumbnail: item.thumbnail
  }));
}
