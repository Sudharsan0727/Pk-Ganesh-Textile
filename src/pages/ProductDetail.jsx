import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  ArrowLeft, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Maximize2,
  ChevronRight,
  Info,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const phoneNumber = "918072572195";

function ProductDetail() {
  console.log("ProductDetail Mounting");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      console.log("Fetching data for ID:", id);
      setLoading(true);
      try {
        const [prodRes, allRes] = await Promise.all([
          fetch(`http://localhost:5000/api/products/${id}`),
          fetch('http://localhost:5000/api/products')
        ]);
        
        console.log("Response status:", prodRes.status);
        if (!prodRes.ok) throw new Error('Product not found');
        
        const prodData = await prodRes.json();
        const allData = await allRes.json();
        console.log("Product Data received:", prodData);
        
        setProduct(prodData);
        setRelatedProducts(allData.filter(p => 
          p.categoryId === prodData.categoryId && p.id !== prodData.id
        ));
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (loading) {
    console.log("Rendering Loading State");
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Masterpiece...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    console.log("Rendering Not Found State");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Product Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">The product you are looking for doesn't exist or has been moved to our archives.</p>
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-primary/20">
          Return to Home
        </Link>
      </div>
    );
  }

  console.log("Rendering Product Detail");
  const openWhatsApp = () => {
    const message = `Hi, I am interested in ${product.name} (Code: ${product.id}). Please provide more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="font-body text-slate-900 bg-white min-h-screen selection:bg-primary selection:text-white">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50/50 py-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/#categories" className="hover:text-primary transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Compact Product Showcase (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden group shadow-2xl shadow-slate-200/40 border border-slate-100"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                fetchpriority="high"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-8 right-8">
                <button className="bg-white/80 backdrop-blur-md p-4 rounded-full text-slate-900 shadow-xl hover:bg-white transition-all transform hover:rotate-90">
                  <Maximize2 size={20} />
                </button>
              </div>
              
              <div className="absolute bottom-8 left-8">
                <div className="bg-slate-950/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Article PKG-{product.id}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bento Detail Panel (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Header Card */}
              <div className="bg-slate-50/50 p-6 md:p-10 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/5 px-3 py-1 rounded-full">
                      {product.category?.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Premium Selection</span>
                  </div>
                  
                  <h1 className="text-2xl md:text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tighter">
                  {product.name}
                </h1>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <p className="text-lg md:text-2xl font-bold text-primary">{product.price}</p>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wholesale Inquiry</span>
                  </div>
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                  <p className="text-[9px] font-black text-secondary uppercase tracking-[0.3em]">Masterpiece Narrative</p>
                  <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                    {product.description || `Experience the pinnacle of textile craftsmanship with the ${product.name}. This premium selection from P.K. Ganesh Tex represents our commitment to quality, durability, and timeless style, meticulously curated for the most discerning collections.`}
                  </p>
                </div>

                {/* Technical Profile Card */}
                <div className="bg-slate-950 text-white p-6 md:p-8 rounded-[2rem] shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <h4 className="text-[10px] font-heading font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
                    <Info size={14} className="text-secondary" /> Profile
                  </h4>
                    <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">PKG Spec</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Fabrication", value: "Premium" },
                      { label: "Density", value: "High-Tensile" },
                      { label: "Region", value: "Tamil Nadu" }
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{spec.label}</span>
                        <span className="text-[11px] font-bold text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heritage & Logistics Card */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <CheckCircle2 size={16} className="text-secondary" />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em] leading-tight">Heritage Madurai <br/>Wholesale</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Truck size={16} className="text-secondary" />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em] leading-tight">Nationwide <br/>Logistics Ready</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Quality Guarantee Since 2013</p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={openWhatsApp}
                  className="flex-[2] bg-slate-950 hover:bg-primary text-white py-6 px-8 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group shadow-xl shadow-slate-200"
                >
                  <MessageCircle size={24} className="transition-transform group-hover:scale-125" /> 
                  Inquire Now
                </button>
                <button 
                  onClick={() => {
                    const message = `Hi, I am interested in the full catalog of P.K. Ganesh Tex. Could you please share it?`;
                    window.open(`https://wa.me/919443315664?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-900 py-6 px-8 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  Catalog
                </button>
              </div>
            </motion.div>
          </div>
        </div>


        {/* Related Collections */}
        <section className="mt-32 pt-24 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary">Discover More</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">Similar Masterpieces</h2>
            </div>
            <Link to="/collections/all" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary hover:gap-6 transition-all group">
              View All Collections <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
             {relatedProducts
               .slice(0, 4)
               .map((p, idx) => (
                 <motion.div
                   key={p.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                 >
                   <Link 
                     to={`/product/${p.id}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group block space-y-6"
                   >
                     <div className="aspect-[3/4] overflow-hidden bg-slate-50 rounded-[2rem] shadow-sm group-hover:shadow-xl transition-all duration-500 border border-slate-100">
                       <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     </div>
                     <div className="space-y-2 px-2 text-center md:text-left">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{p.brand}</p>
                        <h4 className="text-lg font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{p.name}</h4>
                       <p className="text-sm text-primary font-bold">{p.price}</p>
                     </div>
                   </Link>
                 </motion.div>
             ))}
             {relatedProducts.length === 0 && (
               <div className="col-span-full py-20 bg-slate-50 rounded-3xl text-center">
                 <p className="text-slate-400 font-medium italic">No similar pieces found in this category.</p>
               </div>
             )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky Action Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white/80 backdrop-blur-xl border-t border-slate-200 p-4 pb-8 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          >
            <button 
              onClick={() => {
                const message = `Hi, I am interested in the full catalog of P.K. Ganesh Tex. Could you please share it?`;
                window.open(`https://wa.me/919443315664?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200"
            >
              Catalog
            </button>
            <button 
              onClick={openWhatsApp}
              className="flex-[2] bg-primary text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <MessageCircle size={18} /> Inquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductDetail;
