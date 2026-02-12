import { ToolShape } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    }
  | {
      type: "arrowPoint";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

interface Point {
  x: number;
  y: number;
}

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: number;
  private socket: WebSocket;
  private clicked: boolean;
  private startX: number = 0;
  private startY: number = 0;
  private clientId: string;
  private isActiveTool: ToolShape = "rect";
  private points: Point[];

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    console.log("Game created");
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.points = [];
    this.clientId = crypto.randomUUID();
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  setTool(tool: ToolShape) {
    this.isActiveTool = tool;
  }

  undoLastShape() {
    this.socket.send(
      JSON.stringify({
        type: "undo",
        roomId: this.roomId,
        clientId: this.clientId,
      }),
    );
    this.existingShapes.pop();
    this.clearCanvas();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log("init shapes",this.existingShapes)

    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        if (message.clientId === this.clientId) {
          return;
        }
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        console.log("socket shape", parsedShape.shape);
        this.clearCanvas();
      }

      if (message.type === "undo") {
        this.existingShapes.pop();
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255, 255, 255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2,
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        if (shape.points.length < 2) return;
        this.ctx.beginPath();
        this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
        for (let i = 1; i < shape.points.length - 1; i++) {
          const midX = (shape.points[i].x + shape.points[i + 1].x) / 2;
          const midY = (shape.points[i].y + shape.points[i + 1].y) / 2;
          this.ctx.quadraticCurveTo(
            shape.points[i].x,
            shape.points[i].y,
            midX,
            midY,
          );
          this.ctx.lineWidth = 2;
        }

        this.ctx.stroke();
      } else if (shape.type === "arrowPoint") {
        const dx = shape.endX - shape.startX;
        const dy = shape.endY - shape.startY;
        const headLength = 10;
        const angle = Math.atan2(dy, dx);
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(
          shape.endX - headLength * Math.cos(angle - Math.PI / 6),
          shape.endY - headLength * Math.sin(angle - Math.PI / 6),
        );
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.lineTo(
          shape.endX - headLength * Math.cos(angle + Math.PI / 6),
          shape.endY - headLength * Math.sin(angle + Math.PI / 6),
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;

    const x = e.clientX;
    const y = e.clientY;

    this.startX = x;
    this.startY = y;
    this.points = [{ x: e.clientX, y: e.clientY }];
  };
  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const isActiveTool = this.isActiveTool;
    let shape: Shape | null = null;
    if (isActiveTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (isActiveTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    } else if (isActiveTool === "pencil") {
      shape = {
        type: "pencil",
        points: [...this.points],
      };
    } else if (isActiveTool === "arrowPoint") {
      const endX = e.clientX;
      const endY = e.clientY;
      shape = {
        type: "arrowPoint",
        startX: this.startX,
        startY: this.startY,
        endX: endX,
        endY: endY,
      };
    }
    if (!shape) {
      return;
    }
    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        clientId: this.clientId,
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      }),
    );
  };
  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const isActiveTool = this.isActiveTool;
      if (isActiveTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (isActiveTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + width / 2;
        const centerY = this.startY + height / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (isActiveTool === "pencil") {
        const points = { x: e.clientX, y: e.clientY };
        this.points.push(points);
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 1; i++) {
          const midX = (this.points[i].x + this.points[i + 1].x) / 2;
          const midY = (this.points[i].y + this.points[i + 1].y) / 2;
          this.ctx.quadraticCurveTo(
            this.points[i].x,
            this.points[i].y,
            midX,
            midY,
          );
          this.ctx.lineWidth = 2;
        }
        this.ctx.stroke();
      } else if (isActiveTool === "arrowPoint") {
        const endX = e.clientX;
        const endY = e.clientY;
        const dx = endX - this.startX;
        const dy = endY - this.startY;
        const headLength = 10;
        const angle = Math.atan2(dy, dx);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(
          endX - headLength * Math.cos(angle - Math.PI / 6),
          endY - headLength * Math.sin(angle - Math.PI / 6),
        );
        this.ctx.lineTo(endX, endY);
        this.ctx.lineTo(
          endX - headLength * Math.cos(angle + Math.PI / 6),
          endY - headLength * Math.sin(angle + Math.PI / 6),
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
