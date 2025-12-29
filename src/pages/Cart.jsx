import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold mb-4 text-coffee-800">Your Cart is Empty</h1>
          <p className="text-coffee-600 mb-8 text-lg">Add some delicious items to get started!</p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-block"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-cream-50 to-white pt-24 pb-6 md:pb-12"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-coffee-800 text-center"
        >
          Shopping Cart
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-coffee-600 mb-6 md:mb-10 text-base md:text-lg"
        >
          Review your order
        </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-cream-50 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border border-coffee-200">
            <AnimatePresence>
            {cartItems.map((item, index) => {
              const product = item.product;
              const productId = product._id || product;
              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center border-b border-coffee-200 pb-6 md:pb-8 mb-6 md:mb-8 last:border-0 last:mb-0 gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:w-24 md:w-32 h-24 md:h-32 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex-1 w-full sm:w-auto">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-coffee-800">
                      <Link to={`/products/${productId}`} className="hover:text-coffee-600 transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-coffee-700 font-semibold text-base md:text-lg">${product.price}</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 md:space-x-6">
                    <div className="flex items-center space-x-2 md:space-x-3 bg-cream-100 rounded-lg md:rounded-xl p-1 md:p-2">
                      <button
                        onClick={() => handleQuantityChange(productId, item.quantity - 1)}
                        className="bg-coffee-200 text-coffee-800 px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-coffee-300 transition-colors font-bold text-sm md:text-base"
                      >
                        −
                      </button>
                      <span className="w-8 md:w-12 text-center font-bold text-coffee-800 text-base md:text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(productId, item.quantity + 1)}
                        className="bg-coffee-200 text-coffee-800 px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-coffee-300 transition-colors font-bold text-sm md:text-base"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-coffee-800">
                      ${(product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(productId)}
                      className="text-amber-600 hover:text-amber-700 font-semibold transition-colors text-sm md:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-coffee-700 to-coffee-800 text-cream-50 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 sticky top-20 md:top-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Order Summary</h2>
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between text-base md:text-lg">
                <span>Subtotal:</span>
                <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base md:text-lg">
                <span>Shipping:</span>
                <span className="font-bold text-green-300">Free</span>
              </div>
              <div className="border-t border-cream-200 pt-3 md:pt-4 flex justify-between text-xl md:text-2xl font-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  alert('Checkout functionality would be implemented here!');
                }
              }}
              className="w-full bg-cream-50 text-coffee-800 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-cream-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {user ? '☕ Proceed to Checkout' : 'Login to Checkout'}
            </button>
            {!user && (
              <p className="text-xs md:text-sm text-cream-200 text-center mt-3 md:mt-4">
                <Link to="/register" className="text-cream-50 hover:underline font-semibold">
                  Create an account
                </Link>{' '}
                to save your cart
              </p>
            )}
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Cart;

