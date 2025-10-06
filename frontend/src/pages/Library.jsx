import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getLibrary } from "../api";

export default function Library(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{
    getLibrary().then(r => setItems(r.data)).catch(()=>{
      setItems([
        {id:1, title:"Plant Growth in LEO", authors:"A. Smith", year:2024, safety:"Reviewed"},
        {id:2, title:"Microbe Behavior under Radiation", authors:"B. Chen", year:2023, safety:"Pending"},
        {id:3, title:"Yeast Metabolism in Microgravity", authors:"C. Patel", year:2022, safety:"Reviewed"}
      ]);
    });
  },[]);

  const filtered = items.filter(it => it.title.toLowerCase().includes(q.toLowerCase()) || it.authors.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{display:'flex', gap:18}}>
      <div style={{flex:1}}>
        <Card>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h3 className="h1">MyLibrary • SafePapers</h3>
              <div className="h2">Curated, safety-reviewed research</div>
            </div>
            <div>
              <input placeholder="Search papers..." value={q} onChange={e=>setQ(e.target.value)} />
            </div>
          </div>

          <div className="paper-list">
            {filtered.map(p => (
              <div key={p.id} className="paper">
                <div>
                  <div style={{fontWeight:700}}>{p.title}</div>
                  <div style={{fontSize:13, color:'var(--muted)'}}>{p.authors} • {p.year}</div>
                </div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <div style={{fontSize:12, color:p.safety==="Reviewed" ? "lime":"orange"}}>{p.safety}</div>
                  <button className="tag" onClick={()=>alert('Open (mock)')}>Open</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{marginTop:12}}>
          <h4 className="h1">Upload Paper</h4>
          <p className="h2">Drag & drop PDF to add to MyLibrary (demo)</p>
          <div style={{marginTop:8}}>
            <input type="file" accept="application/pdf" />
            <button className="tag" style={{marginLeft:8}}>Upload</button>
          </div>
        </Card>
      </div>

      <aside className="right-rail">
        <Card>
          <h4 className="h1">Safety Filters</h4>
          <div style={{display:'grid', gap:8}}>
            <label><input type="checkbox" /> Bio-safety Level</label>
            <label><input type="checkbox" /> Ethics Reviewed</label>
            <label><input type="checkbox" /> Reproducibility Score</label>
            <button className="tag">Apply</button>
          </div>
        </Card>

        <Card>
          <h4 className="h1">Search Tips</h4>
          <p className="h2">Try searching by organism, mission, or gene.</p>
        </Card>
      </aside>
    </div>
  );
}
