import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import logoImg from '../assets/pklogo1.webp';

const phoneNumber = "918072572195";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (!isHome) {
      navigate(`/#${sectionId}`);
      // The useEffect in Home.jsx or a small timeout might be needed to scroll after navigation
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hi, I would like to know more about your collections.")}`, '_blank');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 text-[9px] md:text-xs font-bold font-heading tracking-[0.1em] uppercase relative z-[60]">
        Shipping All Over India from Tamil Nadu | Shop Now
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src={logoImg} alt="P.K. Ganesh Tex Logo" className="h-12 md:h-18 w-auto object-contain" />
            </Link>
            
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/about" className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider">About</Link>
              <Link 
                to="/collections" 
                className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider"
              >
                Collections
              </Link>
              <Link 
                to="/shop" 
                className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider"
              >
                Shop
              </Link>
              <Link 
                to="/contact" 
                className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider"
              >
                Contact
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-secondary shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">About</Link>
              <Link to="/collections" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Collections</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Shop</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
