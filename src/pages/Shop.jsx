import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Search,
  Filter,
  ChevronRight,
  Grid,
  List,
  SlidersHorizontal,
  X,
  ArrowRight
} from 'lucide-react';
import { products, categories } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const phoneNumber = "918072572195";

function Shop() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sortRef = useRef(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleActiveFilter = (opt) => {
    setActiveFilters(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  // Filter Logic
  let filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => {
      const searchStr = filter.toLowerCase();
      return p.name.toLowerCase().includes(searchStr) || 
             p.subCategory.toLowerCase().includes(searchStr) || 
             p.description.toLowerCase().includes(searchStr);
    });

    return matchesCategory && matchesSearch && matchesFilters;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sorting Logic
  if (sortBy === 'name-az') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-za') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.id - b.id);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  } else if (sortBy === 'date-new') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = (productName = "") => {
    const message = productName 
      ? `Hi, I am interested in ${productName} from your shop.` 
      : `Hi, I would like to inquire about your products.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categoriesWithAll = [{ id: 'all', name: 'All Collections', slug: 'all' }, ...categories];

  return (
    <div className="font-body text-slate-900 bg-white min-h-screen">
      <Navbar />

      {/* Image Hero Section (Collections Style) */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Textiles" 
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
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block">PK Ganesh Textile</span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-none">
              The <span className="text-secondary italic">Shop</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto">
              Browse our complete archive of premium textiles, from heritage sarees to modern essentials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Shop Interface */}
      <div className="max-w-7xl mx-auto px-4 py-12 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 w-full">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-slate-900"
            >
              <SlidersHorizontal size={18} />
              Filters & Categories
            </button>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {filteredProducts.length} Results
            </p>
          </div>

          {/* Sidebar - Desktop & Mobile Drawer */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.aside 
                initial={window.innerWidth < 1024 ? { x: '-100%' } : { opacity: 1 }}
                animate={window.innerWidth < 1024 ? { x: 0 } : { opacity: 1 }}
                exit={window.innerWidth < 1024 ? { x: '-100%' } : { opacity: 1 }}
                className={`${
                  isSidebarOpen 
                    ? 'fixed inset-0 z-[100] bg-white p-8 overflow-y-auto' 
                    : 'hidden lg:block w-72 shrink-0'
                }`}
              >
                {isSidebarOpen && (
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-6 right-6 p-2 text-slate-900"
                  >
                    <X size={24} />
                  </button>
                )}

                <div className="space-y-10">
                  {/* Categories Filter */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                      Browse Categories <div className="h-px flex-1 bg-slate-100"></div>
                    </h3>
                    <div className="space-y-2">
                      {categoriesWithAll.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.name === 'All Collections' ? 'all' : cat.name);
                            setCurrentPage(1); // Reset to first page
                            if (isSidebarOpen) setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-between group ${
                            (selectedCategory === 'all' && cat.name === 'All Collections') || selectedCategory === cat.name
                              ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                          }`}
                        >
                          {cat.name}
                          <ChevronRight size={14} className={`transition-transform group-hover:translate-x-1 ${
                            (selectedCategory === 'all' && cat.name === 'All Collections') || selectedCategory === cat.name ? 'text-white' : 'text-slate-300'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Within Shop */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                      Search <div className="h-px flex-1 bg-slate-100"></div>
                    </h3>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search for styles..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to first page
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>

                  {/* Styles & Collections */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                      Quick Filters <div className="h-px flex-1 bg-slate-100"></div>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Pure Cotton", "Linen Silk", "Banarasi", "Wholesale", "New Arrival"].map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            toggleActiveFilter(tag);
                            setCurrentPage(1); // Reset to first page
                          }}
                          className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                            activeFilters.includes(tag)
                              ? 'bg-slate-900 text-white'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Support CTA */}
                  <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <h4 className="text-lg font-heading font-bold mb-2 relative z-10">Bulk Order?</h4>
                    <p className="text-slate-400 text-xs mb-6 relative z-10">Contact us directly for wholesale pricing and customized collections.</p>
                    <button 
                      onClick={() => openWhatsApp("Wholesale Inquiry")}
                      className="w-full bg-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all relative z-10"
                    >
                      Chat with Agent
                    </button>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-slate-900">
                  Showing <span className="text-primary">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredProducts.length)}</span> of <span className="text-primary">{filteredProducts.length}</span> results
                </p>
                {activeFilters.length > 0 && (
                  <button 
                    onClick={() => {
                      setActiveFilters([]);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-6">
                {/* View Toggles */}
                <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative" ref={sortRef}>
                  <button 
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:border-primary transition-all"
                  >
                    Sort By: {sortBy.replace('-', ' ')}
                    <ChevronRight size={14} className={`transition-transform duration-300 ${sortOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl z-50 overflow-hidden"
                      >
                        {[
                          { val: 'featured', label: 'Featured' },
                          { val: 'name-az', label: 'Alphabetical A-Z' },
                          { val: 'name-za', label: 'Alphabetical Z-A' },
                          { val: 'price-low', label: 'Price: Low to High' },
                          { val: 'price-high', label: 'Price: High to Low' },
                          { val: 'date-new', label: 'Newest Arrivals' }
                        ].map(opt => (
                          <button
                            key={opt.val}
                            onClick={() => { setSortBy(opt.val); setSortOpen(false); setCurrentPage(1); }}
                            className={`w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                              sortBy === opt.val ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* User Friendly Pagination (Top) - Hidden on Mobile */}
            {totalPages > 1 && (
              <div className="mb-8 hidden md:flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="hidden md:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Page <span className="text-primary">{currentPage}</span> of {totalPages}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
                  >
                    <ChevronRight size={16} className="rotate-180" />
                  </button>
                  
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const pages = [];
                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else {
                        if (currentPage <= 4) {
                          for (let i = 1; i <= 5; i++) pages.push(i);
                          pages.push('...');
                          pages.push(totalPages);
                        } else if (currentPage >= totalPages - 3) {
                          pages.push(1);
                          pages.push('...');
                          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          pages.push('...');
                          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                          pages.push('...');
                          pages.push(totalPages);
                        }
                      }
                      
                      return pages.map((p, idx) => (
                        p === '...' ? (
                          <span key={`dots-${idx}`} className="px-2 text-slate-400 text-xs">...</span>
                        ) : (
                          <button 
                            key={p}
                            onClick={() => paginate(p)}
                            className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                              currentPage === p 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                            }`}
                          >
                            {p}
                          </button>
                        )
                      ));
                    })()}
                  </div>

                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Product Listing */}
            <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8' : 'flex flex-col gap-6'}`}>
              {currentItems.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                  className={`group relative bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row h-auto md:h-64' : ''
                  }`}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Block */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-64 h-64 md:h-full' : 'aspect-[4/5]'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <button className="w-full bg-white text-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Info Block */}
                  <div className={`p-3 md:p-6 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{product.category}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{product.brand}</span>
                      </div>
                      <h3 className="text-xs md:text-xl font-heading font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      {viewMode === 'list' && (
                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Pricing</p>
                        <p className="font-bold text-slate-900 text-sm">{product.price}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openWhatsApp(product.name);
                        }}
                        className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#007a33] hover:text-white transition-all group/wa"
                      >
                        <MessageCircle size={18} className="transition-transform group-hover/wa:scale-110" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls (Bottom) */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} className="rotate-180" />
                </button>
                
                <div className="flex items-center gap-1.5">
                  {(() => {
                    const pages = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      if (currentPage <= 4) {
                        for (let i = 1; i <= 5; i++) pages.push(i);
                        pages.push('...');
                        pages.push(totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        pages.push(1);
                        pages.push('...');
                        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                      } else {
                        pages.push(1);
                        pages.push('...');
                        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                        pages.push('...');
                        pages.push(totalPages);
                      }
                    }
                    
                    return pages.map((p, idx) => (
                      p === '...' ? (
                        <span key={`dots-bottom-${idx}`} className="px-1 text-slate-400 text-xs">...</span>
                      ) : (
                        <button 
                          key={p}
                          onClick={() => paginate(p)}
                          className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                            currentPage === p 
                              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                              : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    ));
                  })()}
                </div>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>



      <Footer />
    </div>
  );
}

export default Shop;
