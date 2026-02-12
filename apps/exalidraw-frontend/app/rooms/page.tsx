"use client";
import { Button } from "@/components/ButtonComponent";
import FieldInfo from "@/components/ErrorMessage";
import Input from "@/components/InputComponent";
import { Loader } from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { getRoomId } from "@/lib/roomid";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { createElement, useEffect, useState } from "react";
import { z } from "zod";

const RoomSchema = z.object({
  createSlug: z
    .string()
    .min(3, "Code should atleast have 3 characters")
    .max(20, "Code should not exceed have 8 characters")
    .regex(/[A-Z]/, "Should use One Uppercase")
    .regex(/[0-9]/, "Should use One number"),
});

export default function RoomCreate() {
  const [roomCreated, setRoomCreated] = useState<
    { id: number; slug: string; createdAt: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [create, setCreate] = useState(false);
  
  const route = useRouter();

  useEffect(() => {
    fetchRoom();
  }, []);

  const form = useForm({
    defaultValues: {
      createSlug: "",
    },
    validators: { onChange: RoomSchema },
    onSubmit: async ({ value }) => {
      console.log(value.createSlug);
      setCreate(true);
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
        fetchRoom();
        form.reset();

        console.log("success");
        setCreate(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchRoom = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/room`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setIsLoading(false);
      setRoomCreated(response.data.room);
      console.log(response.data.room);
    } catch (error) {}
  };

  const enterRoom = async (slug: string) => {
    console.log(slug);
    const roomId = await getRoomId(slug);
    
    route.push(`/canvas/${roomId}`);
  };

  const deleteRoom = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/room/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setRoomCreated((prev) => prev.filter((r) => r.id !== id));
    fetchRoom();

    console.log(roomCreated);
  };

  return (
    <main>
      <div className="min-h-screen w-full overflow-x-hidden bg-white bg-[radial-gradient(#D3D3D3_1px,transparent_1px)] bg-size-[10px_10px] dark:bg-black dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]">
        <NavBar />

        <div className="mt-8 flex min-h-screen items-center justify-center gap-10 p-4 dark:bg-transparent">
          <div className="flex min-h-screen w-screen flex-col gap-4">
            <div className="flex items-center justify-center">
              <div className="h-fit w-[80%] overflow-hidden rounded-2xl border-2 dark:border-cyan-500/40 border-neutral-400 dark:bg-transparent bg-neutral-300/20">
                <div className="flex h-full w-full items-center gap-1 border dark:border-cyan-500/40 border-neutral-400 p-2 dark:bg-transparent">
                  <Plus size={"30px"} />
                  <h1 className="text-3xl">Create new room</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                      }}
                    >
                      <form.Field name="createSlug">
                        {(field) => (
                          <div className="flex items-center justify-center">
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
                              <Button
                                size="sm"
                                variant="secondary"
                                type="submit"
                              >
                                {create ? "Creating..." : "Create room"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </form.Field>
                    </form>
                  </div>
                  <div className="my-2 text-lg dark:text-cyan-500">
                    Create your room canvas room by generating room code and
                    paste it input.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="min-h-screen w-[70%] rounded-xl border-2 dark:border-cyan-500/40 border-neutral-400 dark:bg-transparent bg-neutral-300/20">
                <div className="rounded-t-xl border dark:border-cyan-500/40 border-neutral-400 p-4 text-3xl">
                  Rooms
                </div>
                <div>
                  <div className="flex h-full w-full flex-col items-center gap-2 p-4">
                    {isLoading ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <Loader
                          height="100"
                          width="100"
                          color="#ffffff"
                          visible={isLoading}
                        />
                      </div>
                    ) : roomCreated.length == 0 ? (
                      <div className="flex items-center justify-center text-2xl">
                        There is no rooms created yet{" "}
                      </div>
                    ) : (
                      roomCreated.map((room) => (
                        <div
                          key={room.id}
                          className="flex items-center gap-24 rounded-2xl border border-neutral-400 px-4 py-2"
                        >
                          <div className="flex flex-col">
                            <div className="text-xl">{room.slug}</div>
                            <div className="text-xs">
                              Created:{" "}
                              {new Date(room.createdAt).toLocaleString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => enterRoom(room.slug)}
                            >
                              Join
                            </Button>
                            <Button
                              className="bg-red-700 shadow-none hover:bg-red-800"
                              variant="secondary"
                              size="sm"
                              children={<Trash />}
                              onClick={() => deleteRoom(Number(room.id))}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}