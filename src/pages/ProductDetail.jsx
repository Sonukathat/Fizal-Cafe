import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      setMessage('Product is out of stock');
      return;
    }

    addToCart(product, quantity);
    setMessage('Product added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 pt-24 pb-12 text-center">
        <div className="text-lg sm:text-xl md:text-2xl text-coffee-700">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-cream-50 to-white pt-24 pb-6 md:pb-12"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-cream-100 rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-2xl">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full rounded-xl md:rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-cream-50 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl border border-coffee-200"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-coffee-800">{product.name}</h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-700 mb-3 md:mb-6">${product.price}</p>
            <p className="text-coffee-700 mb-4 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">{product.description}</p>

            {product.category && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-cream-100 rounded-lg md:rounded-xl">
                <span className="font-semibold text-coffee-800 text-sm md:text-base">Category: </span>
                <span className="text-coffee-700 text-sm md:text-base">{product.category.name}</span>
              </div>
            )}

            <div className="mb-6 md:mb-8 p-3 md:p-4 bg-cream-100 rounded-lg md:rounded-xl">
              <span className="font-semibold text-coffee-800 text-sm md:text-base">Availability: </span>
              {product.stock > 0 ? (
                <span className="text-green-700 font-bold text-sm md:text-base">{product.stock} available</span>
              ) : (
                <span className="text-amber-600 font-bold text-sm md:text-base">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 md:mb-8">
              <label className="block font-bold mb-3 md:mb-4 text-coffee-800 text-base md:text-lg">Quantity:</label>
              <div className="flex items-center space-x-3 md:space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-coffee-200 text-coffee-800 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl hover:bg-coffee-300 transition-colors font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="text-2xl md:text-3xl font-bold w-12 md:w-16 text-center text-coffee-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-coffee-200 text-coffee-800 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl hover:bg-coffee-300 transition-colors font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              whileHover={product.stock > 0 ? { scale: 1.05 } : {}}
              whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                  : 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white hover:from-coffee-700 hover:to-coffee-800 shadow-xl hover:shadow-2xl'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : '☕ Add to Cart'}
            </motion.button>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 text-center text-lg font-semibold ${
                  message.includes('added') ? 'text-green-700' : 'text-amber-600'
                }`}
              >
                {message}
              </motion.p>
            )}

            {!user && (
              <p className="mt-6 text-sm text-coffee-600 text-center">
                <a href="/login" className="text-coffee-700 hover:underline font-semibold">
                  Login
                </a>{' '}
                to sync your cart across devices
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

