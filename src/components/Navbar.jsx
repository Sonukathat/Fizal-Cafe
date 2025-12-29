import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-center">
          <div className="w-full fixed top-3 sm:top-6 max-w-5xl bg-white/10 text-cream-50 rounded-full h-12 sm:h-14 md:h-16 shadow-xl border border-white/20 backdrop-blur-lg backdrop-saturate-150 px-3 sm:px-4 md:px-6 flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-cream-50 flex items-center justify-center text-coffee-900 font-bold shadow-md border border-coffee-200 text-xs sm:text-sm md:text-base">
                FC
              </div>
              <Link to="/" className="hidden sm:block text-xs sm:text-base md:text-lg font-semibold">
                Fizal Cafe
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/" className="text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors">
                Products
              </Link>
              <Link to="/book-event" className="text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors">
                Book Event
              </Link>

              {user ? (
                <>
                  <Link to="/my-bookings" className="text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors">
                    My Bookings
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors">
                      Admin
                    </Link>
                  )}
                  <span className="flex items-center gap-1.5 text-coffee-900 text-sm font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-cream-50 text-coffee-900 px-4 py-1.5 text-sm rounded-full hover:bg-white transition-colors shadow-md font-semibold"
                  >
                    Logout
                  </button>
                  <Link to="/cart" className="flex items-center text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-coffee-900 bg-cream-50 px-4 py-1.5 text-sm rounded-full font-semibold hover:bg-white transition-colors shadow-md">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-coffee-900 text-sm font-semibold border border-coffee-900/50 px-4 py-1.5 rounded-full hover:bg-coffee-100/30 transition-colors"
                  >
                    Register
                  </Link>
                  <Link to="/cart" className="flex items-center text-coffee-900 text-sm font-semibold hover:text-coffee-700 transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <Link to="/cart" className="text-coffee-900 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-coffee-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/20 bg-white/10 text-cream-50 overflow-hidden rounded-3xl mt-2 shadow-xl backdrop-blur-lg backdrop-saturate-150"
            >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-coffee-900 font-semibold hover:text-coffee-700 py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-coffee-900 font-semibold hover:text-coffee-700 py-2"
              >
                Products
              </Link>
              <Link
                to="/book-event"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-coffee-900 font-semibold hover:text-coffee-700 py-2"
              >
                Book Event
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-coffee-900 font-semibold hover:text-coffee-700 py-2"
                  >
                    My Bookings
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-coffee-900 font-semibold hover:text-coffee-700 py-2"
                    >
                      Admin
                    </Link>
                  )}
                  <div className="pt-2 border-t border-coffee-200/40">
                    <p className="flex items-center gap-2 text-coffee-900 font-semibold py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {user.name}
                    </p>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-cream-50 text-coffee-900 px-4 py-2 rounded-full hover:bg-white transition-colors font-semibold mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-coffee-200/40 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-coffee-900 bg-cream-50 font-semibold px-4 py-2 rounded-full text-center hover:bg-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-coffee-900 border border-coffee-900/50 px-4 py-2 rounded-full hover:bg-coffee-100/30 transition-all font-semibold text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

