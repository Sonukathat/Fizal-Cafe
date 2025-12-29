import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-coffee-50 pt-24 pb-6 md:pb-12 px-3 sm:px-4 w-full overflow-x-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-cream-50 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-coffee-200"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl md:text-5xl mb-3 md:mb-4"
          >
            ☕
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-800">Join Fizal Cafe</h2>
          <p className="text-coffee-600 mt-2 text-sm md:text-base">Create your account</p>
        </motion.div>
        
        {error && (
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-3 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 md:mb-5">
            <label className="block text-coffee-800 font-bold mb-2 md:mb-3 text-base md:text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4 md:mb-5">
            <label className="block text-coffee-800 font-bold mb-2 md:mb-3 text-base md:text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 md:mb-5">
            <label className="block text-coffee-800 font-bold mb-2 md:mb-3 text-base md:text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div className="mb-6 md:mb-8">
            <label className="block text-coffee-800 font-bold mb-2 md:mb-3 text-base md:text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
              placeholder="Confirm your password"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:from-coffee-700 hover:to-coffee-800 disabled:bg-gray-400 transition-all shadow-xl hover:shadow-2xl"
          >
            {loading ? 'Registering...' : '☕ Create Account'}
          </motion.button>
        </form>

        <p className="mt-6 md:mt-8 text-center text-coffee-700 text-sm md:text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-coffee-800 hover:text-coffee-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;

