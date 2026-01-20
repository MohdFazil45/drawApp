import { useState, useEffect } from "react";
export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    if (typeof process.env.WS_BACKEND_URL === "undefined") {
      return;
    }
    const ws = new WebSocket(process.env.WS_BACKEND_URL);
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
