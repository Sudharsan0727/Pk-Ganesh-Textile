import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Target, 
  Users, 
  History, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  MapPin,
  MessageCircle,
  ArrowRight,
  Truck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import mainSareeImg from '../assets/Sarees/Sarees_1.webp';
import silkProductImg from '../assets/Pattu Sarees/Pattu Sarees_2.webp';
import powerhouseImg from '../assets/White Shirts/White Shirts_4.webp';

const phoneNumber = "918072572195";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hi, I want to know more about P.K. Ganesh Tex.")}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="font-body text-slate-800 bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={mainSareeImg} alt="Background" className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-left">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <motion.p variants={fadeInUp} className="text-secondary font-semibold tracking-widest uppercase mb-4 text-xs md:text-sm">
              Our Legacy Since 2013
            </motion.p>
            <h1 className="text-4xl md:text-6xl font-bold font-heading leading-snug mb-6 text-white drop-shadow-xl">
              A Legacy of <br/><span className="text-secondary">Excellence</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
              For over a decade, P.K. Ganesh Tex has been at the forefront of Madurai's bustling textile industry, weaving trust and quality into every thread.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Our Story / History */}
      <section id="story" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-secondary font-bold uppercase tracking-widest text-sm mb-4">
                <History size={20} />
                <span>Established Since 2013</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-tight">
                From a Small Venture to a <span className="text-primary">Wholesale Powerhouse</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  P.K. Ganesh Tex started with a simple vision: to provide high-quality textiles directly from manufacturers to the retailers of Tamil Nadu. What began as a focused wholesale unit in the heart of Madurai has grown into a multi-category textile destination.
                </p>
                <p>
                  Our location on East Perumal Maistry Street became more than just an address—it became a symbol of reliability for hundreds of shop owners who demand the best in silks, linens, and cottons.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-4xl font-bold text-primary mb-1">10+</h4>
                  <p className="font-bold text-slate-500 uppercase text-xs tracking-widest">Years of Trust</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary mb-1">500+</h4>
                  <p className="font-bold text-slate-500 uppercase text-xs tracking-widest">B2B Partners</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-accent rounded-3xl -z-10 rotate-3"></div>
              <img 
                src={powerhouseImg} 
                alt="Our Warehouse" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover" 
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary p-4 rounded-xl text-slate-900">
                    <Award size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-xl">Top Wholesale</p>
                    <p className="text-slate-500 font-medium">Dealer Award 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission & Values */}
      <section id="mission" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Our Purpose & Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We are driven by more than just profit; we are driven by the relationships we build and the traditions we preserve.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="text-secondary" size={40} />, 
                title: "Our Mission", 
                desc: "To empower smaller retailers by providing premium textiles at factory prices, ensuring growth through quality products." 
              },
              { 
                icon: <Users className="text-secondary" size={40} />, 
                title: "Community Focus", 
                desc: "We support local weavers and artisans, keeping traditional craftsmanship alive while meeting modern market demands." 
              },
              { 
                icon: <TrendingUp className="text-secondary" size={40} />, 
                title: "Our Vision", 
                desc: "To become the leading textile distribution hub in South India, known for transparency and unwavering quality." 
              }
            ].map((box, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="mb-6">{box.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{box.title}</h3>
                <p className="text-slate-600 leading-relaxed">{box.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us (Infrastructure) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-4xl font-heading font-bold mb-8 text-white">Uncompromising Quality & Huge Variety</h2>
                <div className="space-y-6">
                  {[
                    { title: "Direct Factory Sourcing", desc: "We eliminate middlemen to bring you the best prices directly from the handloom hubs." },
                    { title: "Rigorous Quality Check", desc: "Every roll, dhoti, and saree undergoes a hand-inspection before it reaches you." },
                    { title: "Efficient Supply Chain", desc: "From Madurai to all over India, our shipping networks ensure timely delivery." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="text-secondary" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 h-48 rounded-2xl p-6 flex flex-col justify-end">
                    <ShieldCheck className="text-secondary mb-4" size={32} />
                    <p className="font-bold text-white">100% Cotton Authenticity</p>
                  </div>
                  <div className="bg-white/5 h-64 rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group">
                     <img src={silkProductImg} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Silk Specialist" />
                     <p className="font-bold relative z-10 text-white">Silk Specialist</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/5 h-64 rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden">
                     <img src={powerhouseImg} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                     <p className="font-bold relative z-10">Bulk Inventory</p>
                  </div>
                  <div className="bg-white/5 h-48 rounded-2xl p-6 flex flex-col justify-end">
                    <Truck className="text-secondary mb-4" size={32} />
                    <p className="font-bold">Express B2B Logistics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action / Visit Us */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-8">Ready to Partner with Us?</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Whether you are a retail boutique owner or a bulk fabrics buyer, P.K. Ganesh Tex is here to support your business with premium textiles and reliable service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={openWhatsApp} className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-500/20">
                <MessageCircle size={24} /> Chat with Wholesale Team
              </button>
              <Link to="/#products" className="bg-white text-slate-900 border-2 border-slate-200 hover:border-primary hover:text-primary px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                View Our Catalog <ArrowRight size={24} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
