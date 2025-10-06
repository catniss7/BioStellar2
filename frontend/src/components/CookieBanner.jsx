import React, {useEffect, useState} from 'react';


export default function CookieBanner(){
const [show, setShow] = useState(false);
useEffect(()=>{ if(!localStorage.getItem('bscookie')) setShow(true); },[]);
if(!show) return null;
return (
<div className="cookie-banner fixed right-6 bottom-6 p-4 rounded-xl border border-white/6 bg-gradient-to-b from-[#071b36] to-[#061122] max-w-sm">
<div className="text-sm">This demo uses local storage and cookies for UI preferences. No personal data is stored.</div>
<div className="mt-3 flex justify-end">
<button className="btn" onClick={()=>{ localStorage.setItem('bscookie','1'); setShow(false); }}>Got it</button>
</div>
</div>
);
}
