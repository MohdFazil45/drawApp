"use client";
import initDraw from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
     initDraw(canvasRef.current)
    }
  }, [canvasRef]);

  return (
    <div className="inset-0 fixed">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
}
