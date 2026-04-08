import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const CATEGORIES = ['inverter', 'battery', 'solar-panel'];

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped:    'bg-indigo-100 text-indigo-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
};

const EMPTY_PRODUCT = {
  name: '', category: 'inverter', price: '', description: '',
  specs: { power: '', warranty: '', efficiency: '' },
  featured: false, stock: 10,
};

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="text-2xl text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ── Product Modal ──────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setSpec = (key, val) => setForm((p) => ({ ...p, specs: { ...p.specs, [key]: val } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
                placeholder="e.g. SolarEdge 5kW Inverter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦) *</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
                placeholder="250000"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid resize-none"
                placeholder="Brief product description…"
              />
            </div>
          </div>

          {/* Specs */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Specifications</p>
            <div className="grid grid-cols-3 gap-3">
              {['power', 'warranty', 'efficiency'].map((key) => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 mb-1 capitalize">{key}</label>
                  <input
                    value={form.specs?.[key] || ''}
                    onChange={(e) => setSpec(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-mid"
                    placeholder={key === 'power' ? '5kW' : key === 'warranty' ? '10 yrs' : '97%'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                className="w-24 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-mid"
              />
            </div>
            <label className="flex items-center gap-2 mt-5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="w-4 h-4 accent-green-mid"
              />
              <span className="text-sm text-gray-700">Featured product</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-green-dark text-white rounded-xl text-sm font-semibold hover:bg-green-mid transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────
export default function Admin() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | product object
  const [deleteConfirm, setDeleteConfirm] = useState(null); // product id

  // Auth guard
  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'admin') { navigate('/'); toast.error('Admin access required'); }
  }, [user, navigate]);

  const authHeader = useCallback(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(`${API}/products`);
      setProducts(res.data.products || res.data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      setLoadingOrders(true);
      const res = await axios.get(`${API}/orders`, authHeader());
      setOrders(res.data);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  }, [token, authHeader]);

  useEffect(() => { fetchProducts(); fetchOrders(); }, [fetchProducts, fetchOrders]);

  // Save product (create or update)
  const handleSaveProduct = async (form) => {
    if (modal && modal._id) {
      await axios.put(`${API}/products/${modal._id}`, form, authHeader());
      toast.success('Product updated');
    } else {
      await axios.post(`${API}/products`, form, authHeader());
      toast.success('Product added');
    }
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}`, authHeader());
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`${API}/orders/${orderId}`, { status }, authHeader());
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  // Stats
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Manage products, orders and store data</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FiPackage}      label="Total Products" value={products.length}  color="bg-green-dark" />
          <StatCard icon={FiShoppingCart} label="Total Orders"   value={orders.length}    color="bg-blue-500" />
          <StatCard icon={FiDollarSign}   label="Revenue (₦)"   value={`${(totalRevenue / 1_000_000).toFixed(1)}M`} color="bg-yellow-500" />
          <StatCard icon={FiUsers}        label="Customers"      value={new Set(orders.map((o) => o.customerInfo?.email)).size} color="bg-purple-500" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-6 w-fit">
          {['products', 'orders'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t ? 'bg-green-dark text-white shadow' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── PRODUCTS TAB ── */}
        <AnimatePresence mode="wait">
          {tab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Products ({products.length})</h2>
                <button
                  onClick={() => setModal('add')}
                  className="flex items-center gap-2 bg-green-dark text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-mid transition-colors shadow"
                >
                  <FiPlus /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loadingProducts ? (
                  <div className="p-12 text-center text-gray-400">Loading products…</div>
                ) : products.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">No products yet. Add your first one!</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-6 py-4 text-gray-500 font-medium">Product</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Category</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Price</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Stock</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Featured</th>
                          <th className="px-4 py-4" />
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p, i) => (
                          <tr key={p._id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-800">{p.name}</div>
                              <div className="text-gray-400 text-xs mt-0.5 line-clamp-1">{p.description}</div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="bg-green-50 text-green-dark px-2.5 py-1 rounded-lg text-xs font-medium capitalize">
                                {p.category?.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="px-4 py-4 font-semibold text-gray-800">
                              ₦{p.price?.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 text-gray-600">{p.stock ?? '—'}</td>
                            <td className="px-4 py-4">
                              {p.featured ? (
                                <FiCheck className="text-green-500 text-lg" />
                              ) : (
                                <FiX className="text-gray-300 text-lg" />
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  onClick={() => setModal(p)}
                                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(p._id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── ORDERS TAB ── */}
          {tab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Orders ({orders.length})</h2>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loadingOrders ? (
                  <div className="p-12 text-center text-gray-400">Loading orders…</div>
                ) : orders.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">No orders yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-6 py-4 text-gray-500 font-medium">Order #</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Customer</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Items</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Total</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Date</th>
                          <th className="text-left px-4 py-4 text-gray-500 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o, i) => (
                          <tr key={o._id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}>
                            <td className="px-6 py-4 font-mono text-xs text-gray-600">{o.orderNumber}</td>
                            <td className="px-4 py-4">
                              <div className="font-medium text-gray-800">{o.customerInfo?.name}</div>
                              <div className="text-gray-400 text-xs">{o.customerInfo?.email}</div>
                            </td>
                            <td className="px-4 py-4 text-gray-600">{o.orderItems?.length} item(s)</td>
                            <td className="px-4 py-4 font-semibold text-gray-800">
                              ₦{o.totalAmount?.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 text-gray-500 text-xs">
                              {new Date(o.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })}
                            </td>
                            <td className="px-4 py-4">
                              <div className="relative">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                                  className={`appearance-none pr-7 pl-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-mid ${STATUS_COLORS[o.status]}`}
                                >
                                  {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s} className="bg-white text-gray-800">
                                      {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                  ))}
                                </select>
                                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <ProductModal
            product={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSaveProduct}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="text-red-500 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Product?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
