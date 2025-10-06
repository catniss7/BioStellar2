import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Plot from "react-plotly.js";
import { getExperiments, postCompare } from "../api";

export default function Compare(){
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [comparison, setComparison] = useState(null);

  useEffect(()=>{
    getExperiments().then(r => setList(r.data || [])).catch(()=>{
      setList([
        {id:1, name:"Exp A", points:[[1,2],[2,3],[3,1]]},
        {id:2, name:"Exp B", points:[[1,3],[2,1],[3,2]]},
        {id:3, name:"Exp C", points:[[1,1],[2,2],[3,3]]}
      ]);
    });
  },[]);

  const toggle = id => {
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  };

  const runCompare = () => {
    if(selected.length ===0) return alert("Select at least one experiment");
    postCompare(selected).then(res => setComparison(res.data)).catch(()=>{
      const ds = selected.map((id,idx) => {
        const item = list.find(l=>l.id===id);
        return {
          x:item.points.map(p=>p[0]),
          y:item.points.map(p=>p[1]),
          mode:'lines+markers',
          name:item.name
        };
      });
      setComparison({data:ds});
    });
  };

  return (
    <div style={{display:'flex', gap:18}}>
      <aside style={{width:280}}>
        <Card>
          <h3 className="h1">Experiment Selection</h3>
          <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:8}}>
            {list.map(it => (
              <label key={it.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span>{it.name}</span>
                <input type="checkbox" checked={selected.includes(it.id)} onChange={()=>toggle(it.id)} />
              </label>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <button className="tag" onClick={runCompare}>Compare</button>
          </div>
        </Card>
      </aside>

      <main style={{flex:1}}>
        <Card>
          <h3 className="h1">Comparison Visualizer</h3>
          <div style={{height:440}}>
            {comparison ? <Plot data={comparison.data} layout={{margin:{t:20}}} /> : <div style={{padding:18}}>Select experiments and click Compare</div>}
          </div>
        </Card>
      </main>
    </div>
  );
}
