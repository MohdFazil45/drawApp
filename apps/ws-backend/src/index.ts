import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "@repo/backendcommon/secret";
import { WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
import {prisma} from "@repo/db/client"

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection",function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const userId = checkUser(token);

  if (userId === null) {
    ws.close();
    return;
  }

  users.push({
    ws,
    userId,
    rooms: [],
  });

  ws.on("message", async function message(data) {
    const text= data.toString()

    const parsedData = JSON.parse(text);
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x !== parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
    
      await prisma.chat.create({
        data:{
            roomId,
            message,
            userId
        }
      })
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message:message,
              roomId,
            }),
          );
        }
      });
    }
  });
});

console.log("server is running on port 8080");
