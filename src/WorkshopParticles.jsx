import { useEffect, useRef } from "react";

const COLORS = [
  "#FF6B6B", "#FF9F43", "#FECA57", "#48DBFB",
  "#1DD1A1", "#A29BFE", "#FD79A8", "#6C5CE7",
  "#00CEC9", "#FDCB6E",
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(w, h) {
  return {
    x: randomBetween(0, w),
    y: randomBetween(0, h),
    r: randomBetween(2, 5),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedX: randomBetween(-0.35, 0.35),
    speedY: randomBetween(-0.5, -0.12),
    opacity: randomBetween(0.45, 0.85),
    wobble: randomBetween(0, Math.PI * 2),
    wobbleSpeed: randomBetween(0.008, 0.022),
  };
}

export default function WorkshopParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 60 }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY;

        if (p.y + p.r < 0) {
          p.y = h + p.r;
          p.x = randomBetween(0, w);
        }
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    tick();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
