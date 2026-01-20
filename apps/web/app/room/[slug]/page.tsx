import axios from "axios";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug:string){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/room/${slug}`)
    return response.data.room.id
}
export default async function RoomId({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug)

  return <ChatRoom id={roomId}></ChatRoom>

}
