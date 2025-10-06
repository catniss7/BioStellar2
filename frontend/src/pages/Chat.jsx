import React, { useRef, useState } from "react";
import Card from "../components/Card";
import { postChat } from "../api";
import Chat from "./pages/Chat";  // <-- your existing chatbot page

// Inside <Routes>
<Route path="/chatbot" element={<Chat />} />

export default function Chat(){
  const [messages, setMessages] = useState([{id:0, sender:'bot', text:'Hello — I am the Archivist. Ask me about experiments, papers, or missions.'}]);
  const [text, setText] = useState("");
  const ref = useRef();

  const send = async () => {
    if(!text.trim()) return;
    const me = {id:Date.now(), sender:'me', text};
    setMessages(m=>[...m, me]);
    setText("");
    // optimistic typing
    setMessages(m=>[...m, {id:Date.now()+1, sender:'bot', text:'Archivist is thinking...'}]);
    try {
      const res = await postChat({message:text});
      setMessages(m => {
        const copy = [...m];
        copy[copy.length-1] = {id:Date.now()+2, sender:'bot', text: res.data?.reply || "No reply"};
        return copy;
      });
    } catch (e) {
      setMessages(m => {
        const copy = [...m];
        copy[copy.length-1] = {id:Date.now()+2, sender:'bot', text: "Archivist (demo): I can't reach the backend. Try again later."};
        return copy;
      });
    } finally {
      ref.current?.scrollIntoView({behavior:'smooth'});
    }
  };

  return (
    <div>
      <h3 className="h1">Archivist Chat</h3>
      <Card style={{height:540, display:'flex', flexDirection:'column'}}>
        <div className="messages" style={{flex:1}}>
          {messages.map(m => (
            <div key={m.id} style={{display:'flex', justifyContent: m.sender==='me' ? 'flex-end' : 'flex-start'}}>
              <div className={`msg ${m.sender==='me' ? 'me' : 'bot'}`}>{m.text}</div>
            </div>
          ))}
          <div ref={ref}></div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:10}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask Archivist..." style={{flex:1}} onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} />
          <button className="tag" onClick={send}>Send</button>
        </div>
      </Card>
    </div>
  );
}

