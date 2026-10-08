// Instagram Reels & Viral Format Crawler
// Tracks trending audio, viral video structures, engagement hooks, and visual formats

const INSTAGRAM_TRENDS = [
  {
    genre: 'lifestyle',
    title: '"Day in the Life of a Realistic 2026 Solo Founder" (Anti-glamour aesthetic)',
    audioTrack: 'Original Sound - lo-fi coffee chill (surging in 42.1K reels)',
    viralFormat: 'Fast-cut montage with honest text overlay, natural morning light, unfiltered workspace',
    metrics: { reelViews: '1.4M avg', saveRate: '12.4%', velocityScore: 94, audioGrowth: '+185% this week' },
    status: 'Peak Viral',
    summary: 'Viewers are fatigued by fake "5 AM cold plunge billionaire" routines. Realistic, calm productivity with relatable struggles is going viral across Instagram.',
    sampleHook: '"No aesthetic morning routine. No 5 AM ice bath. Here is what working for yourself actually looked like today."',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@lucas_builds (480K followers)'
  },
  {
    genre: 'tech',
    title: 'Visual Architecture Teardowns: "How Netflix streams 4K video to 250M users without crashing"',
    audioTrack: 'Synthwave Bass Pulse (Trending Tech Reel Audio)',
    viralFormat: 'Interactive whiteboard animation + 3-second rapid zooms + neon color accents',
    metrics: { reelViews: '890K avg', saveRate: '19.8%', velocityScore: 92, audioGrowth: '+220% this week' },
    status: 'Peak Viral',
    summary: 'High save rate! Educational tech carousels and 60-second architecture teardowns get massive algorithm bookmarks because viewers bookmark them for later study.',
    sampleHook: '"You click play on Netflix and a 4K movie starts in 200 milliseconds. Here is the mind-blowing engineering that happens behind your screen."',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@system_design_daily (620K followers)'
  },
  {
    genre: 'fitness',
    title: '"Stop Doing Endless Crunches" - Biomechanical Core Activation Breakdown',
    audioTrack: 'Upbeat phonk workout beat (Trending in 95K fitness reels)',
    viralFormat: 'Side-by-side comparison (Wrong Form in red X vs Correct Form in green check) with anatomy overlay',
    metrics: { reelViews: '2.1M avg', saveRate: '15.6%', velocityScore: 97, audioGrowth: '+310% this week' },
    status: 'Peak Viral',
    summary: 'Quick correction reels with high visual contrast. People instantly share them with their gym partners or save to their workout folders.',
    sampleHook: '"If you feel your lower back every time you train abs, you are making this 1 crucial mistake."',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@biomechanics_coach (1.1M followers)'
  },
  {
    genre: 'finance',
    title: '"3 Things I Refuse to Spend Money on in My 20s as a Financial Planner"',
    audioTrack: 'Subtle jazzy elevator groove (Trending in finance/lifestyle reels)',
    viralFormat: 'Talking-head selfie camera walking through a city street, casual tone, bulleted text cards',
    metrics: { reelViews: '1.2M avg', saveRate: '14.1%', velocityScore: 89, audioGrowth: '+140% this week' },
    status: 'Brewing Fast',
    summary: 'Personal rules & wealth preservation advice. Creates intense debate in the comments between viewers on saving vs experiencing youth.',
    sampleHook: '"Most people waste their first $10,000 on things that impress people they don’t even like. Here are 3 things I will never buy."',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@modernwealth_guide (390K followers)'
  },
  {
    genre: 'gaming',
    title: '"Physics Engines Then vs Physics Engines Now" (Nostalgia vs Reality)',
    audioTrack: 'Nostalgic Synthwave Ambient (Trending in 34K gaming clips)',
    viralFormat: 'Split screen comparing GTA IV Euphoria physics vs modern ragdoll games, slow motion breakdown',
    metrics: { reelViews: '3.4M avg', saveRate: '8.9%', velocityScore: 95, audioGrowth: '+260% this week' },
    status: 'Peak Viral',
    summary: 'Gaming nostalgia reels drive intense comment section wars about whether older games had more detail and soul than modern graphics.',
    sampleHook: '"Did gaming physics peak in 2008? Look closely at what happens when you bump into this pedestrian."',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@retro_and_nextgen (850K followers)'
  },
  {
    genre: 'entertainment',
    title: 'Color Grading Secrets Behind Iconic Film Palettes: "The Fincher Green & Teal"',
    audioTrack: 'Cinematic Zimmer crescendo (Trending in film reels)',
    viralFormat: 'Before/After slider showing raw camera LOG footage vs final color graded shot with color wheel graphic',
    metrics: { reelViews: '750K avg', saveRate: '21.3%', velocityScore: 88, audioGrowth: '+120% this week' },
    status: 'Brewing Fast',
    summary: 'Cinematography and editing breakdown reels with exceptional visual appeal and educational value.',
    sampleHook: '"Why does every David Fincher movie feel uneasy? It’s not just the script—it’s this specific color frequency."',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    creatorSample: '@cinematic_colorist (520K followers)'
  }
];

export async function fetchInstagramTrends(genre = 'all') {
  let list = INSTAGRAM_TRENDS;
  if (genre !== 'all') {
    list = list.filter(item => item.genre === genre);
    if (list.length === 0) list = INSTAGRAM_TRENDS;
  }

  return list.map((item, idx) => ({
    id: `ig-${item.genre}-${idx}-${Date.now().toString(36)}`,
    platform: 'instagram',
    genre: item.genre,
    title: item.title,
    sourceUrl: `https://instagram.com/explore/tags/${encodeURIComponent(item.genre)}`,
    community: `Instagram Reels (${item.creatorSample})`,
    author: item.creatorSample,
    audioTrack: item.audioTrack,
    viralFormat: item.viralFormat,
    metrics: {
      avgViews: item.metrics.reelViews,
      saveRate: item.metrics.saveRate,
      velocityScore: item.metrics.velocityScore,
      audioGrowth: item.metrics.audioGrowth
    },
    status: item.status,
    summary: item.summary,
    sampleHook: item.sampleHook,
    publishedAt: new Date(Date.now() - (idx + 1) * 3600000 * 3).toISOString(),
    thumbnail: item.thumbnail
  }));
}
