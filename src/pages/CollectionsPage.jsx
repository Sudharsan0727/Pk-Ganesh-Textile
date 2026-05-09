import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Box, Layers, ShieldCheck, Loader2 } from 'lucide-react';

function CollectionsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/products')
        ]);
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        setCategories(catRes.ok ? catData : []);
        setProducts(prodRes.ok ? prodData : []);
      } catch (error) {
        console.error("Failed to fetch collections data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get product count for each category
  const getCategoryCount = (categoryName) => {
    return products.filter(p => p.category?.name === categoryName).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Collections Archive</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body text-slate-900 bg-white min-h-screen">
      <Navbar />

      {/* Simple Image Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=2000" 
            alt="Heritage Textiles" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block">Direct Sourced Heritage</span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-none">
              Boutique <span className="text-secondary italic">Archives</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto">
              Explore Madurai's most extensive archive of authentic silks and premium cottons.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid - Homepage Card Style */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer flex flex-col items-center text-center"
              >
                <Link to={`/collections/${cat.slug}`} className="w-full">
                  {/* Image Container - Square Style */}
                  <div className="relative overflow-hidden rounded-xl w-full aspect-square mb-5 shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                    
                    {/* View Button Overlay - Home Style */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/90 text-primary text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                        View Gallery
                      </span>
                    </div>

                    {/* Technical Style Count Badge */}
                    <div className="absolute top-3 left-3 bg-secondary text-slate-900 text-[8px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-widest">
                      {getCategoryCount(cat.name)} Styles
                    </div>
                  </div>

                  {/* Text Content - Home Style */}
                  <div className="space-y-1">
                    <p className="font-bold text-slate-400 uppercase text-[9px] tracking-[0.25em] mb-1">Premium Collection</p>
                    <h3 className="text-sm md:text-base font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 px-1">
                      {cat.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all">
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary">Explore Now</span>
                      <ArrowRight size={12} className="text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features - Consistent with Home */}
      <section className="py-24 bg-accent/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: <Box size={32} />, title: "Direct Sourcing", desc: "Authentic materials sourced straight from the heritage looms of Madurai." },
              { icon: <ShieldCheck size={32} />, title: "Quality DNA", desc: "Every weave undergoes rigorous technical inspection before archiving." },
              { icon: <Layers size={32} />, title: "Volume Ready", desc: "Precision logistics designed for pan-India wholesale scalability." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6">
                <div className="text-primary bg-white w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center border border-slate-100">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-black uppercase tracking-[0.2em] text-slate-900">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CollectionsPage;
