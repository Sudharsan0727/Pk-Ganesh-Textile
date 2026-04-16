import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  ArrowLeft, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RefreshCcw 
} from 'lucide-react';
import { products } from '../data/products';
import logoImg from '../assets/pklogo1.png';

const phoneNumber = "918072572195";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-accent px-4 text-center">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">Product Not Found</h2>
        <p className="text-slate-600 mb-8">The product you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-medium transition-all shadow-md">
          Back to Home
        </Link>
      </div>
    );
  }

  const openWhatsApp = () => {
    const message = `Hi, I am interested in ${product.name} (Code: ${product.id}). Please provide more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-body text-slate-800 bg-accent min-h-screen">
      {/* Navbar - Simple Version */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src={logoImg} alt="P.K. Ganesh Tex Logo" className="h-12 w-auto object-contain" />
            </Link>
            <button 
              onClick={() => navigate(-1)} 
              className="text-slate-600 hover:text-primary flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft size={20} /> Back
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square"
            />
          </motion.div>

          {/* Product Content */}
          <div className="flex flex-col h-full">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.brand}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-3xl font-bold text-primary mb-6">
                {product.price}
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-secondary">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-semibold text-slate-800">Authentic Quality</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-secondary">
                    <Truck size={24} />
                  </div>
                  <span className="font-semibold text-slate-800">Wholesale Price</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={openWhatsApp}
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02]"
                >
                  <MessageCircle size={24} /> Inquiry on WhatsApp
                </button>
                <button 
                  onClick={() => window.print()}
                  className="bg-white hover:bg-slate-50 text-slate-700 py-4 px-8 rounded-2xl font-bold border border-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
               initial="hidden"
               animate="visible"
               variants={{
                 hidden: { opacity: 0 },
                 visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
               }}
               className="border-t border-slate-200 pt-8 mt-auto"
            >
               <h3 className="text-xl font-bold mb-6">Product Highlights</h3>
               <div className="space-y-4">
                  {[
                    "Sourced directly from certified manufacturers",
                    "Traditional weaving patterns with modern durability",
                    "Bulk ordering discount available for wholesalers",
                    "Fast shipping across Tamil Nadu"
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 text-slate-600">
                       <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                       <span>{item}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Products Placeholder */}
        <section className="mt-24">
          <h2 className="text-3xl font-heading font-bold text-primary mb-10">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-60 pointer-events-none">
             {products.slice(0, 4).map(p => (
               <div key={p.id} className="bg-white rounded-2xl h-64 border border-slate-100 animate-pulse"></div>
             ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <img src={logoImg} alt="P.K. Ganesh Tex" className="h-12 mx-auto mb-6 opacity-80" />
           <p className="text-slate-400 max-w-md mx-auto mb-8">Premium Wholesale Textiles in Madurai. Trusted for over a decade.</p>
           <div className="flex justify-center gap-6 mb-8 text-slate-400">
              <a href="#" className="hover:text-secondary">Terms</a>
              <a href="#" className="hover:text-secondary">Privacy</a>
              <a href="#" className="hover:text-secondary">Shipping</a>
           </div>
           <p className="text-slate-600 text-sm">© {new Date().getFullYear()} P.K. Ganesh Tex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ProductDetail;
