import { useRef, useState } from "react";

export default function Section2() {
  const venues = [
    {
      name: "Bathgate Xcite",
      image: "bathgate.jpg",
      link: "https://www.google.com/maps/search/bathgate+xcite/@32.688033,-96.8283648,6z",
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-start py-20 bg-gray-900 min-h-[70vh]">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 mt-10 z-10 relative">
        VENUES
      </h1>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl px-4">
        {venues.map((venue, idx) => (
          <TiltCard key={idx} venue={venue} />
        ))}
      </div>
    </section>
  );
}

function TiltCard({ venue }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [boxShadow, setBoxShadow] = useState("0 8px 25px rgba(0,0,0,0.15)");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
    const normalizedY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));
    
    const rotateX = normalizedY * -8;
    const rotateY = normalizedX * 8;
    
    const shadowX = -rotateY * 1.5;
    const shadowY = -rotateX * 1.5;
    
    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    );
    setBoxShadow(
      `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.3)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isInitialized) {
      setIsInitialized(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setBoxShadow("0 10px 30px rgba(0,0,0,0.2)");
  };

  return (
    <a
      href={venue.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer w-80 sm:w-96 border border-gray-700 block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        boxShadow,
        transition: isHovered 
          ? (isInitialized ? "none" : "transform 0.3s ease-out, box-shadow 0.3s ease-out")
          : "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-64 sm:h-80 object-cover rounded-2xl"
        style={{ transform: "translateZ(50px)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white font-bold text-lg sm:text-xl"
        style={{ transform: "translateZ(75px)" }}
      >
        {venue.name}
      </div>
    </a>
  );
}
