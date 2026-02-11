import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  Circle,
  LineSquiggleIcon,
  MousePointer,
  Pencil,
  RectangleHorizontal,
  Text,
  X,
} from "lucide-react";
import { Game } from "@/draw/Game";
import { Side } from "./SideBar";

export type ToolShape = "mouse" | "circle" | "rect" | "pencil" | "curveline";

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
    setShowsideButton(prev=> !prev);
    sidebarRef.current?.classList.toggle("hidden");
  }

  async function exportCanvas() {
    if (!canvasRef.current) {
      return;
    }
    const dataUrl = await htmlToImage.toPng(canvasRef.current);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "diagram.png";
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
      <TopBar isActiveTool={isActiveTool} setIsActiveTool={setIsActiveTool} />
      <div className="absolute top-3 right-5 ">
        {showsideButton ? (
          <Text
            className="fixed z-100 right-5 top-3 cursor-pointer transition-all duration-500"
            onClick={showSideBar}
            size={"30px"}
          />
        ) : (
          <X
            className="fixed z-100 right-5 top-3 cursor-pointer transition-all duration-500"
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
}: {
  isActiveTool: ToolShape;
  setIsActiveTool: (s: ToolShape) => void;
}) {
  return (
    <div className="fixed top-3 left-140 flex gap-2 border-2 border-cyan-500/60 px-4 py-2 rounded-lg ">
      <IconButton
        activated={isActiveTool === "mouse"}
        icon={<MousePointer />}
        onClick={() => {
          setIsActiveTool("mouse");
        }}
      />
      <IconButton
        activated={isActiveTool === "curveline"}
        icon={<LineSquiggleIcon />}
        onClick={() => {
          setIsActiveTool("curveline");
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
    </div>
  );
}
