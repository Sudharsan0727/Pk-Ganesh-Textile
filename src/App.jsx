import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-accent">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CategoryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
