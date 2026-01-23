import initDraw from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({ roomId, socket }: { roomId: number, socket:WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div className="inset-0 fixed">
      <canvas ref={canvasRef} height={590} width={1340}></canvas>
    </div>
  );
}
