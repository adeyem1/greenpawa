import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar, FiZap, FiShield, FiActivity } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CATEGORY_CONFIG = {
  inverter: {
    label: 'Inverter',
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: FiZap,
  },
  battery: {
    label: 'Battery',
    gradient: 'from-purple-600 to-purple-400',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: FiActivity,
  },
  'solar-panel': {
    label: 'Solar Panel',
    gradient: 'from-yellow-500 to-orange-400',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: FiShield,
  },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const cfg = CATEGORY_CONFIG[product.category] || CATEGORY_CONFIG.inverter;
  const Icon = cfg.icon;

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const stars = Math.round(product.rating || 4.5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image / gradient header */}
      <div className={`relative h-48 bg-gradient-to-br ${cfg.gradient} flex items-center justify-center overflow-hidden`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Icon className="text-white/30 text-8xl" />
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {cfg.label}
        </span>
        {product.featured && (
          <span className="absolute top-3 right-3 bg-yellow-accent text-green-dark text-xs font-bold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Specs tags */}
        {product.specs && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(product.specs)
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <span key={k} className={`${cfg.bg} ${cfg.text} text-xs font-medium px-2.5 py-1 rounded-lg capitalize`}>
                  {k}: {v}
                </span>
              ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${i < stars ? 'text-yellow-accent fill-yellow-accent' : 'text-gray-200'}`}
                fill={i < stars ? '#F4B942' : 'none'}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({product.reviewCount || 0})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-green-dark">
              ₦{product.price?.toLocaleString()}
            </p>
            {product.stock !== undefined && (
              <p className={`text-xs mt-0.5 ${product.stock > 0 ? 'text-green-500' : 'text-red-400'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-2 bg-green-dark hover:bg-green-mid text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <FiShoppingCart /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
