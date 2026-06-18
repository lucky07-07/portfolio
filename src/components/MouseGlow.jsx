import { useEffect, useState } from "react";

export default function MouseGlow() {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const update = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", update, { passive: true });
        return () => window.removeEventListener("mousemove", update);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <div
                className="absolute w-[420px] h-[420px] rounded-full"
                style={{
                    left: position.x - 210,
                    top: position.y - 210,
                    background: "radial-gradient(circle, rgba(240,198,116,0.055) 0%, transparent 65%)",
                    filter: "blur(30px)",
                    transition: "left 0.12s ease-out, top 0.12s ease-out",
                }}
            />
        </div>
    );
}
