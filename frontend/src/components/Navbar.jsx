import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';


export default function Navbar(){
return (
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<motion.h1 initial={{x:-10,opacity:0}} animate={{x:0,opacity:1}} className="text-2xl font-extrabold">Dashboard</motion.h1>
<div className="hidden sm:block">
<div className="tag">Archivist AI</div>
</div>
</div>


<div className="flex items-center gap-3">
<div className="search">
<div className="relative">
<FiSearch className="absolute left-3 top-3 text-[var(--muted)]" />
<input className="pl-10 pr-4 py-2 rounded-full bg-[rgba(255,255,255,0.03)] outline-none text-sm w-72" placeholder="Search experiments, missions, papers..." />
</div>
</div>
<button className="p-2 rounded-md hover:bg-white/3">
<FiBell />
</button>
<div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--neon)] to-[var(--neon-2)] flex items-center justify-center text-black font-bold">CB</div>
</div>
</div>
);
}
