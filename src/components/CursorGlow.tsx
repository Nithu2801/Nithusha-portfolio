"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.opacity = "1";
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 opacity-0 transition-opacity duration-300"
      style={{
        background: "radial-gradient(circle, rgba(147,0,255,0.10) 0%, rgba(147,0,255,0) 70%)",
      }}
    />
  );
}
