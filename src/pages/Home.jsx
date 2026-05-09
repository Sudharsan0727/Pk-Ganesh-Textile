import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowRight,
  Truck,
  Shield,
  Tag,
  Award
} from 'lucide-react';
import { products, categories } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoPopup from '../components/PromoPopup';
import slideImage1 from '../assets/Pattu Sarees/Pattu Sarees_1.webp';
import slideImage2 from '../assets/Shirt_Collection_Banner.webp';
import slideImage3 from '../assets/Banarasi Sarees/Banarasi Sarees_1.webp';
import slideImage4 from '../assets/Baby Gift Items/Baby Gift Items_1.webp';
import brand1 from '../assets/clients/ramraj_logo.avif';
import brand2 from '../assets/clients/NANDU-BRAND.avif';
import brand3 from '../assets/clients/Alaya_logo.webp';
import brand4 from '../assets/clients/uathaya.webp';
import brand5 from '../assets/clients/Raymond.webp';
import brand6 from '../assets/clients/siyarams-logo.webp';

const phoneNumber = "918072572195";

const heroSlides = [
  {
    image: slideImage1,
    subtitle: "PREMIUM TRADITION",
    title: "Exquisite Pattu \n& Silk Collections",
    desc: "Direct wholesale of premium Kanchipuram and Art Silks for weddings and festivals.",
    cta: "View Sarees"
  },
  {
    image: slideImage2,
    subtitle: "MODERN SELECTIONS",
    title: "Premium Shirt \nCollections",
    desc: "Neatly tailored, high-quality shirts in a wide variety of colors and fabrics. Perfect for wholesale retail showrooms.",
    cta: "Explore Shirts"
  },
  {
    image: slideImage3,
    subtitle: "ROYAL ELEGANCE",
    title: "Exquisite Banarasi \nSaree Category",
    desc: "Timeless Banarasi weaves with intricate zari work, perfect for bridal and festive wear.",
    cta: "Explore Banarasi"
  },
  {
    image: slideImage4,
    subtitle: "NEWBORN GIFTS",
    title: "Premium Baby \nGift Combo Kits",
    desc: "Beautifully packaged dress kits and essential items for newborn gifting.",
    cta: "View Baby Kits"
  }
];


const brands = [
  { name: "Ramraj Cotton", logo: brand1 },
  { name: "Nandu", logo: brand2 },
  { name: "Alaya Cotton", logo: brand3 },
  { name: "Uathayam", logo: brand4 },
  { name: "Raymond", logo: brand5 },
  { name: "Siyaram", logo: brand6 }
];

const features = [
  "Trusted Wholesale Dealer in Madurai",
  "High-Quality Fabrics & Garments",
  "Wide Variety of Collections",
  "Competitive Retail & Wholesale Pricing"
];

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    // Handle scrolling to sections if hash is present
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Fetch live categories from backend
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setFetchedCategories(data);
          // Only set active tab if not already interacting
          if (activeTab === 'All') setActiveTab(data[0].name);
        }
      })
      .catch(err => console.error("Failed to fetch categories:", err));

    // Fetch live products from backend
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data) setFetchedProducts(data);
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const displayCategories = fetchedCategories.length > 0 ? fetchedCategories : categories;
  const displayProducts = fetchedProducts.length > 0 ? fetchedProducts : products;

  const filteredProducts = activeTab === "All" 
    ? displayProducts 
    : displayProducts.filter(p => {
        const catName = typeof p.category === 'object' ? p.category?.name : p.category;
        return catName === activeTab;
      });

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

  // Helper to safely get image
  const getImageUrl = (img) => img || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop';

  return (
    <div className="font-body text-slate-800 bg-accent min-h-screen relative">
      <Navbar />
      <PromoPopup />

      {/* Circular Categories Header - FULL WIDTH */}
      <div className="bg-white border-b border-slate-100 overflow-hidden w-full transition-all duration-300">
        <div className="w-full overflow-hidden relative group max-w-7xl mx-auto px-4 py-4 md:py-6">
           <div 
             id="category-scroll"
             className="flex gap-8 md:gap-14 overflow-x-auto no-scrollbar scroll-smooth"
           >
             {displayCategories.map((cat, i) => (
               <motion.div 
                 key={cat.id || i} 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group" 
                 onClick={() => navigate(`/collections/${cat.slug || cat.name.toLowerCase()}`)} 
               >
                 <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border border-slate-200 p-0.5 group-hover:border-primary transition-all transform group-hover:scale-105 bg-slate-50 shadow-sm">
                   <img src={getImageUrl(cat.image)} alt={cat.name} loading="lazy" className="w-full h-full object-cover rounded-full" />
                 </div>
                 <span className="text-[9px] md:text-[10px] font-bold text-slate-600 group-hover:text-primary transition-colors uppercase tracking-tight">
                   {cat.name}
                 </span>
               </motion.div>
             ))}
           </div>
           
           <button 
             onClick={() => document.getElementById('category-scroll').scrollLeft -= 250}
             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg p-2 rounded-full text-slate-400 hover:text-primary md:flex hidden z-10 border border-slate-100"
           >
             <ChevronLeft size={18} />
           </button>
           <button 
             onClick={() => document.getElementById('category-scroll').scrollLeft += 250}
             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg p-2 rounded-full text-slate-400 hover:text-primary md:flex hidden z-10 border border-slate-100"
           >
             <ChevronRight size={18} />
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
              fetchpriority="high"
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
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl font-light leading-relaxed hidden md:block">
                {heroSlides[currentSlide].desc}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4 mb-10 md:mb-0 w-full max-w-md md:max-w-none px-4 md:px-0">
                <a href="#categories" className="bg-secondary hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-full font-bold transition-all shadow-lg text-sm md:text-base text-center flex items-center justify-center">
                  Browse Collection
                </a>
                <button onClick={() => openWhatsApp()} className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg text-sm md:text-base flex items-center justify-center gap-2">
                  <MessageCircle size={20} className="md:w-[22px] md:h-[22px]" /> Order via WhatsApp
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">New Arrivals</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight relative inline-block">
                Recent <span className="text-secondary italic relative">
                  Collection
                  <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 text-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {displayProducts.slice(0, 6).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer flex flex-col items-center text-center"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden rounded-xl w-full aspect-square mb-5 shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
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
                <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest mb-1">
                  {typeof product.category === 'object' ? product.category?.name : product.category}
                </p>
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
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">The Collections</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight relative inline-block">
               Shop by <span className="text-secondary italic relative">
                 Category
                 <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 text-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                   <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                 </svg>
               </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {displayCategories.map((cat, i) => (
              <motion.div 
                key={cat.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group cursor-pointer text-center"
                onClick={() => navigate(`/collections/${cat.slug || cat.name.toLowerCase()}`)}
              >
                <div className="relative mx-auto w-full aspect-square max-w-[240px] mb-4">
                  {/* Decorative Outer Circle */}
                  <div className="absolute inset-[-10px] border border-slate-100 rounded-full group-hover:inset-[-15px] group-hover:border-primary/30 transition-all duration-500"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xl shadow-slate-200/50">
                    <img 
                      src={getImageUrl(cat.image)} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900 mb-1.5 group-hover:text-primary transition-colors tracking-tight">
                  {cat.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 py-1.5 px-4 bg-slate-50 rounded-full group-hover:bg-primary/10 transition-colors">
                   <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary">View Collection</span>
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
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Favorites</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight relative inline-block">
              Most <span className="text-secondary italic relative">
                Popular
                <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 text-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8 px-1 md:px-0">

              {displayCategories.slice(0, 5).map(cat => (
                <button 
                  key={cat.id || cat.name}
                  onClick={() => setActiveTab(cat.name)}
                  className={`px-4 py-1.5 md:py-2 rounded-full font-medium transition-all text-xs md:text-base border ${activeTab === cat.name ? "bg-primary text-white shadow-md border-primary" : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 4).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-primary/10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all group flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black text-primary shadow-sm uppercase tracking-widest">
                    {product.brand}
                  </div>
                </div>
                
                <div className="px-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-heading font-black text-slate-400 uppercase tracking-[0.2em]">
                    {typeof product.category === 'object' ? product.category?.name : product.category}
                  </h3>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="text-[13px] font-bold text-primary mb-6 flex items-center gap-3">
                      <span className="w-6 h-[1.5px] bg-primary/30"></span>
                      {product.price}
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); openWhatsApp(product.name); }}
                      className="w-full py-4 px-6 bg-slate-900 hover:bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/5 hover:shadow-primary/20"
                    >
                      <MessageCircle size={18} /> WhatsApp Inquiry
                    </button>
                  </div>
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


      {/* Brands Section - Marquee Style */}
      <section className="py-12 bg-white border-y border-slate-100 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-slate-400 font-black">Our Elite Manufacturing Partners</p>
        </div>
        
        <div className="relative flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex whitespace-nowrap"
          >
            {/* Double the array for seamless infinite scroll */}
            {[...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className="inline-flex items-center justify-center w-40 md:w-64 h-24 md:h-32 px-8 md:px-12 transition-all duration-500 hover:scale-110"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Fade Overlays for edges */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-accent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">The P.K. Ganesh Legacy</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight relative inline-block mb-10">
                Why <span className="text-secondary italic relative">
                  Choose Us?
                  <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 text-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
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

      <Footer />
    </div>
  );
}

export default Home;
