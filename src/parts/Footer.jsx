import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-md border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">

        <div className="flex flex-col items-center text-center">
          <img 
            src="DNA.png" 
            alt="Logo" 
            className="w-16 sm:w-20 md:w-28 rounded-full overflow-hidden border-2 border-white mb-5" 
          />
          <p className="text-sm text-gray-400 leading-relaxed">
            Building the future of football.<br />
            Data • Performance • DNA
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold mb-4 text-white text-lg">Follow Us</h3>
          <div className="flex gap-5 text-xl">
            <a href="#" className="hover:text-sky-400 transition-colors duration-300">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"></svg>
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-300">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"></svg>
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Football DNA. All rights reserved.
      </div>
    </footer>
  );
}
