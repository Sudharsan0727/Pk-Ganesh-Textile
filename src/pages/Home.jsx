import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Menu, 
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  Tag,
  Award
} from 'lucide-react';
import logoImg from '../assets/pklogo1.png';
import { products, categories } from '../data/products';
import slideImage1 from '../assets/Sarees/1.jpg';
import slideImage2 from '../assets/Sarees/2.png';
import slideImage3 from '../assets/fabric_rolls_1776340931844.png';

const phoneNumber = "918072572195";

const heroSlides = [
  {
    id: 1,
    image: slideImage1,
    subtitle: "Wholesale Textile Traders",
    title: "Premium Textile \nCollections in Madurai",
    desc: "Trusted Quality Fabrics. Wholesale & Retail for over a decade. Experience the finest traditions woven into every thread."
  },
  {
    id: 2,
    image: slideImage2,
    subtitle: "Authentic Silk Sarees",
    title: "Elegance of \nKanchipuram Silks",
    desc: "Discover our breathtaking array of handwoven silk sarees. Perfect for weddings, festivals, and grand occasions."
  },
  {
    id: 3,
    image: slideImage3,
    subtitle: "Premium Fabrics",
    title: "Quality Rolls \n& Custom Textiles",
    desc: "A wide variety of fabric rolls for every need. Bulk orders and custom designs available."
  }
];


const brands = ["Ramraj Cotton", "Nandu", "Alaya Cotton", "Uathayam", "Raymond", "Siyaram"];

const features = [
  "Trusted Wholesale Dealer in Madurai",
  "High-Quality Fabrics & Garments",
  "Wide Variety of Collections",
  "Competitive Retail & Wholesale Pricing"
];

function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById('category-scroll');
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      const scrollAmount = window.innerWidth > 768 ? 160 : 100;
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 50) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, []);

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const openWhatsApp = (productName = "") => {
    const message = productName 
      ? `Hi I am interested in ${productName}` 
      : "Hi, I would like to know more about your collections.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-body text-slate-800 bg-accent min-h-screen relative">
      
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 text-[9px] md:text-xs font-bold font-heading tracking-[0.1em] uppercase relative z-[60]">
        Shipping All Over India from Tamil Nadu | Shop Now
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src={logoImg} alt="P.K. Ganesh Tex Logo" className="h-12 md:h-18 w-auto object-contain" />
            </div>
            
            <div className="hidden md:flex gap-8 items-center">
              <a href="#about" className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider">About</a>
              <a href="#categories" className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider">Collections</a>
              <a href="#products" className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider">Shop</a>
              <a href="#contact" className="font-bold text-sm text-slate-700 hover:text-primary transition-colors uppercase tracking-wider">Contact</a>
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
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">About</a>
              <a href="#categories" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Collections</a>
              <a href="#products" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Shop</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-3 font-medium text-lg w-full text-center hover:text-primary">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Circular Categories Header - FULL WIDTH */}
      <div className="bg-white py-4 md:py-6 border-b border-slate-100 relative shadow-sm z-40 overflow-hidden w-full">
        <div className="w-full overflow-hidden relative group">
           <div 
             id="category-scroll"
             className="flex gap-6 md:gap-14 overflow-x-auto no-scrollbar scroll-smooth px-8 lg:px-12"
           >
             {categories.map((cat, i) => (
               <motion.div 
                 key={cat.id} 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group/item" 
                 onClick={() => { 
                   setActiveTab(cat.name); 
                   document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); 
                 }}
               >
                 <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-slate-200 p-0.5 group-hover/item:border-secondary transition-all transform group-hover/item:scale-105 bg-slate-50">
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                 </div>
                 <span className="text-[9px] md:text-[10px] font-bold text-slate-800 text-center max-w-[70px] md:max-w-[110px] leading-tight uppercase tracking-tight group-hover/item:text-secondary transition-colors">
                   {cat.name}
                 </span>
               </motion.div>
             ))}
           </div>
           
           {/* Navigation Buttons for Horizontal Scroll */}
           <button 
             onClick={() => document.getElementById('category-scroll').scrollLeft -= 200}
             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg p-2 rounded-full text-slate-400 hover:text-primary md:flex hidden z-10 border border-slate-100"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
             onClick={() => document.getElementById('category-scroll').scrollLeft += 200}
             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg p-2 rounded-full text-slate-400 hover:text-primary md:flex hidden z-10 border border-slate-100"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative pt-12 md:pt-20 pb-32 lg:pb-48 overflow-hidden min-h-[70vh] flex items-center"
      >
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <motion.img 
              src={heroSlides[currentSlide].image} 
              alt="Background" 
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "easeOut" }}
              className="w-full h-full object-cover object-center absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/60 md:bg-black/40 bg-gradient-to-r from-black/80 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.15 } }
              }}
              className="max-w-4xl text-white mt-12 md:mt-0 flex flex-col items-center md:items-start"
            >
              <motion.p variants={fadeInUp} className="text-secondary font-semibold tracking-widest uppercase mb-4 text-xs md:text-sm">
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold font-heading leading-snug mb-6 text-white drop-shadow-xl whitespace-pre-line">
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
                {heroSlides[currentSlide].desc}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-row justify-center md:justify-start gap-2 md:gap-4 mb-10 md:mb-0 w-full px-2 md:px-0">
                <a href="#categories" className="bg-secondary hover:bg-yellow-600 text-slate-900 px-3 md:px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg text-[11px] sm:text-xs md:text-base text-center flex-1 md:flex-none flex items-center justify-center">
                  Browse Collection
                </a>
                <button onClick={() => openWhatsApp()} className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-3 md:px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg text-[11px] sm:text-xs md:text-base flex items-center justify-center gap-1 md:gap-2 flex-1 md:flex-none">
                  <MessageCircle size={16} className="md:w-[22px] md:h-[22px]" /> Order via WhatsApp
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-[-20px] md:bottom-[-50px] w-full left-0 flex justify-center md:justify-start gap-3 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx ? "w-8 h-2.5 bg-secondary" : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Collection Section */}
      <section className="py-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="font-heading text-secondary font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">New Arrivals</h2>
              <p className="text-4xl md:text-4xl font-heading font-semibold text-primary">Recent Collection</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <a href="#products" className="text-primary font-bold border-b-2 border-primary hover:text-secondary hover:border-secondary transition-all pb-1 uppercase tracking-wider text-xs md:text-sm">
                View All Collections
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
            {products.slice(0, 6).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer flex flex-col items-center text-center"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden rounded-xl w-full aspect-square mb-3 shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      View
                    </span>
                  </div>
                  {/* Small absolute badge purely for contrast */}
                  <div className="absolute top-2 left-2 bg-secondary text-[#1e293b] text-[8px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    New
                  </div>
                </div>
                <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest mb-1">{product.category}</p>
                <h3 className="text-xs md:text-sm font-heading font-bold text-slate-900 mb-1 line-clamp-1 px-1">{product.name}</h3>
                <div className="text-xs font-bold text-primary">{product.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Perks Section */}
      <section className="py-16 md:py-20 bg-slate-900 relative z-20 text-white overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-slate-900 to-slate-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">The P.K. Ganesh Advantage</h2>
            <p className="text-3xl md:text-4xl font-heading font-semibold text-white">Why Wholesale Buyers Choose Us</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: <Award size={36} className="text-secondary" />, title: "Premium Quality", desc: "Rigorous quality checks ensure only the finest textiles reach your showroom." },
              { icon: <Tag size={36} className="text-secondary" />, title: "Wholesale Pricing", desc: "Unbeatable B2B price points guaranteed for bulk purchases." },
              { icon: <Shield size={36} className="text-secondary" />, title: "Trusted Legacy", desc: "Over a decade of unwavering trust among top retailers in South India." },
              { icon: <Truck size={36} className="text-secondary" />, title: "Nationwide Shipping", desc: "Swift, secure logistics ensuring timely deliveries across India." }
            ].map((perk, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800/80 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
                  {perk.icon}
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-3">{perk.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Shop by Category</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore our extensive range of premium textiles sorted exactly to your needs.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-square"
                onClick={() => {
                   setActiveTab(cat.name);
                   document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 duration-300"></div>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8">
                  <h3 className="text-2xl font-heading font-semibold text-white drop-shadow-md text-center px-4">{cat.name}</h3>
                  <div className="w-12 h-1 bg-secondary mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-accent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Our Premium Collection</h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8 px-1 md:px-0">
              <button 
                onClick={() => setActiveTab("All")}
                className={`px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-xs md:text-base border ${activeTab === "All" ? "bg-primary text-white shadow-md border-primary" : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.name)}
                  className={`px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-xs md:text-base border ${activeTab === cat.name ? "bg-primary text-white shadow-md border-primary" : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-default hover:shadow-xl transition-all group flex flex-col h-full border border-slate-100 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {product.brand}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">{product.category}</span>
                  <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="text-lg font-semibold text-primary mb-6 mt-auto flex items-center gap-1">
                    {product.price}
                  </div>
                  
                  <button 
                    onClick={() => openWhatsApp(product.name)}
                    className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-auto"
                  >
                    <MessageCircle size={18} /> Order on WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-lg">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white border-y border-slate-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-8">Trusted Partners & Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand, i) => (
              <span key={i} className="text-xl md:text-3xl font-heading font-bold text-slate-300 hover:text-secondary transition-colors duration-300 cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-accent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Why Choose P.K. Ganesh Tex?</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                As a prominent player in the Madurai textile market, we pride ourselves on delivering uncompromising quality directly to your hands.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-secondary bg-yellow-50 p-2 rounded-full">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="font-semibold text-slate-800 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/cat_shirts.png" alt="Wholesale Shop Display" className="w-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-3xl font-heading font-bold mb-2 text-secondary">10+ Years</p>
                  <p className="text-lg font-medium opacity-90">Of Excellence in Textile Trading</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold text-white mb-6">Visit Our Store</h2>
              <p className="text-slate-400 text-lg mb-10">We invite you to our showroom to experience the quality firsthand or order directly via WhatsApp.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-slate-800 p-3 rounded-full text-secondary">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Our Address</h4>
                    <p className="text-slate-300 leading-relaxed max-w-sm">
                      P.K. Ganesh Tex<br/>
                      70, East Perumal Maistry Street,<br/>
                      Vilakkuthoon, Madurai, Tamil Nadu - 625001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-slate-800 p-3 rounded-full text-secondary">
                    <PhoneCall size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Contact Us</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Mobile & WhatsApp: <br/>
                      <a href={`tel:+${phoneNumber}`} className="text-secondary hover:underline">+91 8072572195</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] border border-slate-800 bg-slate-800 flex items-center justify-center">
               <iframe 
                 title="Google Maps Location"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1264421111!2d78.12211!3d9.919702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xe9f7fcb1d227d!2sEast%20Perumal%20Maistry%20St%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} P.K. Ganesh Tex. All rights reserved.</p>
            <p className="text-sm">Designed carefully keeping tradition in mind.</p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => openWhatsApp()}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd59] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all border-4 border-white"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle size={32} />
      </motion.button>
    </div>
  );
}

export default Home;
