import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FooterBadge from './components/FooterBadge';
import CookieBanner from './components/CookieBanner';


import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Comparison from './pages/Comparison';
import Chatbot from './pages/Chatbot';
import MissionInsights from './pages/MissionInsights';
import Student from './pages/Student';


export default function App() {
return (
<div className="app min-h-screen flex bg-[var(--navy)]">
<Sidebar />
<main className="flex-1 p-6">
<Navbar />
<div className="mt-4">
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/library" element={<Library />} />
<Route path="/comparison" element={<Comparison />} />
<Route path="/mission" element={<MissionInsights />} />
<Route path="/student" element={<Student />} />
<Route path="/chat" element={<Chatbot />} />
<Route path="*" element={<Dashboard />} />
</Routes>
</div>
</main>
<FooterBadge />
<CookieBanner />
</div>
);
}
