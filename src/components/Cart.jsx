import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const EMPTY_FORM = { name: '', email: '', phone: '', address: '' };

export default function Cart() {
  const { items, cartTotal, cartCount, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep]       = useState('cart'); // 'cart' | 'checkout'
  const [form, setForm]       = useState(EMPTY_FORM);
  const [placing, setPlacing] = useState(false);

  const handleClose = () => { setIsCartOpen(false); setStep('cart'); };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCheckout = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      await axios.post(`${API}/orders`, {
        customerInfo: form,
        orderItems: items.map((i) => ({
          product: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        totalAmount: cartTotal,
      });
      clearCart();
      setForm(EMPTY_FORM);
      setStep('cart');
      setIsCartOpen(false);
      toast.success('Order placed! We will contact you shortly.');
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {step === 'cart' ? 'Your Cart' : 'Checkout'}
                </h2>
                {step === 'cart' && cartCount > 0 && (
                  <p className="text-sm text-gray-400">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                )}
              </div>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX className="text-xl" />
              </button>
            </div>

            {/* ── CART STEP ── */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                      <FiShoppingBag className="text-6xl text-gray-200" />
                      <p className="text-gray-400 font-medium">Your cart is empty</p>
                      <button
                        onClick={handleClose}
                        className="text-green-dark underline text-sm"
                      >
                        Continue shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                            <p className="text-green-dark font-bold mt-1">₦{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <FiMinus className="text-xs" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <FiPlus className="text-xs" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="w-7 h-7 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg transition-colors ml-1"
                            >
                              <FiTrash2 className="text-sm" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="px-6 py-5 border-t bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 font-medium">Total</span>
                      <span className="text-2xl font-bold text-green-dark">₦{cartTotal.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full bg-green-dark hover:bg-green-mid text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <FiArrowRight />
                    </button>
                    <button onClick={clearCart} className="w-full text-gray-400 hover:text-red-400 text-sm mt-3 transition-colors">
                      Clear cart
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── CHECKOUT STEP ── */}
            {step === 'checkout' && (
              <form onSubmit={handleCheckout} className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex-1 px-6 py-4 space-y-4">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-green-dark text-sm hover:underline"
                  >
                    ← Back to cart
                  </button>

                  {[
                    { name: 'name',    label: 'Full Name *',     placeholder: 'John Doe',              required: true },
                    { name: 'email',   label: 'Email *',          placeholder: 'you@example.com',       required: true, type: 'email' },
                    { name: 'phone',   label: 'Phone Number',     placeholder: '+234 800 000 0000' },
                    { name: 'address', label: 'Delivery Address', placeholder: '123 Street, Lagos…' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        name={f.name}
                        type={f.type || 'text'}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
                      />
                    </div>
                  ))}

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Order Summary</p>
                    {items.map((i) => (
                      <div key={i._id} className="flex justify-between text-sm text-gray-600 mb-1">
                        <span className="truncate mr-2">{i.name} × {i.quantity}</span>
                        <span className="shrink-0 font-medium">₦{(i.price * i.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-800">
                      <span>Total</span>
                      <span>₦{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 border-t">
                  <button
                    type="submit"
                    disabled={placing}
                    className="w-full bg-yellow-accent hover:bg-yellow-dark text-green-dark font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {placing ? 'Placing Order…' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
