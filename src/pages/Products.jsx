import { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';

const API = import.meta.env.VITE_API_URL || '/api';

const CATEGORIES = [
  { value: '',             label: 'All Products' },
  { value: 'inverter',     label: 'Inverters' },
  { value: 'battery',      label: 'Batteries' },
  { value: 'solar-panel',  label: 'Solar Panels' },
];

const SORT_OPTIONS = [
  { value: 'default',     label: 'Default' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
  { value: 'rating',      label: 'Top Rated' },
];

export default function Products() {
  useSEO({
    title: 'Solar Products – Inverters, Batteries & Panels | GreenPaWa Nigeria',
    description: 'Shop Nigeria\'s best solar products. Hybrid inverters, lithium batteries, monocrystalline panels and more. Fast nationwide delivery and professional installation.',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState(initialCat);
  const [sort, setSort]         = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = category ? `?category=${category}` : '';
        const res = await axios.get(`${API}/products${params}`);
        const data = res.data.products || res.data;
        setProducts(data.length ? data : STATIC_PRODUCTS);
      } catch {
        setProducts(STATIC_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // Update URL when category changes
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  // Filter + sort
  const displayed = products
    .filter((p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating')     return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark px-4 sm:px-6 py-14 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Our Products</h1>
        <p className="text-white/60 text-lg">Premium solar equipment from world-class manufacturers</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-9 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-mid appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => handleCategoryChange(c.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                category === c.value
                  ? 'bg-green-dark text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-mid hover:text-green-dark'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-6">
            {displayed.length} product{displayed.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-semibold text-gray-600 mb-2">No products found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((p) => (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
