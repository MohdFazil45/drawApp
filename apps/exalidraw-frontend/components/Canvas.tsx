"use client"
import * as htmlToImage from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  ArrowUpLeft,
  Circle,
  MousePointer,
  Pencil,
  RectangleHorizontal,
  Text,
  Undo,
  X,
} from "lucide-react";
import { Game } from "@/draw/Game";
import { Side } from "./SideBar";
import axios from "axios";

export type ToolShape =
  | "mouse"
  | "circle"
  | "rect"
  | "pencil"
  | "arrowPoint"
  | "undo";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Game>();
  const [showsideButton, setShowsideButton] = useState(true);
  const [isActiveTool, setIsActiveTool] = useState<ToolShape>("pencil");

  function showSideBar() {
    sidebarRef.current?.classList.toggle("flex");
    setShowsideButton((prev) => !prev);
    sidebarRef.current?.classList.toggle("hidden");
  }

  async function exportCanvas() {
    if (!canvasRef.current) {
      return;
    }
    const dataUrl = await htmlToImage.toPng(canvasRef.current);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canva.png";
    link.click();
  }

  useEffect(() => {
    game?.setTool(isActiveTool);
  }, [isActiveTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      ></canvas>
      <TopBar
        isActiveTool={isActiveTool}
        setIsActiveTool={setIsActiveTool}
        roomId={roomId}
        game={game}
      />
      <div className="absolute top-3 right-5">
        {showsideButton ? (
          <Text
            className="fixed top-3 right-5 z-100 cursor-pointer transition-all duration-500"
            onClick={showSideBar}
            size={"30px"}
          />
        ) : (
          <X
            className="fixed top-3 right-5 z-100 cursor-pointer transition-all duration-500"
            onClick={showSideBar}
            size={"30px"}
          />
        )}
      </div>
      <div ref={sidebarRef} className="hidden transition-all duration-500">
        {<Side onClick={exportCanvas} className="" />}
      </div>
    </div>
  );
}

function TopBar({
  isActiveTool,
  setIsActiveTool,
  roomId,
  game
}: {
  isActiveTool: ToolShape;
  setIsActiveTool: (s: ToolShape) => void;
  roomId: number;
  game?:Game
}) {
  const token = localStorage.getItem("token");
  const undoMessage = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/undo/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200 && game) {
        game.undoLastShape()
      }
    } catch (error) {}
  };

  return (
    <div className="fixed top-3 left-140 flex gap-2 rounded-lg border-2 border-cyan-500/60 px-4 py-2">
      <IconButton
        activated={isActiveTool === "mouse"}
        icon={<MousePointer />}
        onClick={() => {
          setIsActiveTool("mouse");
        }}
      />
      <IconButton
        activated={isActiveTool === "arrowPoint"}
        icon={<ArrowUpLeft />}
        onClick={() => {
          setIsActiveTool("arrowPoint");
        }}
      />
      <IconButton
        activated={isActiveTool === "pencil"}
        icon={<Pencil />}
        onClick={() => {
          setIsActiveTool("pencil");
        }}
      />
      <IconButton
        activated={isActiveTool === "circle"}
        icon={<Circle />}
        onClick={() => {
          setIsActiveTool("circle");
        }}
      />
      <IconButton
        activated={isActiveTool === "rect"}
        icon={<RectangleHorizontal />}
        onClick={() => {
          setIsActiveTool("rect");
        }}
      />
      <IconButton
        activated={isActiveTool === "undo"}
        icon={<Undo className="cursor-pointer"/>}
        onClick={undoMessage}
      />
    </div>
  );
}
