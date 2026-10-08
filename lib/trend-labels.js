// Deterministic topic labels, not a translation or an AI claim.
const consonants={21:'k',22:'kh',23:'g',24:'gh',25:'ng',26:'ch',27:'chh',28:'j',29:'jh',30:'ny',31:'t',32:'th',33:'d',34:'dh',35:'n',36:'t',37:'th',38:'d',39:'dh',40:'n',42:'p',43:'ph',44:'b',45:'bh',46:'m',47:'y',48:'r',49:'r',50:'l',51:'l',52:'zh',53:'v',54:'sh',55:'sh',56:'s',57:'h'};
const scripts=[0x0900,0x0a00,0x0a80,0x0b00,0x0b80,0x0c00,0x0c80,0x0d00];
const vowels={5:'a',6:'aa',7:'i',8:'ii',9:'u',10:'uu',11:'ri',15:'e',16:'ai',19:'o',20:'au'};
const marks={62:'aa',63:'i',64:'ii',65:'u',66:'uu',67:'ri',70:'e',71:'e',72:'ai',74:'o',75:'o',76:'au',77:'',1:'n',2:'m',3:'h'};
export function transliterate(value){let out='';for(const c of value){const cp=c.codePointAt(0),base=scripts.find(b=>cp>=b&&cp<b+128);if(base===undefined){out+=c;continue;}const n=cp-base;if(n in consonants){out+=consonants[n]+'a';continue;}if(n in vowels){out+=vowels[n];continue;}if(n in marks){if(n>=62&&n<=77&&out.endsWith('a'))out=out.slice(0,-1);out+=marks[n];continue;}if(n>=102&&n<=111){out+=String(n-102);continue;}out+=c;}return out;}

export function enrichTrend(item) {
 const headlines=(item.articles||[]).map(a=>a.title), title=item.title||'';
 const text=[title,...headlines].join(' ').toLowerCase();
 const cisf=/cisf|केंद्रीय औद्योगिक सुरक्षा बल|केन्द्रीय औद्योगिक सुरक्षा बल|kemdriiya audyogika/.test(text);
 const rules=[['Security',/cisf|cybersecurity|industrial security/, 'Explain the reported cybersecurity training and one practical safety lesson. Do not suggest that the course proves a security guarantee.'],['Politics',/pakistan air force|election|minister|protest|munir|scindia|सिंधिया|തിരഞ്ഞെടുപ്പ്|चुनाव|నాయుడు/, 'Explain the confirmed facts and timeline, with dates and named sources.'],['Cricket',/cricket|t20|ipl|asia cup|एशिया कप|scorecard/, 'Break down one match turning point using the scorecard and your own commentary.'],['Cinema',/madhuri|kbc|dance|viral|cinema|actor|actress|movie|film|box office|ಚಿಕ್ಕಣ್ಣ/, 'Make a Shorts reaction or recap of the reported moment. Use your own commentary and permission-cleared clips; separate what happened from your opinion.'],['Finance',/share price|bank|salary|stock|market/, 'Explain the numbers and context without turning it into investment advice.'],['Tech',/microsoft|apple|phone|samsung|software|technology|\bai\b/, 'Explain what this means for everyday users, with one practical example.'],['Education',/ugc|exam|registration|student|net december|ಪರೀಕ್ಷೆ/, 'Walk through the official notice and key dates. Check the application source before posting.'],['Weather',/weather|rainfall|cyclone|flood|storm|forecast/, 'Explain the forecast and practical precautions using the official bulletin.'],['Culture',/festival|dussehra|dasara|పండుగ/, 'Build a useful festival explainer or checklist from the linked reports.']];
 const rule=cisf?rules[0]:rules.find(([,rx])=>rx.test(text))||['News',null,'Compare the linked reports and explain the topic in plain language. Verify any claim before publishing.'];
 const labels={'ಪರೀಕ್ಷೆ':'Parikshe (Exam)','పండుగ':'Panduga (Festival)','सिंधिया':'Scindia','ಚಿಕ್ಕಣ್ಣ':'Chikkanna','మందాడి':'Mandadi','തിരഞ്ഞെടുപ്പ്':'Thiranjeduppu (Election)','एशिया कप':'Asia Cup'};
 let label=cisf?'CISF':labels[title]||(/^[\x00-\x7F]+$/.test(title)?title:transliterate(title));
 label=label.replace(/\b(csa|t20|ugc|ipl|upi|cisf|kbc|ai)\b/gi,x=>x.toUpperCase());
 return {...item,englishLabel:label,labelKind:cisf?'English name':label===title?'Original title':'English label / approximate transliteration',category:rule[0],videoAngle:rule[2]};
}
export function mergeDuplicateTrends(items) {
 const out=[];
 for(const raw of items){const item=enrichTrend(raw),urls=new Set((item.articles||[]).map(a=>a.url).filter(Boolean));
 const duplicate=out.find(x=>{const other=new Set((x.articles||[]).map(a=>a.url).filter(Boolean)), overlap=[...urls].filter(u=>other.has(u)).length;return urls.size>=2&&other.size>=2&&overlap/Math.min(urls.size,other.size)>0.5;});
 if(!duplicate){out.push({...item});continue;}
 duplicate.articles=[...new Map([...duplicate.articles,...item.articles].map(a=>[a.url,a])).values()];
 duplicate.mergedTitles=[...(duplicate.mergedTitles||[]),item.title];
 }
 return out;
}
export function topicForBrief(item) {return {...item, title:item.englishLabel, originalTitle:item.title, genre:item.category.toLowerCase(), platform:'youtube', sourceUrl:item.articles?.[0]?.url||item.sourceUrl, summary:item.videoAngle+'\n'+(item.articles||[]).map(a=>a.title+' ('+a.publisher+')').join('\n'), sampleHook:'What is behind '+item.englishLabel+'? Here is what the linked reports say.', isRealTopic:true};}
