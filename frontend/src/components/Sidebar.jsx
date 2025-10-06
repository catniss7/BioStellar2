import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBook, FiBarChart2, FiMessageCircle, FiLayers, FiUser } from 'react-icons/fi';


const nav = [
{ to: '/', icon: <FiHome size={18} />, label: 'Dashboard' },
{ to: '/library', icon: <FiBook size={18} />, label: 'Library' },
{ to: '/comparison', icon: <FiBarChart2 size={18} />, label: 'Compare' },
{ to: '/mission', icon: <FiLayers size={18} />, label: 'Missions' },
{ to: '/student', icon: <FiUser size={18} />, label: 'Student' },
{ to: '/chat', icon: <FiMessageCircle size={18} />, label: 'Archivist' },
];


export default function Sidebar(){
return (
<aside className="sidebar w-24 bg-[var(--panel)] p-3 flex flex-col items-center gap-3 h-screen sticky top-0">
<div className="text-[14px] font-extrabold tracking-wider text-[var(--neon)]">BioStellar</div>
<nav className="flex flex-col gap-3 mt-4">
{nav.map(item => (
<NavLink key={item.to} to={item.to} className={({isActive}) => `side-btn p-2 rounded-xl flex items-center justify-center ${isActive ? 'bg-gradient-to-b from-[#162d4f] to-[#0f243f] text-[var(--neon)] scale-105' : 'text-[var(--muted)] hover:scale-105'}`}>
<div>{item.icon}</div>
</NavLink>
))}
</nav>
<div className="mt-auto text-xs text-[var(--muted)]">v1.0</div>
</aside>
);
}
