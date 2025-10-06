import React from "react";
import Card from "../components/Card";

export default function Student(){
  return (
    <div style={{display:'flex', gap:18}}>
      <div style={{flex:1}}>
        <Card>
          <h3 className="h1">Student Mode</h3>
          <div className="h2">Simplified UI and explanations for learners</div>
          <div style={{marginTop:12}}>
            <p>Welcome, student! The Archivist can explain experiments in simple terms. Try these quick prompts:</p>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <button className="tag" onClick={()=>alert('Demo: Name simple explanation')}>Explain an experiment</button>
              <button className="tag" onClick={()=>alert('Demo: Summary')}>Summarize a paper</button>
              <button className="tag" onClick={()=>alert('Demo: Glossary')}>Glossary</button>
            </div>
          </div>
        </Card>

        <Card style={{marginTop:12}}>
          <h4 className="h1">Learning Resources</h4>
          <ul>
            <li>Intro to microgravity biology — 15 min</li>
            <li>How to read experimental data — 10 min</li>
            <li>Using BioStellar for research — 8 min</li>
          </ul>
        </Card>
      </div>

      <aside className="right-rail">
        <Card>
          <h4 className="h1">Student Tips</h4>
          <ol>
            <li>Ask the Archivist for simple summaries</li>
            <li>Use SafePapers for vetted resources</li>
            <li>Compare experiments to learn differences</li>
          </ol>
        </Card>
      </aside>
    </div>
  );
}
