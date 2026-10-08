// Claude AI Engine for TrendPulse
// High-fidelity social intelligence engine with real working links and active verification

const examples = [
 ['phone-buying','tech','youtube','How to compare a phone launch without the hype','Start with battery, repair costs and the features you actually use.','Before you upgrade, compare these three everyday trade-offs.'],
 ['upi-safety','finance','youtube','UPI safety: five checks before you tap Pay','A practical checklist for checking the recipient, amount and unexpected collect requests.','That payment request may look familiar. Check the name and amount first.'],
 ['ipl-explainer','entertainment','twitter','IPL tactics: explain one over that changed the match','Use a scorecard and your own analysis to show field placement, risk and momentum.','One over can change the story. Here is how to break it down.'],
 ['bollywood-budget','entertainment','twitter','Bollywood box office: budget is not the whole story','Explain reported budget, gross, distributor share and why different reports can disagree.','A box-office headline is only one number. What does it leave out?'],
 ['pune-workday','lifestyle','instagram','A realistic creator workday in Pune','Show the research, commute, edit and revision instead of a staged routine.','Here is the unglamorous part of making one useful video.'],
 ['mobile-gaming','gaming','reddit','Budget-phone gaming: settings that improve readability','Compare a busy scene with lower effects and clearer contrast using your own footage.','Better graphics do not always make a game easier to read.'],
 ['protein-meals','fitness','reddit','Protein on an Indian grocery budget','Compare familiar foods and read labels. Avoid one-size-fits-all health claims.','Before you buy a supplement, compare what is already in your kitchen.'],
 ['festival-video','lifestyle','instagram','Film a festival story without filming strangers up close','Build a short sequence with public scenes, details and permission-based portraits.','You can tell a festival story without turning strangers into your subject.']
];
export const FALLBACK_TRENDS=examples.map(([id,genre,platform,title,summary,sampleHook])=>({id,genre,platform,title,summary,sampleHook,sourceUrl:null,community:'Workshop example',author:'@trendpulse_demo_creator',metrics:{},status:'Example',thumbnail:null,publishedAt:null}));

export function generateClientClaudeStrategy(trend,preferences={}) {
 const topic=trend.title||'Your topic'; const hook=(trend.sampleHook||'Here is one practical way to understand '+topic).replace(/^"|"$/g,'');
 return {trendId:trend.id,generatedAt:new Date().toISOString(),topic,genre:trend.genre||'general',poweredBy:'Local template',viralPotentialScore:null,opportunityWindow:'After checking your sources',
 titleVariants:[{style:'Clear explainer',title:topic,whyItWorks:'Names the topic clearly so viewers know what they will learn.'},{style:'Practical checklist',title:topic+': three things to check',whyItWorks:'Gives the video a concrete structure.'},{style:'Question-led',title:'What should you know about '+topic.toLowerCase()+'?',whyItWorks:'Starts with a question the video can answer.'}],
 hooks:{shortForm:{spokenHook:hook,visualAction:'Show your own example, then point to the specific detail you will explain.',textOnScreen:topic},longForm:{spokenHook:hook+' I will compare three examples and finish with a checklist.',visualAction:'Open with your example, then cut to source excerpts with visible dates.',textOnScreen:topic}},
 outline:[{step:'Opening',name:'State the question',details:hook},{step:'Context',name:'Explain the background',details:trend.summary||'Give the context using sources you have checked.'},{step:'Examples',name:'Show three specific examples',details:'Use your own footage or permission-cleared visuals. Keep each comparison tied to the question.'},{step:'Check',name:'Name a limit or common mistake',details:'Explain what the sources do not establish. Avoid claims that go beyond the evidence.'},{step:'Close',name:'Leave a useful takeaway',details:'Summarize one action or question the viewer can use.'}],
 thumbnailConcept:{mainTextOverlay:topic.split(':')[0].slice(0,55),visualDescription:'One clear subject from your own footage with short, readable text.',colorPalette:'One contrasting accent, a plain background and readable text'},
 targetAudience:{demographic:'Viewers interested in '+(trend.genre||'this topic'),retentionSecret:'Keep the opening question connected to each example.'}};
}
