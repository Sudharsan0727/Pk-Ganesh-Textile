import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const phoneNumber = "918072572195";

function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  const openWhatsApp = (msg = "Hi, I would like to inquire about your collections.") => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Our Showroom",
      details: ["70, East Perumal Maistry Street,", "Vilakkuthoon, Madurai - 625001"],
      link: "https://maps.google.com/?q=PK+Ganesh+Tex+Madurai"
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Phone & WhatsApp",
      details: ["+91 80725 72195", "+91 94433 12345"],
      link: `tel:+918072572195`
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email Inquiries",
      details: ["pkganeshtex@gmail.com", "sales@pkganeshtex.com"],
      link: "mailto:pkganeshtex@gmail.com"
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      link: null
    }
  ];

  return (
    <div className="font-body text-slate-900 bg-white min-h-screen">
      <Navbar />

      {/* Image Hero Section (Collections Style) */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Us" 
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
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block">Connect With Us</span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-none">
              Get in <span className="text-secondary italic">Touch</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto">
              Whether you're looking for wholesale partnerships or seeking the perfect weave, our heritage experts are here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative"
            >
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Wholesale Partnership</option>
                    <option>Custom Order</option>
                    <option>Order Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                  <textarea 
                    required
                    rows="5"
                    placeholder="Tell us what you're looking for..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                    formState === 'success' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-primary text-white hover:bg-slate-900 shadow-xl shadow-primary/20'
                  }`}
                >
                  {formState === 'idle' && <><Send size={16} /> Send Inquiry</>}
                  {formState === 'sending' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {formState === 'success' && <><CheckCircle2 size={18} /> Message Sent Successfully</>}
                </button>
              </form>

              {/* Quick WhatsApp Link */}
              <div className="mt-10 pt-10 border-t border-slate-50 text-center">
                <p className="text-xs text-slate-400 font-medium mb-4">Prefer instant chat?</p>
                <button 
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center gap-3 text-[#007a33] font-bold text-sm hover:scale-105 transition-transform"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>

            {/* Right Column: Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    {info.icon}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((line, idx) => (
                      <p key={idx} className="text-slate-900 font-bold text-base leading-relaxed">{line}</p>
                    ))}
                  </div>
                  {info.link && (
                    <a 
                      href={info.link} 
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      className="inline-block mt-6 text-primary text-[10px] font-black uppercase tracking-widest border-b-2 border-primary/10 hover:border-primary transition-all pb-0.5"
                    >
                      View Details
                    </a>
                  )}
                </motion.div>
              ))}

              {/* Large Map Card */}
              <div className="sm:col-span-2 mt-4 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 h-[300px] relative group">
                <iframe 
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1264421111!2d78.12211!3d9.919702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xe9f7fcb1d227d!2sEast%20Perumal%20Maistry%20St%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-[1.1] brightness-[0.95] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-900">Get Directions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 text-[20vw] font-heading font-black text-slate-200/40 select-none pointer-events-none -translate-y-1/2 -translate-x-10">
          Heritage
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl md:text-4xl font-heading font-bold text-slate-800 leading-tight mb-8 italic">
            "Authenticity is the foundation of every weave we create. Visit our showroom to witness the legacy of Madurai's finest textiles."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The PK Ganesh Legacy</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
