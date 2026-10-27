import { useEffect, useRef } from "react";

// Animated "neural network" backdrop: drifting nodes linked when close,
// with links near the cursor lit up. Static when reduced motion is preferred.
export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mouse = { x: -9999, y: -9999 };
        let nodes = [];
        let raf;
        let w, h, dpr;

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.round(Math.min(90, (w * h) / 16000));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.4 + 0.6,
                hue: Math.random() < 0.65 ? "255, 138, 76" : "157, 123, 255",
            }));
        };

        const LINK = 130;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < LINK) {
                        const mx = (a.x + b.x) / 2 - mouse.x;
                        const my = (a.y + b.y) / 2 - mouse.y;
                        const near = Math.hypot(mx, my) < 160;
                        const alpha = (1 - d / LINK) * (near ? 0.5 : 0.13);
                        ctx.strokeStyle = `rgba(${a.hue},${alpha})`;
                        ctx.lineWidth = near ? 0.9 : 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (const n of nodes) {
                ctx.fillStyle = `rgba(${n.hue},0.75)`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const step = () => {
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            }
            draw();
            raf = requestAnimationFrame(step);
        };

        const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove, { passive: true });
        if (reduced) draw(); else step();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 opacity-70"
        />
    );
}
