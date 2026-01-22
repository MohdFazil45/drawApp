export default function initDraw(Canvas:HTMLCanvasElement) {
  const ctx = Canvas.getContext("2d");

  function resize() {
    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  if (!ctx) {
    return;
  }

  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  Canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  Canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      ctx.clearRect(0, 0, Canvas.width, Canvas.height);
      ctx.fillRect(0, 0, Canvas.width, Canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255";
      ctx.strokeRect(startX, startY, width, height);
    }
  });

  Canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    console.log(e.clientX);
    console.log(e.clientY);
  });
}
