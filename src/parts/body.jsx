import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WindowMaskTransition = ({
  initialMask = 200,
  finalMask = 1400,
  initialScale = 1,
  finalScale = 1.3,
  leftText = "Create",
  rightTextTop = "The",
  rightTextBottom = "Future",
  scrollDistanceMultiplier = 1.5,
  nextSectionContent,
}) => {
  const maskRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const frameRef = useRef(null);
  const nextSectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: maskRef.current,
        start: "top top",
        end: `+=${window.innerHeight * scrollDistanceMultiplier}`,
        scrub: true,
      },
    });

    // Mask expansion
    tl.to(maskRef.current, {
      maskImage: `radial-gradient(circle ${finalMask}px at center, black 100%, transparent 100%)`,
      WebkitMaskImage: `radial-gradient(circle ${finalMask}px at center, black 100%, transparent 100%)`,
      ease: "none",
    }, 0);

    // Background zoom
    tl.to(bgRef.current, { scale: finalScale, ease: "none" }, 0);

    // Typography fade out
    tl.to(textRef.current, { opacity: 0, ease: "none" }, 0);

    // Window frame fade
    tl.to(frameRef.current, { opacity: 0, ease: "none" }, 0);

    // Fade in next section
    if (nextSectionRef.current) {
      tl.fromTo(nextSectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power1.out" },
        0.7 // start fade in near end of scroll
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, [finalMask, finalScale, scrollDistanceMultiplier]);

  return (
    <div className="wrapper relative w-full" style={{ height: '300vh' }}>
      {/* Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Masked Environment */}
      <div
        ref={maskRef}
        className="fixed inset-0 z-10"
        style={{
          WebkitMaskImage: `radial-gradient(circle ${initialMask}px at center, black 100%, transparent 100%)`,
          maskImage: `radial-gradient(circle ${initialMask}px at center, black 100%, transparent 100%)`,
        }}
      >
        {/* Background that zooms */}
        <div
          ref={bgRef}
          className="w-full h-[100vh] bg-gradient-to-b from-blue-300 via-orange-200 to-purple-300 relative transform-gpu"
          style={{ scale: initialScale }}
        ></div>
      </div>

      {/* Window Frame */}
      <div
        ref={frameRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        style={{ opacity: 1 }}
      ></div>

      {/* Typography */}
      <div
        ref={textRef}
        className="fixed inset-0 flex items-center pointer-events-none z-30"
        style={{ opacity: 1 }}
      >
        <div className="absolute left-16 text-white">
          <h1 className="text-9xl font-bold tracking-wide" style={{ fontFamily: 'serif' }}>
            {leftText}
          </h1>
        </div>

        <div className="absolute right-16 text-white text-right">
          <h2 className="text-7xl font-bold leading-tight">{rightTextTop}</h2>
          <h2 className="text-9xl font-bold leading-tight">{rightTextBottom}</h2>
        </div>
      </div>

      {/* Next Section */}
      <div
        ref={nextSectionRef}
        className="relative w-full h-screen flex items-center justify-center z-40 bg-white text-black text-4xl font-bold"
      >
        {nextSectionContent || "Next Section Content Here"}
      </div>

      {/* Title */}
      <div className="fixed top-8 left-8 text-white text-2xl font-bold pointer-events-none z-35">
        ScrollTrigger Image Zoom <span className="text-green-400">(GSAP)</span>
      </div>
    </div>
  );
};

export default WindowMaskTransition;
