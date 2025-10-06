import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Heatmap from "../snippets/Heatmap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { getHeatmap } from "../api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard(){
  const [heat, setHeat] = useState(null);

  useEffect(()=>{
    getHeatmap().then(res => setHeat(res.data)).catch(()=>{
      setHeat({
        x:["Gene Expr","Plant Growth","Microbe","Radiation","Metabolism"],
        y:["Artemis I","ISS-Exp","SpaceX-1","Europa-PR","Lunar-Lab"],
        z:[
          [0.3,0.6,0.1,0.4,0.2],
          [0.5,0.1,0.6,0.2,0.3],
          [0.2,0.4,0.8,0.3,0.6],
          [0.7,0.3,0.4,0.8,0.5],
          [0.1,0.2,0.3,0.2,0.4]
        ]
      });
    });
  },[]);

  const lineData = {
    labels: ["2019","2020","2021","2022","2023","2024"],
    datasets: [{
      label:"Active Experiments",
      data:[8,12,18,24,31,42],
      borderColor:"rgba(255,106,0,0.95)",
      backgroundColor:"rgba(255,106,0,0.12)",
      fill:true,
      tension:0.3
    }]
  };

  return (
    <div style={{display:'flex', gap:18}}>
      <div style={{flex:1}}>
        <Card>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h3 className="h1">Knowledge Gap Heatmap</h3>
              <div className="h2">Under-explored biology areas across missions</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="tag">Export</button>
              <button className="tag">Refresh</button>
            </div>
          </div>

          <div style={{marginTop:14}}>
            {heat ? <Heatmap x={heat.x} y={heat.y} z={heat.z} /> : <div style={{height:260}}>Loading...</div>}
          </div>
        </Card>

        <div className="grid-3" style={{marginTop:12}}>
          <Card>
            <h4 className="h1">Mission Insights</h4>
            <div className="h2">Summary metrics across current missions</div>
            <div style={{display:'flex', gap:12, marginTop:12}}>
              <div>
                <div style={{fontSize:20,fontWeight:700}}>42</div>
                <div className="h2">Total Experiments</div>
              </div>
              <div>
                <div style={{fontSize:20,fontWeight:700}}>17</div>
                <div className="h2">Active Missions</div>
              </div>
            </div>
            <div style={{height:110, marginTop:12}}>
              <Line data={lineData} options={{plugins:{legend:{display:false}}}} />
            </div>
          </Card>

          <Card>
            <h4 className="h1">Recent Highlights</h4>
            <ul style={{paddingLeft:18}}>
              <li>Plant growth assay on ISS-Exp</li>
              <li>Archivist answered 148 queries last week</li>
              <li>3 papers added to SafePapers</li>
            </ul>
          </Card>

          <Card>
            <h4 className="h1">Knowledge Gap Summary</h4>
            <p className="h2">Top gap: <strong style={{color:'var(--accent)'}}>Plant Genomics</strong> on lunar missions — priority</p>
            <button className="tag">Create Task</button>
          </Card>
        </div>
      </div>

      <aside className="right-rail">
        <Card>
          <h4 className="h1">Filters</h4>
          <div style={{display:'grid', gap:8, marginTop:8}}>
            <select><option>Organism</option><option>Plant</option><option>Microbe</option></select>
            <select><option>Mission</option><option>ISS</option><option>Artemis</option></select>
            <select><option>Year</option><option>2025</option><option>2024</option></select>
            <button className="tag">Apply</button>
          </div>
        </Card>

        <Card>
          <h4 className="h1">AI Archivist</h4>
          <div className="h2">Ask Archivist about papers, experiments or missions</div>
          <div style={{display:'flex', gap:8, marginTop:10}}>
            <a href="/chat"><button className="tag">Open Chat</button></a>
            <button className="tag">Recent</button>
          </div>
        </Card>

        <Card>
          <h4 className="h1">Quick Links</h4>
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            <a href="#">NASA GeneLab</a>
            <a href="#">Mission Catalog</a>
            <a href="#">Upload Paper</a>
          </div>
        </Card>
      </aside>
    </div>
  );
}
