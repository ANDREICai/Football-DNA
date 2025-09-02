// GlassCard.js
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlassCard({ children, className = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    gsap.fromTo(
      el,
      { y: 30, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 50%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full max-w-3xl sm:max-w-5xl lg:max-w-6xl px-6 py-10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg text-white text-center transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}
