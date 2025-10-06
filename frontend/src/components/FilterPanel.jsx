import React from 'react';


export default function FilterPanel(){
return (
<div className="card">
<h3 className="text-lg font-bold">Filters</h3>
<div className="mt-3 grid gap-2">
<select className="w-full"><option>Organism</option><option>Plant</option><option>Microbe</option></select>
<select className="w-full"><option>Mission</option><option>ISS</option><option>Artemis</option></select>
<select className="w-full"><option>Year</option><option>2025</option><option>2024</option></select>
<button className="btn mt-2">Apply filters</button>
</div>
</div>
);
}
