"use client";

import { useEffect, useRef } from "react";

export default function BubbleTrail() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Keep default cursor visible alongside the bubble

    const handleMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX - 20}px`;
      dot.style.top = `${e.clientY - 20}px`;
      dot.style.opacity = "1";

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea, label");

      if (isClickable) {
        dot.classList.add("bubble-pointer");
      } else {
        dot.classList.remove("bubble-pointer");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 bubble-cursor"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.9) 0%, rgba(67,20,130,0.6) 50%, transparent 100%)",
        boxShadow: "0 0 20px rgba(109,40,217,0.6), 0 0 40px rgba(67,20,130,0.35)",
        transition: "opacity 0.3s",
      }}
    />
  );
}
