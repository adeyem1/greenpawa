import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped:    'bg-indigo-100 text-indigo-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
};

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

export default function Admin() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'admin') { navigate('/'); toast.error('Admin access required'); }
  }, [user, navigate]);

  const authHeader = useCallback(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

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

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`${API}/orders/${orderId}`, { status }, authHeader());
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-green-dark px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Manage orders and store data</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={FiShoppingCart} label="Total Orders"   value={orders.length}    color="bg-blue-500" />
          <StatCard icon={FiDollarSign}   label="Revenue (₦)"   value={`${(totalRevenue / 1_000_000).toFixed(1)}M`} color="bg-yellow-500" />
          <StatCard icon={FiUsers}        label="Customers"      value={new Set(orders.map((o) => o.customerInfo?.email)).size} color="bg-purple-500" />
        </div>

        {/* Orders */}
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
                    <motion.tr
                      key={o._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}
                    >
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
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
