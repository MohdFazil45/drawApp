"use client";
import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export default function RoomCanvas({ roomId }: { roomId: number }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNjE1MjQ0Ny0yZjA0LTQ4MTAtOGNjNC05MjlkMjNlZDM0NGIiLCJpYXQiOjE3NjkyMzkwMzZ9.qzDCGTrog3_2jgCtztx7Zz3XphazG1UbBtprDyN0Im0`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type:"join_room",
        roomId:roomId
      }))
    };
  }, []);

 
  if (!socket) {
    return <div>
      Connecting to server
    </div>
  }

  return (
    <Canvas roomId={roomId} socket={socket}/>
  )
  
}
