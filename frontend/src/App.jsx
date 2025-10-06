import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import FooterBadge from "./components/FooterBadge";
import CookieBanner from "./components/CookieBanner";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Compare from "./pages/Compare";
import Chat from "./pages/Chat";
import MissionInsights from "./pages/MissionInsights";
import Student from "./pages/Student";

export default function App(){
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div style={{marginTop:8}}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/compare" element={<Compare/>} />
            <Route path="/mission" element={<MissionInsights/>} />
            <Route path="/student" element={<Student/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="*" element={<Dashboard/>} />
          </Routes>
        </div>
      </main>

      <FooterBadge />
      <CookieBanner />
    </div>
  );
}


