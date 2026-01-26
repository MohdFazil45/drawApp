import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";

export type ToolShape = "circle" | "rect" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [isActiveTool, setIsActiveTool] = useState<ToolShape>("pencil");

  useEffect(() => {
    game?.setTool(isActiveTool);
  }, [isActiveTool, game]);
  
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () =>{
        g.destroy()
      }
    }
  }, [canvasRef]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        height={window.innerHeight}
        width={innerWidth}
      ></canvas>
      <TopBar isActiveTool={isActiveTool} setIsActiveTool={setIsActiveTool} />
    </div>
  );
}

function TopBar({
  isActiveTool,
  setIsActiveTool,
}: {
  isActiveTool: ToolShape;
  setIsActiveTool: (s: ToolShape) => void;
}) {
  return (
    <div className="fixed top-5 left-40 flex gap-2  ">
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
    </div>
  );
}
