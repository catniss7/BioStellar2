import React from "react";
import Card from "../components/Card";
import Plot from "react-plotly.js";

export default function MissionInsights(){
  const missions = [
    {name:'ISS-Exp', experiments:12},
    {name:'Artemis I', experiments:8},
    {name:'SpaceX CRS-25', experiments:14},
  ];

  const barData = [{
    x: missions.map(m=>m.name),
    y: missions.map(m=>m.experiments),
    type: 'bar',
    marker:{ color: 'rgba(255,106,0,0.95)' }
  }];

  return (
    <div style={{display:'flex', gap:18}}>
      <div style={{flex:1}}>
        <Card>
          <h3 className="h1">Mission Timeline</h3>
          <div style={{height:320}}><Plot data={barData} layout={{margin:{t:12}}} config={{displayModeBar:false}} /></div>
        </Card>

        <Card style={{marginTop:12}}>
          <h4 className="h1">Top Missions</h4>
          <ul>
            {missions.map(m => <li key={m.name}>{m.name} — {m.experiments} experiments</li>)}
          </ul>
        </Card>
      </div>

      <aside className="right-rail">
        <Card>
          <h4 className="h1">Mission Summary</h4>
          <p className="h2">Use Archivist to auto-summarize mission findings (RAG-powered).</p>
          <button className="tag">Summarize Mission</button>
        </Card>

        <Card>
          <h4 className="h1">NASA Data</h4>
          <div className="h2">Integrate GeneLab & mission catalogs for deeper insight.</div>
        </Card>
      </aside>
    </div>
  );
}
