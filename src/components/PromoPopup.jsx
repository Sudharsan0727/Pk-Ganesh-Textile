import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Percent } from 'lucide-react';
import promoBg from '../assets/Pattu Sarees/Pattu Sarees_1.webp';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this visit/session
    const hasBeenShown = localStorage.getItem('promo_popup_shown');
    
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark as shown immediately or on close - marking on show is safer to avoid multi-tabs issues
        localStorage.setItem('promo_popup_shown', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white text-white hover:text-primary p-2 rounded-full backdrop-blur-md transition-all shadow-lg"
            >
              <X size={24} />
            </button>

            {/* Content Area */}
            <div className="relative h-80 w-full">
              <img 
                src={promoBg} 
                alt="Promo Background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-secondary p-1.5 rounded-lg text-slate-900">
                    <Percent size={20} />
                  </div>
                  <span className="font-bold text-secondary tracking-widest uppercase text-sm">Limited Time Offer</span>
                </div>
                <h2 className="text-4xl font-heading font-bold mb-1">MEGA SALE</h2>
                <p className="text-xl font-medium opacity-90">Wholesale Discount Extravaganza</p>
              </div>
            </div>

            <div className="p-8 text-center bg-white">
              <div className="flex justify-center gap-6 mb-8 mt-2">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">30%</p>
                  <p className="text-xs uppercase font-bold text-slate-400 tracking-tighter">OFF EVERY ORDER</p>
                </div>
                <div className="w-[1px] bg-slate-100 h-12"></div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-500 mt-2">FOR ORDERS ABOVE</p>
                  <p className="text-2xl font-bold text-secondary">₹5000</p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    closePopup();
                    window.location.href = '#categories';
                  }}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={22} /> Claim Your Discount
                </button>
                <p className="text-xs text-slate-400">Terms & conditions apply. Exclusive for bulk wholesale buyers.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
