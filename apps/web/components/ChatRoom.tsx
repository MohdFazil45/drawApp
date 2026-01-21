import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClients";

async function getChats(roomId: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/chats/${roomId}`,
  );

  return response.data.messages;
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);
  return <ChatRoomClient id={id} message={messages} />;
}
