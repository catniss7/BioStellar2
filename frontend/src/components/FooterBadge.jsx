import React from 'react';


export default function FooterBadge(){
return (
<div className="fixed left-6 bottom-6 bg-white/3 backdrop-blur-sm p-3 rounded-xl border border-white/6 flex items-center gap-3">
<div style={{width:40,height:40, borderRadius:8, background:'linear-gradient(90deg,#ff6a00,#ff8a3d)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>★</div>
<div>
<div className="text-sm font-bold">NASA Space Apps Hackathon</div>
<div className="text-xs text-[var(--muted)]">Built with ♥ — BioStellar</div>
</div>
</div>
);
}
