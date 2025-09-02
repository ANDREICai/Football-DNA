import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const logoRef = useRef(null);

  // Hide header on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        logoRef.current &&
        !logoRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Information", path: "/Information" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, type: "spring", stiffness: 500, damping: 30 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.div
          initial={{ y: -120 }}
          animate={{ y: 0 }}
          exit={{ y: -120 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full z-50 pointer-events-none"
        >
          <motion.header className="pointer-events-auto relative w-full flex flex-col items-center rounded-2xl transition-all duration-500">

            {/* Centered Logo */}
            <div className="flex items-center justify-center w-full py-4">
              <motion.div
                ref={logoRef}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full overflow-hidden border-2 border-white cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isMenuOpen ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src="DNA.png" alt="Logo" className="w-full h-full object-contain" />
              </motion.div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="absolute top-full mt-2 flex flex-col items-center gap-3 w-11/12 sm:w-80 md:w-96 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 z-50 pointer-events-auto"
                >
                  {navigationItems.map((item) => (
                    <motion.div key={item.label} variants={itemVariants} className="w-full">
                      <Link
                        to={item.path}
                        className="text-white w-full text-center px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 font-medium block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants} className="w-full">
                    <Link
                      to="/get-started"
                      className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-transform duration-200 hover:scale-105 mt-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Start Your Journey
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.header>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
