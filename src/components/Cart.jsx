import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '2349063148717';

export default function Cart() {
  const { items, cartTotal, cartCount, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleClose = () => setIsCartOpen(false);

  const handleWhatsAppCheckout = () => {
    const lines = items.map(
      (i) => `• ${i.name} × ${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}`
    );
    const message =
      `Hello GreenPaWa! I'd like to order the following:\n\n` +
      lines.join('\n') +
      `\n\n*Total: ₦${cartTotal.toLocaleString()}*\n\nPlease confirm availability and delivery details. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
                <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
                {cartCount > 0 && (
                  <p className="text-sm text-gray-400">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                )}
              </div>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <FiShoppingBag className="text-6xl text-gray-200" />
                  <p className="text-gray-400 font-medium">Your cart is empty</p>
                  <button onClick={handleClose} className="text-green-dark underline text-sm">
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

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Total</span>
                  <span className="text-2xl font-bold text-green-dark">₦{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <FaWhatsapp className="text-xl" /> Order via WhatsApp
                </button>
                <button onClick={clearCart} className="w-full text-gray-400 hover:text-red-400 text-sm mt-3 transition-colors">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
