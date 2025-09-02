import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScrollWrapper({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef();
  const location = useLocation(); // Track current route

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    lenisRef.current = new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
    });

    setLenisInstance(lenisRef.current);

    function raf(time) {
      lenisRef.current.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial refresh
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => lenisRef.current.destroy();
  }, []);

  // Step C: Refresh ScrollTrigger on route change
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]); // runs every time route changes

  if (!lenisInstance) return null;

  return <div id="smooth-content">{children}</div>;
}
