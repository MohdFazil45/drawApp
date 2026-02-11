"use client";
import { Button } from "@/components/ButtonComponent";
import FieldInfo from "@/components/ErrorMessage";
import Input from "@/components/InputComponent";
import NavBar from "@/components/NavBar";
import { getRoomId } from "@/lib/roomid";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { Copy, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createElement, useState } from "react";
import { z } from "zod";

const RoomSchema = z.object({
  createSlug: z.string().min(3,"Code should atleast have 3 characters").max(20,"Code should not exceed have 8 characters").regex(/[A-Z]/,"Should use One Uppercase").regex(/[0-9]/,"Should use One number").regex(/[^A-Za-z0-9]/,"Must contain at least one symbol" )
});

export default function RoomCreate() {
  const [isRoomCreated, setIsRoomCreate] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      createSlug: ""
    },
    validators: { onChange: RoomSchema },
    onSubmit: async ({ value }) => {
      console.log(value.createSlug);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/create-room`,
          {
            slug: value.createSlug,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("here");
        setIsRoomCreate(true);
        form.reset()
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const enterRoom = async (slug: string) => {
    console.log(slug);
    const roomId = await getRoomId(slug);
    console.log(roomId);
    route.push(`/canvas/${roomId}`);
  };

  return (
    <main>
      <div
        className="
            min-h-screen w-full bg-white dark:bg-black bg-[radial-gradient(#D3D3D3_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)] bg-size-[10px_10px] overflow-x-hidden
          "
      >
        <NavBar />

        <div className="min-h-screen flex gap-10 items-center justify-center p-4 mt-8 dark:bg-transparent bg-neutral-200/60">
          <div className="min-h-screen w-screen flex flex-col  gap-4">
            <div className="border rounded h-fit  border-cyan-500/40 overflow-hidden ">
              <div className="border border-cyan-500/50 w-full h-full p-2 flex gap-1 items-center dark:bg-transparent bg-neutral-200/60  ">
                <Plus size={"30px"} />
                <h1 className="text-3xl">Create new room</h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center mt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      form.handleSubmit();
                    }}
                  >
                    <form.Field name="createSlug">
                      {(field) => (
                        <div className="flex  items-center justify-center">
                          <div className="flex flex-col">
                            <Input
                            placeholder="Paste Room code"
                            type="text"
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                          />
                          <FieldInfo
                            errors={field.state.meta.errors}
                            isTouched={field.state.meta.isTouched}
                          />
                          </div>

                          <div className="flex items-center justify-center gap-3">
                            <Button size="sm" variant="secondary" type="submit">
                              Create room
                            </Button>
                          </div>
                        </div>
                      )}
                    </form.Field>
                  </form>
                </div>
                <div className="text-lg dark:text-cyan-500 my-2">
                  Create your room canvas room by generating room code and paste
                  it input.
                </div>
              </div>
            </div>
            <div className="min-h-screen border rounded  border-cyan-500/40 ">
              <div className="text-3xl border border-cyan-500/40 p-4 ">
                Rooms
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
