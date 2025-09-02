import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const initialCards = [
    { id: 1, title: "Card 1", content: "This is the first card hello this is a card ..." },
    { id: 2, title: "Card 2", content: "This is the second card ..." },
    { id: 3, title: "Card 3", content: "This is the third card ..." },
    { id: 4, title: "Card 4", content: "This is the fourth card ..." },
    { id: 5, title: "Card 5", content: "This is the fifth card ..." },
  ];

  const [cards, setCards] = useState(initialCards);
  const [swiping, setSwiping] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const swipeCard = (cardId) => {
    if (swiping) return;
    setSwiping(true);

    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((c) => c.id === cardId);
      const [moved] = newCards.splice(index, 1);
      newCards.push(moved);
      return newCards;
    });

    setTimeout(() => setSwiping(false), 400);
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-20 min-h-screen bg-gray-900">
      <h2 className="text-8xl font-bold text-white mb-35 mt-15 relative z-10">
        Prices
      </h2>

      <div className="relative w-full max-w-xl h-[500px] overflow-hidden sm:overflow-visible">
        {cards.map((card, i) => {
          const offset = i * 20;
          const scale = 1 - i * 0.03;
          const rotate = (Math.random() - 0.5) * 6;
          const isTop = i === 0;

          return (
<motion.div
  key={card.id}
  className="absolute max-w-xl rounded-3xl p-6 sm:p-12 text-white select-none w-[56vh] sm:w-[70vh]"
  style={{
    top: offset,
    zIndex: cards.length - i,
    rotate,
    background: "linear-gradient(145deg, #0b1f3d, #1c2d55, #0b1f3d)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 0 10px rgba(255,255,255,0.05)",
    backdropFilter: "blur(6px)",
    touchAction: "pan-y",
  }}
  drag={isTop ? "x" : false}
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.3}
  dragMomentum={false}
  onDragStart={() => setShowHint(false)}
  onDragEnd={(e, info) => {
    if (isTop && Math.abs(info.offset.x) > 100) {
      swipeCard(card.id);
    }
  }}
  whileHover={{ scale: isTop ? 1.03 : 1 }}
  animate={{ y: offset, scale, rotate, x: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
>

              {/* Swipe Hint Text on Top Card */}
              {isTop && showHint && (
                <AnimatePresence>
                  <motion.span
                    className="absolute top-4 right-6 text-gray-400 text-base sm:text-lg font-semibold select-none pointer-events-none"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    Swipe →
                  </motion.span>
                </AnimatePresence>
              )}

              <h3 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                {card.title}
              </h3>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                {card.content}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
