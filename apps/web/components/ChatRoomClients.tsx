"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useHooks";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { messages: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentmessages, setCurrentmessages] = useState("");
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {

      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }));

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats(c => [...c, { messages: parsedData.messages }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m, index) => 
        <div key={index}>{m.messages}</div>
      )}
      <input
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "4px",
        }}
        type="text"
        value={currentmessages}
        onChange={(e) => {
          setCurrentmessages(e.target.value);
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
              message: currentmessages,
            }),
          );

          setCurrentmessages("");
        }}
      >
        Send messagess
      </button>
    </div>
  );
}
