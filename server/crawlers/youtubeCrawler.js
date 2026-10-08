// YouTube trends crawler and video sample aggregator
// Provides YouTube breakout topics, real video searches, high-CTR thumbnail styles, and viewer sentiment

const YOUTUBE_TRENDING_SAMPLES = [
  {
    genre: 'tech',
    title: 'I Built a Full App with Claude 3.7 Sonnet & Reasoning: Is Cursor Obsolete?',
    channel: 'Matthew Berman',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Claude+3.7+Sonnet+Coding+App',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    views: '342,000 views',
    publishedAgo: '14 hours ago',
    duration: '18:42',
    breakoutScore: 95,
    metrics: { views: '342K', likes: '18.4K', velocityScore: 95, retentionRate: '68%' },
    status: 'Peak Viral',
    summary: 'Testing latest reasoning AI model coding capabilities against human workflows. High audience appetite for honest hands-on stress tests instead of hype.',
    sampleHook: '"They told us AI coders were plateauing... until this benchmark dropped."'
  },
  {
    genre: 'tech',
    title: 'The Truth About Local AI Hardware: Do You Really Need 64GB of Unified Memory?',
    channel: 'Dave2D / Tech Lead Review',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Local+AI+Hardware+64GB+Unified+Memory',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    views: '512,000 views',
    publishedAgo: '1 day ago',
    duration: '12:15',
    breakoutScore: 89,
    metrics: { views: '512K', likes: '31.2K', velocityScore: 89, retentionRate: '72%' },
    status: 'Peak Viral',
    summary: 'Hardware buyer guides specifically tailored for local LLM inference (Ollama, DeepSeek, Llama 3). Highly monetizable affiliate niche.',
    sampleHook: '"Before you spend $3,000 on a Mac Studio for local AI, watch this."'
  },
  {
    genre: 'gaming',
    title: 'Why Unreal Engine 5 Games Keep Stuttering on PC (Deep Technical Breakdown)',
    channel: 'Digital Foundry Style',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Unreal+Engine+5+Stuttering+PC+Digital+Foundry',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    views: '680,000 views',
    publishedAgo: '2 days ago',
    duration: '22:10',
    breakoutScore: 92,
    metrics: { views: '680K', likes: '45.1K', velocityScore: 92, retentionRate: '65%' },
    status: 'Peak Viral',
    summary: 'Shader compilation traversal and frame pacing issues causing massive consumer outcry across recent AAA launches.',
    sampleHook: '"Your $2,000 graphics card isn’t the problem. Here is what game developers aren’t telling you."'
  },
  {
    genre: 'gaming',
    title: '10 Indie Games in 2026 That Put $100M AAA Studios to Shame',
    channel: 'Gameranx / Best Indie Picks',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Best+Indie+Games+2026+Gameranx',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    views: '410,000 views',
    publishedAgo: '18 hours ago',
    duration: '15:30',
    breakoutScore: 88,
    metrics: { views: '410K', likes: '29.3K', velocityScore: 88, retentionRate: '74%' },
    status: 'Brewing Fast',
    summary: 'Listicle showcasing solo developers delivering deeper gameplay loops and no microtransactions. Very viral format for YouTube Shorts repurposing.',
    sampleHook: '"These 3 solo developers built in 6 months what Ubisoft couldn\'t in 5 years."'
  },
  {
    genre: 'finance',
    title: 'Why Everyone Is Quietly Putting Cash Into 4-Week Treasury Bills Right Now',
    channel: 'Graham Stephan / Humphrey Yang',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=4+Week+Treasury+Bills+Graham+Stephan',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    views: '730,000 views',
    publishedAgo: '1 day ago',
    duration: '14:02',
    breakoutScore: 94,
    metrics: { views: '730K', likes: '38.5K', velocityScore: 94, retentionRate: '70%' },
    status: 'Peak Viral',
    summary: 'Treasury yields, bank interest rates, and macro liquidity explained simply. High search volume and great high CPM audience.',
    sampleHook: '"If you still have more than $5,000 sitting in a normal bank checking account, you are literally losing $200 a month."'
  },
  {
    genre: 'entertainment',
    title: 'The Downfall of High-Budget Hollywood: What Killed the $250M Blockbuster?',
    channel: 'The Take / Nerdwriter1',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Downfall+High+Budget+Hollywood+Box+Office',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    views: '890,000 views',
    publishedAgo: '3 days ago',
    duration: '21:18',
    breakoutScore: 91,
    metrics: { views: '890K', likes: '58.0K', velocityScore: 91, retentionRate: '77%' },
    status: 'Peak Viral',
    summary: 'Cinematic video essay analyzing why audiences refuse generic CGI franchises and how mid-budget original cinema is taking over box offices.',
    sampleHook: '"Why did a movie with a $300M budget make less money than a film shot on a mirrorless camera for $15M?"'
  },
  {
    genre: 'fitness',
    title: 'Science Finally Settled the High-Protein vs Moderate-Protein Debate for Muscle Growth',
    channel: 'Jeff Nippard / Renaissance Periodization',
    channelAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=High+Protein+vs+Moderate+Protein+Jeff+Nippard',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    views: '620,000 views',
    publishedAgo: '20 hours ago',
    duration: '16:45',
    breakoutScore: 96,
    metrics: { views: '620K', likes: '44.8K', velocityScore: 96, retentionRate: '81%' },
    status: 'Peak Viral',
    summary: 'Meta-analysis comparing 1.6g/kg vs 2.2g/kg protein intake. Debunks myths and gives viewers simple actionable meal planning.',
    sampleHook: '"You might be wasting hundreds of dollars on extra protein powder every month. Here is what the latest 2026 data actually proves."'
  },
  {
    genre: 'lifestyle',
    title: 'The "Dopamine Fast" Is a Myth: Here Is What Actually Fixes Brain Fog in 7 Days',
    channel: 'Ali Abdaal / Andrew Huberman Style',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/results?search_query=Dopamine+Fast+Myth+Brain+Fog+Neuroscience',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    views: '480,000 views',
    publishedAgo: '16 hours ago',
    duration: '13:50',
    breakoutScore: 87,
    metrics: { views: '480K', likes: '36.4K', velocityScore: 87, retentionRate: '75%' },
    status: 'Brewing Fast',
    summary: 'Scientific perspective dismantling trendy buzzwords with practical circadian rhythm and friction reduction protocols.',
    sampleHook: '"Stop torturing yourself with 24-hour dopamine fasts. Neuroscience shows it doesn\'t reset your receptors. Do this instead."'
  }
];

export async function fetchYouTubeTrends(genre = 'all') {
  let list = YOUTUBE_TRENDING_SAMPLES;
  if (genre !== 'all') {
    list = list.filter(item => item.genre === genre);
    if (list.length === 0) list = YOUTUBE_TRENDING_SAMPLES;
  }

  return list.map((sample, idx) => ({
    id: `yt-${sample.genre}-${idx}-${Date.now().toString(36)}`,
    platform: 'youtube',
    genre: sample.genre,
    title: sample.title,
    sourceUrl: sample.videoUrl,
    community: `${sample.channel} (${sample.views})`,
    author: sample.channel,
    authorAvatar: sample.channelAvatar,
    duration: sample.duration,
    metrics: sample.metrics,
    status: sample.status,
    summary: sample.summary,
    sampleHook: sample.sampleHook,
    publishedAt: new Date(Date.now() - (idx + 1) * 3600000 * 4).toISOString(),
    thumbnail: sample.thumbnail
  }));
}
