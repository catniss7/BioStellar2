import React from 'react';
import Plot from 'react-plotly.js';


export default function Heatmap({x=[], y=[], z=[]}){
const data = [{ z, x, y, type: 'heatmap', colorscale:'Portland', showscale:true }];
const layout = { margin:{l:80,r:20,t:20,b:80}, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)' };
return <Plot data={data} layout={layout} style={{width:'100%', height:320}} config={{displayModeBar:false}} />;
}
