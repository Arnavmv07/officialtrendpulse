export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST') return res.status(405).json({success:false,error:'Method not allowed'});
 const data=typeof req.body==='object'&&req.body?req.body:{};
 const email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
 if(data.website) return res.status(200).json({success:true});
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({success:false,error:'Enter a valid email address.'});
 const url=process.env.VITE_SUPABASE_URL, key=process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return res.status(503).json({success:false,error:'The request form is not available yet.'});
 try{const result=await fetch(url+'/rest/v1/rpc/request_early_access',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({address:email}),signal:AbortSignal.timeout(8000)});
 if(!result.ok)throw Error();
 return res.status(200).json({success:true});
 }catch{return res.status(503).json({success:false,error:'Could not save the request. Please try again later.'});}
}
