import { useState, useEffect } from "react";
export function useSocket() {
  
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    if (typeof process.env.NEXT_PUBLIC_WS_BACKEND_URL === "undefined") {
      return;
    }
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYzExZTM4MC1hYjlmLTRlMWEtYmE5MC04YzJjMzNmOWQ5ZGIiLCJpYXQiOjE3Njg5NzA4Nzh9.2xYoBAZSKRDXfVbjtKbw5b1TTegZ8Ch-j6WStxozAgg`);
    ws.onopen = ()=>{
      setLoading(false)
      setSocket(ws)
    }
  }, []);

  return {
    socket,
    loading
  }
}
