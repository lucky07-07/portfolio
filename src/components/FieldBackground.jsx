import { useEffect, useRef } from "react";

const GAP = 24;

// Hero backdrop: a halftone dot field modulated by slow interfering waves, like
// activations drifting across a feature map. Dots swell near the cursor.
// Draws a single static frame when reduced motion is preferred.
export default function FieldBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mouse = { x: -9999, y: -9999 };
        let raf;
        let w, h;
        let visible = true;
        let last = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const box = canvas.getBoundingClientRect();
            w = box.width;
            h = box.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw(last / 1000);
        };

        function draw(t) {
            ctx.clearRect(0, 0, w, h);
            for (let y = GAP / 2; y < h; y += GAP) {
                for (let x = GAP / 2; x < w; x += GAP) {
                    const v =
                        Math.sin(x * 0.011 + t * 0.55) * Math.cos(y * 0.013 - t * 0.4) +
                        Math.sin((x + y) * 0.007 + t * 0.3);
                    const a = Math.max(0, v) / 2;
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const near = Math.exp(-(dx * dx + dy * dy) / 16000);
                    const r = 0.7 + a * 1.5 + near * 1.8;
                    ctx.fillStyle = near > 0.25
                        ? `rgba(196,83,45,${0.25 + near * 0.55})`
                        : `rgba(24,23,19,${0.07 + a * 0.2})`;
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        const step = (now) => {
            raf = requestAnimationFrame(step);
            if (!visible || now - last < 33) return;
            last = now;
            draw(now / 1000);
        };

        const onMove = (e) => {
            const box = canvas.getBoundingClientRect();
            mouse.x = e.clientX - box.left;
            mouse.y = e.clientY - box.top;
        };

        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
        io.observe(canvas);

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove, { passive: true });
        if (!reduced) raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[105vh] w-full"
            style={{
                maskImage: "radial-gradient(ellipse 75% 70% at 50% 35%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 35%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
            }}
        />
    );
}
