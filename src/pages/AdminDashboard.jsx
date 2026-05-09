import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Tag, 
  LogOut, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Grid,
  List as ListIcon,
  Filter,
  X,
  Loader2
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Backend Integration State
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch('http://localhost:5000/api/categories'),
        fetch('http://localhost:5000/api/products')
      ]);
      const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
      setCategories(catData || []);
      setProducts(prodData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteItem = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type === 'categories' ? 'category' : 'product'}?`)) {
      try {
        const endpoint = type === 'categories' ? 'categories' : 'products';
        await fetch(`http://localhost:5000/api/${endpoint}/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error(`Failed to delete ${type}:`, error);
      }
    }
  };
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    newArrivals: products.filter(p => {
      const created = new Date(p.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created > weekAgo;
    }).length
  };
  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-body text-slate-800">
      {/* Side Navigation - Compact & Professional */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col transition-all duration-300">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="w-10 h-10 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/20">P</div>
          <span className="ml-3 font-heading font-bold text-lg hidden lg:block text-slate-900">PK Ganesh <span className="text-primary text-[10px] block font-normal uppercase tracking-tighter">Admin Console</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavItem 
            icon={<Package size={20} />} 
            label="Inventory" 
            active={activeTab === 'inventory'} 
            onClick={() => setActiveTab('inventory')} 
          />
          <NavItem 
            icon={<Tag size={20} />} 
            label="Categories" 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Functional focus */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, category or SKU..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === 'inventory' && (
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <ListIcon size={18} />
                </button>
              </div>
            )}
            <button 
              onClick={openAddModal}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus size={18} strokeWidth={3} /> 
              <span className="hidden sm:inline">Add {activeTab === 'inventory' ? 'Product' : 'Category'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Context Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Total Articles', value: stats.totalProducts, icon: <Package className="text-blue-600" />, color: 'bg-blue-50' },
                { label: 'Categories', value: stats.totalCategories, icon: <Tag className="text-emerald-600" />, color: 'bg-emerald-50' },
                { label: 'New This Week', value: stats.newArrivals, icon: <Plus className="text-orange-600" />, color: 'bg-orange-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
                  <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-heading font-black text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                  <span>Dashboard</span>
                  <ChevronRight size={12} />
                  <span className="text-primary">{activeTab}</span>
                </div>
                <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
                  {activeTab === 'inventory' ? 'Inventory Management' : 'Category Management'}
                </h1>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${viewMode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'inventory' ? (
                  <ProductManagement 
                    products={filteredProducts} 
                    onEdit={handleEditItem} 
                    onDelete={(id) => handleDeleteItem(id, 'inventory')} 
                    viewMode={viewMode}
                  />
                ) : (
                  <CategoryManagement 
                    categories={filteredCategories} 
                    onEdit={handleEditItem} 
                    onDelete={(id) => handleDeleteItem(id, 'categories')} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={activeTab} 
        refreshData={fetchData}
        initialData={editingItem}
        categories={categories}
      />
    </div>
  );
};

const CategoryManagement = ({ categories, onEdit, onDelete }) => {
  // Use placeholder image if category has no image
  const getImageUrl = (img) => img || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop';

  return (
    <div className="space-y-12">
      {/* Quick Category Carousel */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Quick Selection</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => document.getElementById('category-admin-scroll').scrollLeft -= 300}
              className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button 
              onClick={() => document.getElementById('category-admin-scroll').scrollLeft += 300}
              className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div id="category-admin-scroll" className="flex gap-10 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-4 shrink-0 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full border-4 border-slate-50 p-1 bg-white shadow-sm ring-1 ring-slate-100 group-hover:ring-primary/20 transition-all">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={getImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 text-center w-24 leading-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
          {categories.length === 0 && (
            <p className="text-slate-400 text-sm">No categories found. Click Add Category to create one.</p>
          )}
        </div>
      </section>

      {/* Category Management List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <img src={getImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{cat.name}</h3>
                <p className="text-xs text-slate-400 font-medium">ID: {cat.id}</p>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(cat)} className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit3 size={16} /></button>
              <button onClick={() => onDelete(cat.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductModal = ({ isOpen, onClose, type, refreshData, initialData, categories }) => {
  const [formData, setFormData] = useState({ name: '', image: '', price: '', brand: '', categoryId: '', subCategory: '', description: '' });
  const [priceType, setPriceType] = useState('request');
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    if (initialData) {
      const isRequest = initialData.price === "Request Price on WhatsApp";
      setPriceType(isRequest ? 'request' : 'custom');
      setFormData({ 
        name: initialData.name || '', 
        image: initialData.image || '',
        price: isRequest ? '' : (initialData.price ? initialData.price.replace(/[^\d]/g, '') : ''),
        brand: initialData.brand || '',
        categoryId: initialData.categoryId || '',
        subCategory: initialData.subCategory || '',
        description: initialData.description || ''
      });
    } else {
      setPriceType('request');
      setFormData({ name: '', image: '', price: '', brand: '', categoryId: '', subCategory: '' });
    }
  }, [initialData, isOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.imageUrl) {
        setFormData({ ...formData, image: data.imageUrl });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = type === 'categories' ? 'categories' : 'products';
    const url = initialData 
      ? `http://localhost:5000/api/${endpoint}/${initialData.id}` 
      : `http://localhost:5000/api/${endpoint}`;
    const method = initialData ? 'PUT' : 'POST';

    // Convert categoryId to number for products and add Rupee symbol to price
    const submitData = { ...formData };
    if (type === 'inventory') {
      if (submitData.categoryId) submitData.categoryId = parseInt(submitData.categoryId);
      
      if (priceType === 'request') {
        submitData.price = "Request Price on WhatsApp";
      } else if (submitData.price && !submitData.price.startsWith('₹')) {
        submitData.price = `₹ ${submitData.price}`;
      }
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      
      if (!response.ok) throw new Error('Failed to save');
      
      refreshData();
      onClose();
    } catch (error) {
      console.error(`Failed to save ${type}:`, error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
            {initialData ? 'Edit' : 'Add New'} {type === 'inventory' ? 'Product' : 'Category'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder={type === 'categories' ? "Category name..." : "Product name..."} 
                />
              </div>
              
              {type === 'inventory' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                    <select 
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand</label>
                    <input 
                      type="text" 
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      placeholder="e.g. PKG Brand" 
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sub Category (e.g. Silk, Cotton, Wedding)</label>
                    <input 
                      type="text" 
                      value={formData.subCategory}
                      onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      placeholder="e.g. Wedding Collection" 
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description (Masterpiece Narrative)</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none text-sm" 
                      placeholder="Describe the quality, fabric, and unique features..." 
                    />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pricing Option</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setPriceType('request')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${priceType === 'request' ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                      >
                        Request Price
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPriceType('custom')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${priceType === 'custom' ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                      >
                        Custom Price
                      </button>
                    </div>

                    {priceType === 'custom' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-bold">₹</span>
                        <input 
                          type="text" 
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value.replace(/\D/g, '') })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-900" 
                          placeholder="999" 
                          required={priceType === 'custom'}
                        />
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image</label>
                <label className={`cursor-pointer text-xs font-bold transition-colors flex items-center gap-2 ${uploading ? 'text-slate-400' : 'text-primary hover:text-primary-dark'}`}>
                  {uploading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload File'
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              
              {formData.image && (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="https://..." 
                />
              </div>
              {uploading && <p className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">Uploading image...</p>}
            </div>

            <div className="pt-6 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-3.5 px-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-3.5 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Save {type === 'inventory' ? 'Product' : 'Category'}</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ProductManagement = ({ products, onEdit, onDelete, viewMode }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-400 font-medium">No products found. Start by adding one!</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Info</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Brand</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-100">
                      <img src={product.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'} alt="p" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-[10px] font-black text-slate-600 rounded uppercase tracking-tighter">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600">{product.brand || 'No Brand'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-primary text-sm">{product.price || 'WhatsApp Req'}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(product)} className="p-1.5 text-slate-400 hover:text-primary transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => onDelete(product.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div 
          key={product.id}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
        >
          <div className="aspect-square bg-slate-50 relative overflow-hidden">
            <img 
              src={product.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button 
                onClick={() => onEdit(product)}
                className="p-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-lg hover:bg-primary hover:text-white shadow-sm transition-all"
              >
                <Edit3 size={16} />
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg hover:bg-red-500 hover:text-white shadow-sm transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 flex flex-col gap-1">
              <span className="w-fit px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black text-slate-800 rounded uppercase tracking-tighter shadow-sm border border-slate-100">
                {product.category?.name || 'Uncategorized'}
              </span>
              {product.subCategory && (
                <span className="w-fit px-2 py-1 bg-primary text-white text-[8px] font-black rounded uppercase tracking-tighter shadow-sm">
                  {product.subCategory}
                </span>
              )}
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 h-10">{product.name}</h3>
            </div>
            <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
              {product.brand || 'No Brand'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-black">{product.price || 'Price on request'}</span>
              <span className="text-[10px] font-bold text-slate-300">ID: {product.id}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <span className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span className="font-bold text-sm hidden lg:block tracking-tight">{label}</span>
  </button>
);

export default AdminDashboard;
