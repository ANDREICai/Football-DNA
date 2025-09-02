import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Section3() {
  const arrowRef = useRef(null);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -20,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: arrowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }
  }, []);

  const handleButtonClick = () => {
    const nextSection = document.querySelector("#section2");
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: nextSection },
        ease: "power2.out",
      });
    }
  };

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden text-center px-4">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="fallback.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="test.mp4" type="video/mp4" />
      </video>

      {/* Overlay Layers */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-radial-gradient-circle opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
          Football Coaching
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-white/90">
         Welcome to FootBall DNA West Lothians best 1-1 Football Training
        </p>
        <button
          onClick={handleButtonClick}
          className="mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition transform hover:scale-105"
        >
          Join Now
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-6 sm:bottom-10 flex justify-center w-full z-20"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-white rotate-45 animate-bounce" />
      </div>
    </section>
  );
}
