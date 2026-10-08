# TrendPulse — Multi-Platform Trend Feed & Content Strategy OS for Creators

**TrendPulse** is an intelligence radar built specifically for content creators. It continuously crawls **YouTube, X (Twitter), Instagram, and Reddit** for brewing, viral, and high-velocity topics, filters them by creator niche, and generates production-ready video titles, hooks, script outlines, and thumbnail concepts.

---

## ⚡ Key Features

### 1. Multi-Platform Autonomous Crawlers
- **YouTube Radar**: Surging search breakouts via Google Trends RSS & curated breakout videos with view velocity, duration, channel metadata, and proven sample hooks.
- **X (Twitter) Discourse**: Real-time trending hashtags, post volumes, velocity spikes (e.g. `+240% in 6h`), rendered top tweet arguments, and controversy meters.
- **Instagram Reels Radar**: Trending audio tracks (with reel adoption count), viral video format blueprints (e.g. "Before/After comparison", "Anti-glamour solo founder"), and save rates.
- **Reddit Community Sentiment**: Live RSS feeds across targeted subreddits (`r/technology`, `r/artificial`, `r/gaming`, `r/wallstreetbets`, `r/popculturechat`, `r/fitness`, `r/productivity`), tracking upvotes, comment debates, and contrarian angles.

### 2. Niche & Velocity Filtering
- **Niches Supported**:
  - 💻 Tech & AI
  - 🎮 Gaming & Esports
  - 💰 Finance & Markets
  - 🎬 Cinema & Pop Culture
  - ⚡ Fitness & Nutrition
  - ☕ Lifestyle & Productivity
- **Velocity Stage Detection**:
  - **🔥 Peak Viral (90%+)**: Maximum immediate reach, trending everywhere right now.
  - **⚡ Brewing Fast (60-89%)**: The creator sweet spot — early enough to publish before competition saturates the topic.
  - **🌱 Early Spark (<60%)**: Under-the-radar topics emerging in niche subreddits and threads.

### 3. AI Creator Strategy Engine
Click **"Generate Video Strategy"** on any trend card to immediately unlock:
1. **3 High-CTR Title Options**:
   - *Curiosity Gap / Intrigue*
   - *Direct Value / How-To*
   - *Contrarian / Hot Take* (drives comment arguments)
2. **3-Second Scroll-Stopping Hooks**:
   - Spoken script line
   - Physical visual camera action (e.g., hold object to lens, cut to chart within 1.2s)
   - On-screen typography overlay
3. **5-Beat Script Outline**:
   - `[0:00 - 0:15]` Pattern Interrupt
   - `[0:15 - 1:30]` Brewing Context & Stakes
   - `[1:30 - 5:00]` Deep-Dive Teardown
   - `[5:00 - 8:30]` Common Mistake to Avoid
   - `[8:30 - 10:00]` Actionable Takeaway & Retention CTA
4. **Thumbnail Blueprint**:
   - Visual scene composition, main text badge, and high-contrast color palette recommendations.
5. **Audience Demographics & Retention Secrets**.
6. **One-Click Markdown Brief Export**.

### 4. Creator Studio & Production Kanban
- Save concepts straight from the trend feed into your private workspace backlog.
- Move concepts through production stages:
  - 💡 **Idea / Backlog**
  - ✍️ **Scripting**
  - 🎬 **Ready to Record**
  - ✅ **Published**
- Add custom video ideas and notes directly into the board.

---

## 🚀 Running the App

### Start both Backend & Frontend concurrently:
```bash
cd /Users/arnavrameshmv/.gemini/antigravity/scratch/trend-feed-app
npm run start
```

- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5001](http://localhost:5001)

### API Endpoints
- `GET /api/trends?genre={genre}&platform={platform}&status={status}&search={query}`: Filtered trend feed.
- `POST /api/trends/refresh`: Trigger manual re-crawl across all 4 platforms.
- `POST /api/ideas/generate`: Generate 3 title variants, hooks, and script outline for any topic.
- `GET /api/saved-ideas`: Creator studio backlog items.
- `POST /api/saved-ideas`: Save video idea to backlog.
- `PATCH /api/saved-ideas/:id`: Update idea production status.
- `DELETE /api/saved-ideas/:id`: Remove idea from backlog.
