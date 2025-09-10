import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", category:"", condition:"", description:"", postedBy:"" });

  // Fetch items
  useEffect(()=> {
    fetch("http://localhost:5000/api/items")
      .then(res=>res.json())
      .then(setItems);
  }, []);

  // Handle Submit
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/items", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(form)
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setForm({ name:"", category:"", condition:"", description:"", postedBy:"" });
  };

  // Handle Delete
  const handleDelete = async(id)=>{
    await fetch(`http://localhost:5000/api/items/${id}`, { method:"DELETE" });
    setItems(items.filter(it=>it._id !== id));
  };

  return (
    <div style={{ padding:"20px" }}>
      <h1>♻️ Community E-Waste Exchange Portal</h1>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom:"20px" }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/><br/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/><br/>
        <input placeholder="Condition" value={form.condition} onChange={e=>setForm({...form, condition:e.target.value})}/><br/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/><br/>
        <input placeholder="Posted By" value={form.postedBy} onChange={e=>setForm({...form, postedBy:e.target.value})}/><br/>
        <button type="submit">Add Item</button>
      </form>

      {/* Items List */}
      <h2>Available E-Waste Items</h2>
      <ul>
        {items.map(item=>(
          <li key={item._id}>
            <strong>{item.name}</strong> ({item.category}) - {item.condition}<br/>
            {item.description} <br/>
            <em>Posted by: {item.postedBy}</em> 
            <button onClick={()=>handleDelete(item._id)}> Delete </button>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;