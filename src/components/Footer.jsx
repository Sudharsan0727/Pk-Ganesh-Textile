import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, MessageCircle, Camera, Share2, Mail, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import logoImg from '../assets/pklogo1.webp';

const phoneNumber = "918072572195";

function Footer() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  const openWhatsApp = (message = "Hi, I would like to know more about your collections.") => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-16 pb-10 overflow-hidden font-body">
      {/* Decorative Textile Border Top */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
      
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start pb-12 border-b border-white/5">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block group">
              <img src={logoImg} alt="PK Ganesh Tex" className="h-20 brightness-0 invert transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed font-light italic">
              "Preserving the timeless heritage of Madurai's textile excellence. Weaving stories of elegance and trust since 2013."
            </p>
            <div className="flex gap-5 pt-2">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: Share2, label: "Facebook" },
                { icon: MessageCircle, label: "WhatsApp", action: openWhatsApp }
              ].map((social, i) => (
                <button 
                  key={i}
                  onClick={social.action ? () => social.action() : undefined}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-slate-400 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Heritage Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12 lg:pt-4">
            <div className="space-y-8">
              <h4 className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] opacity-60">Collection</h4>
              <ul className="space-y-5">
                {['Silk Sarees', 'White Shirts', 'Dhotis', 'Handlooms'].map(link => (
                  <li key={link}>
                    <Link to="/shop" className="text-slate-500 hover:text-white transition-all hover:translate-x-1 inline-block text-sm font-medium">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] opacity-60">Company</h4>
              <ul className="space-y-5">
                {['Our Story', 'Boutique', 'Contact', 'Wholesale'].map(link => (
                  <li key={link}>
                    <Link to={link === 'Our Story' ? '/about' : '/contact'} className="text-slate-500 hover:text-white transition-all hover:translate-x-1 inline-block text-sm font-medium">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Highlight */}
          <div className="lg:col-span-4 space-y-8 bg-white/[0.03] p-10 rounded-[2.5rem] backdrop-blur-md border border-white/5">
            <h4 className="text-white font-heading font-bold text-2xl tracking-tight">Visit Our Heritage Store</h4>
            <div className="space-y-6">
              <div className="flex gap-5">
                <MapPin size={22} className="text-primary shrink-0 mt-1" />
                <p className="text-slate-400 text-base leading-relaxed">
                  70, East Perumal Maistry Street,<br/>
                  Vilakkuthoon, Madurai - 625001
                </p>
              </div>
              <div className="flex gap-5">
                <PhoneCall size={22} className="text-primary shrink-0" />
                <p className="text-slate-400 text-base font-medium">+91 80725 72195</p>
              </div>
            </div>
            <button 
              onClick={() => openWhatsApp()}
              className="w-full py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-2xl shadow-primary/40 active:scale-[0.98]"
            >
              Inquiry on WhatsApp
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] order-2 md:order-1">
            &copy; {new Date().getFullYear()} P.K. Ganesh Tex &bull; <span className="text-slate-700">Madurai Heritage Since 2013</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 order-1 md:order-2">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <div className="flex items-center gap-4">
              <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
              <span className="font-medium text-slate-500 lowercase normal-case tracking-normal">Digital by <a href="https://nextodigital.in/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors font-bold">Nexto Digital</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button (Same as before but cleaner) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openWhatsApp()}
        className={`fixed right-6 bottom-8 md:bottom-10 md:right-10 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl flex items-center justify-center group ${isProductPage ? 'bottom-28' : ''}`}
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
    </footer>
  );
}

export default Footer;
