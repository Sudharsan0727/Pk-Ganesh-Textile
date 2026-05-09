import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  ArrowLeft, 
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const phoneNumber = "918072572195";

function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(['Style']);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const sortRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
      // Check after a short delay to allow categories to render
      const timer = setTimeout(handleScroll, 500);
      return () => {
        scroller.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      };
    }
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const isAll = slug === 'all';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/products')
        ]);
        const cats = await catRes.json();
        const prods = await prodRes.json();
        
        console.log("Fetched Categories:", cats);
        console.log("Current Slug:", slug);
        
        if (isAll) {
          setCategory({ name: 'All Collections', slug: 'all' });
          setProducts(prods);
        } else {
          const foundCat = cats.find(c => c.slug === slug);
          console.log("Found Category:", foundCat);
          setCategory(foundCat);
          if (foundCat) {
            setProducts(prods.filter(p => p.categoryId === foundCat.id));
          }
        }
      } catch (error) {
        console.error("Failed to fetch category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setSelectedType('all');
    window.scrollTo(0, 0);
  }, [slug]);

  // Extract unique sub-categories from products
  const subCategories = React.useMemo(() => 
    Array.from(new Set(products.map(p => p.subCategory).filter(Boolean))),
    [products]
  );

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

  let categoryProducts = products.filter(p => {
    const isTypeMatch = selectedType === 'all' || p.subCategory === selectedType;
    
    // Sidebar Filter Logic (Smart Search)
    const matchesActiveFilters = activeFilters.length === 0 || activeFilters.some(filter => {
      const searchStr = filter.toLowerCase();
      return p.name.toLowerCase().includes(searchStr) || 
             (p.subCategory && p.subCategory.toLowerCase().includes(searchStr)) || 
             (p.description && p.description.toLowerCase().includes(searchStr));
    });

    return isTypeMatch && matchesActiveFilters;
  });

  // Apply Sorting
  if (sortBy === 'name-az') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-za') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'price-low') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.id - b.id);
  } else if (sortBy === 'price-high') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.id - a.id);
  } else if (sortBy === 'date-new') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.id - a.id);
  } else if (sortBy === 'date-old') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.id - b.id);
  }
  // 'featured', 'most-relevant', 'best-selling' use default order

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archiving Collection Details</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-accent px-4 text-center">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">Category Not Found</h2>
        <p className="text-slate-600 mb-8">The category you are looking for doesn't exist.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-medium transition-all shadow-md">
          Back to Home
        </Link>
      </div>
    );
  }

  const openWhatsApp = (productName = "") => {
    const message = productName 
      ? `Hi, I am interested in ${productName} from your ${category.name} collection.` 
      : `Hi, I would like to know more about your ${category.name} collections.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-body text-slate-800 bg-white min-h-screen">
      <Navbar />

      {/* Archive Hero Header */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <nav className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            {isAll ? (
              <span className="text-slate-900">All Collections</span>
            ) : (
              <>
                <Link to="/#categories" className="hover:text-primary transition-colors">Collections</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900">{category.name}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 tracking-tighter mb-4">
            {category.name}
          </h1>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Boutique Textile Archive &bull; {categoryProducts.length} Premium Articles
          </p>
        </div>
      </div>

      {/* Top Material Filters - More Integrated */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          {/* Side Gradient Masks for Premium Feel */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />

          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center border border-slate-100 text-slate-700 hover:text-primary transition-all hover:scale-110 md:flex hidden ${showLeftArrow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center border border-slate-100 text-slate-700 hover:text-primary transition-all hover:scale-110 md:flex hidden ${showRightArrow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>

          <div 
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth px-2"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white bg-slate-900 px-6 py-2.5 rounded-full shadow-xl shrink-0 ring-4 ring-slate-100">Category:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedType('all')}
                className={`whitespace-nowrap px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  selectedType === 'all' 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
                }`}
              >
                All Styles
              </button>
              {subCategories.map((sub) => (
                <button 
                  key={sub} 
                  onClick={() => setSelectedType(sub)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedType === sub 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toolbar - Exact Design Match */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Filter Trigger */}
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-primary font-medium text-[15px]"
          >
            <Filter size={20} strokeWidth={2.5} />
            Filter
          </button>

          {/* Middle: Sort by Dropdown (Triggers Bottom Sheet on Mobile) */}
          <div className="relative">
            <button 
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 text-primary font-medium text-[15px]"
            >
              Sort by
              <svg className={`w-4 h-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            {/* Mobile Bottom Sheet for Sort */}
            <AnimatePresence>
              {sortOpen && (
                <>
                  {/* Local Backdrop for Sort Sheet */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSortOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                  />
                  
                  {/* Bottom Sheet */}
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 bg-white z-[120] rounded-t-[2rem] shadow-2xl overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-widest">Sort by</h3>
                        <button onClick={() => setSortOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                      
                      <div className="space-y-0.5">
                        {[
                          { value: 'featured', label: 'Featured' },
                          { value: 'most-relevant', label: 'Most relevant' },
                          { value: 'best-selling', label: 'Best selling' },
                          { value: 'name-az', label: 'Alphabetically, A-Z' },
                          { value: 'name-za', label: 'Alphabetically, Z-A' },
                          { value: 'price-low', label: 'Price, low to high' },
                          { value: 'price-high', label: 'Price, high to low' },
                          { value: 'date-old', label: 'Date, old to new' },
                          { value: 'date-new', label: 'Date, new to old' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                            className={`w-full flex items-center justify-between py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                              sortBy === opt.value ? 'text-primary' : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            {opt.label}
                            {sortBy === opt.value && (
                              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Safe area padding for mobile */}
                    <div className="h-4 bg-white"></div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right: View Toggles */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`transition-all ${viewMode === 'grid' ? 'text-primary' : 'text-slate-300'}`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="4" height="4" rx="1"/>
                <rect x="10" y="3" width="4" height="4" rx="1"/>
                <rect x="17" y="3" width="4" height="4" rx="1"/>
                <rect x="3" y="10" width="4" height="4" rx="1"/>
                <rect x="10" y="10" width="4" height="4" rx="1"/>
                <rect x="17" y="10" width="4" height="4" rx="1"/>
                <rect x="3" y="17" width="4" height="4" rx="1"/>
                <rect x="10" y="17" width="4" height="4" rx="1"/>
                <rect x="17" y="17" width="4" height="4" rx="1"/>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`transition-all ${viewMode === 'list' ? 'text-primary' : 'text-slate-300'}`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="5" width="4" height="2" rx="0.5"/>
                <rect x="9" y="5" width="12" height="2" rx="0.5"/>
                <rect x="3" y="11" width="4" height="2" rx="0.5"/>
                <rect x="9" y="11" width="12" height="2" rx="0.5"/>
                <rect x="3" y="17" width="4" height="2" rx="0.5"/>
                <rect x="9" y="17" width="12" height="2" rx="0.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for Mobile Filter */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Drawer on Mobile (Right Side), Static on Desktop */}
          <aside className={`
            fixed inset-y-0 right-0 z-[100] w-full max-w-xs bg-white transition-transform duration-500 shadow-2xl lg:static lg:block lg:w-64 lg:z-0 lg:translate-x-0
            ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            {/* Drawer Header (Mobile Only) */}
            <div className="lg:hidden flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-heading font-black uppercase tracking-widest text-slate-900">Filters</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0">
              <div className="border border-slate-200 lg:p-6 p-0 rounded-none lg:border-slate-200 border-none">
                <div className="hidden lg:flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold">Filters</h2>
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                    >
                      Clear All ({activeFilters.length})
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {[
                    { title: "Style", options: ["Plus Size", "Pure Linen White Shirts", "Shirts", "Wrinkle Free"] },
                    { title: "Color", options: ["White", "Off-White", "Cream", "Light Blue"] },
                    { title: "Size", options: ["S", "M", "L", "XL", "XXL", "XXXL"] },
                    { title: "Collar Style", options: ["Regular", "Mandarin", "Button-Down", "Wing"] },
                    { title: "Fit", options: ["Regular Fit", "Slim Fit", "Relaxed Fit"] },
                    { title: "Material", options: ["100% Cotton", "Bamboo Cotton", "Linen", "Polyester Blend"] },
                    { title: "Availability", options: ["In Stock", "Made to Order"] }
                  ].map((filter) => (
                    <div key={filter.title} className="border-b border-slate-100">
                      <button
                        onClick={() => toggleFilter(filter.title)}
                        className="flex items-center justify-between w-full text-left py-4 group"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 group-hover:text-primary transition-colors">{filter.title}</span>
                        <ChevronRight
                          size={14}
                          className={`text-slate-400 transition-all duration-300 ${expandedFilters.includes(filter.title) ? 'rotate-90 text-primary' : ''}`}
                        />
                      </button>
                      {expandedFilters.includes(filter.title) && filter.options.length > 0 && (
                        <div className="pb-4 space-y-3">
                          {filter.options.map((opt) => {
                            const isChecked = activeFilters.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => toggleActiveFilter(opt)}
                              >
                                <div className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'bg-primary border-primary'
                                    : 'border-slate-300 group-hover:border-primary'
                                }`}>
                                  {isChecked && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7"/>
                                    </svg>
                                  )}
                                </div>
                                <span className={`text-xs transition-all ${
                                  isChecked ? 'text-primary font-bold' : 'text-slate-500 group-hover:text-slate-900'
                                }`}>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Apply Button (Mobile Only) */}
                <div className="lg:hidden mt-10">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="border border-slate-200 p-3 mb-8 hidden lg:block">
               {/* Grid Header Controls */}
               <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-slate-100">
                  <p className="text-sm font-medium text-slate-500">
                    Showing 1 - {categoryProducts.length} of {categoryProducts.length} products
                  </p>
                  
                  <div className="flex items-center gap-6">
                    {/* Custom Sort Dropdown */}
                    <div className="flex items-center gap-2 relative">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
                       <div className="relative" ref={sortRef}>
                         <button 
                           onClick={() => setSortOpen(prev => !prev)}
                           className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border border-slate-200 px-4 py-2 hover:border-slate-900 transition-all bg-white"
                         >
                           {{featured:'Featured','most-relevant':'Most Relevant','best-selling':'Best Selling','name-az':'Alphabetically, A-Z','name-za':'Alphabetically, Z-A','price-low':'Price, Low to High','price-high':'Price, High to Low','date-old':'Date, Old to New','date-new':'Date, New to Old'}[sortBy] || 'Featured'}
                           <svg className={`w-3.5 h-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                         </button>
                         
                         {sortOpen && (
                           <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-slate-200 shadow-xl z-50">
                             {[
                               { value: 'featured', label: 'Featured' },
                               { value: 'most-relevant', label: 'Most Relevant' },
                               { value: 'best-selling', label: 'Best Selling' },
                               { value: 'name-az', label: 'Alphabetically, A-Z' },
                               { value: 'name-za', label: 'Alphabetically, Z-A' },
                               { value: 'price-low', label: 'Price, Low to High' },
                               { value: 'price-high', label: 'Price, High to Low' },
                               { value: 'date-old', label: 'Date, Old to New' },
                               { value: 'date-new', label: 'Date, New to Old' },
                             ].map(opt => (
                               <button
                                 key={opt.value}
                                 onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                 className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                                   sortBy === opt.value 
                                     ? 'bg-slate-900 text-white' 
                                     : 'text-slate-700 hover:bg-slate-50'
                                 }`}
                               >
                                 {opt.label}
                                 {sortBy === opt.value && (
                                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                 )}
                               </button>
                             ))}
                           </div>
                         )}
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">View:</span>
                       <div className="flex items-center gap-1">
                         <button 
                           onClick={() => setViewMode('grid')}
                           className={`p-2 transition-all rounded-sm ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                         >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 5V9H9V5H5ZM5 11V15H9V11H5ZM11 5V9H15V5H11ZM11 11V15H15V11H11Z"></path></svg>
                         </button>
                         <button 
                           onClick={() => setViewMode('list')}
                           className={`p-2 transition-all rounded-sm ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                         >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 6h12v2H4V6zm0 4h12v2H4v-2zm0 4h12v2H4v-2z"></path></svg>
                         </button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Product Display */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 mt-2' : 'flex flex-col gap-3 mt-4'}>
               {categoryProducts.map((product, i) => (
                 <motion.div 
                   key={product.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, delay: i * 0.05 }}
                   className={`group cursor-pointer bg-white transition-all border-t border-slate-100 hover:bg-slate-50 ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-6 p-4 items-center' : ''}`}
                   onClick={() => navigate(`/product/${product.id}`)}
                 >
                   {/* Image Container */}
                   <div className={`relative overflow-hidden bg-slate-50 shrink-0 ${viewMode === 'list' ? 'w-24 h-24 md:w-32 md:h-32 rounded-full shadow-sm' : 'aspect-[3/4]'}`}>
                     <img 
                       src={product.image} 
                       alt={product.name} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                   </div>
                   
                   {/* Content Container */}
                   <div className={`flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 ${viewMode === 'list' ? '' : 'p-4 border-t border-slate-100'}`}>
                     <div className="flex-1">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{product.brand}</p>
                       <h3 className={`font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight ${viewMode === 'list' ? 'text-lg' : 'text-xs md:text-sm mb-2 line-clamp-2'}`}>
                         {product.name}
                       </h3>
                       {viewMode === 'list' && (
                         <p className="text-xs text-slate-500 line-clamp-1 max-w-xl mt-1">
                           {product.description}
                         </p>
                       )}
                     </div>
                     
                     <div className={`flex items-center gap-8 ${viewMode === 'list' ? 'md:border-l md:border-slate-100 md:pl-8' : ''}`}>
                       <div className="text-right">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Price</p>
                         <p className={`font-black text-primary ${viewMode === 'list' ? 'text-sm' : 'text-xs'}`}>{product.price}</p>
                       </div>
                       
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           openWhatsApp(product.name);
                         }}
                         className={`bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all ${viewMode === 'list' ? 'px-6 py-2.5 text-[9px]' : 'hidden'}`}
                       >
                         Inquiry
                       </button>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </div>

            {categoryProducts.length === 0 && (
              <div className="text-center py-20 bg-slate-50 border border-slate-100 mt-8">
                <p className="text-sm font-heading font-bold text-slate-400 uppercase tracking-widest">No products found in this selection</p>
              </div>
            )}
          </div>
        </div>
      </div>



      <Footer />
    </div>
  );
}

export default CategoryPage;
