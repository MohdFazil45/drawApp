"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useHooks";

export function ChatRoomClient({
  message,
  id,
}: {
  message: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(message);
  const [currentmessage, setCurrentmessage] = useState("");
  const { socket, loading } = useSocket();
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }),
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [ { message: parsedData.message }, ...c]);
        }
      };
    }
  }, [socket, loading, id]);


  return (
    <>
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "4px",
      }}
    >
      

      <input
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "4px",
        }}
        type="text"
        value={currentmessage}
        onChange={(e) => {
          setCurrentmessage(e.target.value);
        }}
      />
      <button
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentmessage,
            }),
          );

          setCurrentmessage("");
        }}
      >
        Send messages
      </button>
     
    </div>
    <div> {chats.map((m, index) => (
        <div key={index}>{m.message}</div>
      ))}</div>
      </>
  );
}
