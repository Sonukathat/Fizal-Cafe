import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const BookEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    eventType: 'Birthday',
    eventName: '',
    date: '',
    startTime: '',
    endTime: '',
    numberOfGuests: '',
    contactPhone: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await bookingAPI.createBooking(formData);
      alert('Booking request submitted successfully! We will contact you soon to confirm.');
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-md w-full bg-cream-50 rounded-3xl shadow-2xl p-10 border border-coffee-200 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold mb-4 text-coffee-800">Login Required</h2>
          <p className="text-coffee-600 mb-8">Please login to book an event</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-8 py-3 rounded-full font-bold hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg"
          >
            Go to Login
          </button>
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
      className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-coffee-50 pt-24 pb-6 md:pb-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-coffee-800">Book Your Event</h1>
            <p className="text-base md:text-xl text-coffee-600 px-2">Fill out the form below to reserve our party ground</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-cream-50 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-10 border-2 border-coffee-200"
          >
            {error && (
              <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-3 rounded-xl mb-6 font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 font-semibold text-sm md:text-base"
                  >
                    <option value="Birthday">🎂 Birthday Party</option>
                    <option value="Anniversary">💍 Anniversary</option>
                    <option value="Corporate Event">💼 Corporate Event</option>
                    <option value="Wedding">💒 Wedding</option>
                    <option value="Other">🎉 Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Event Name</label>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., John's 25th Birthday"
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Number of Guests</label>
                  <input
                    type="number"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    placeholder="e.g., +1 (555) 123-4567"
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-2 md:mb-3 text-coffee-800 text-base md:text-lg">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any special requirements, decorations, or dietary preferences..."
                    className="w-full px-4 py-2 md:px-5 md:py-3 border-2 border-coffee-200 rounded-lg md:rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  whileTap={!loading ? { scale: 0.95 } : {}}
                  className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:from-coffee-700 hover:to-coffee-800 disabled:bg-gray-400 transition-all shadow-xl hover:shadow-2xl"
                >
                  {loading ? 'Submitting...' : '🎉 Submit Booking Request'}
                </motion.button>
              </div>
            </form>
          </motion.div>

          <div className="mt-6 md:mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 className="font-bold text-coffee-800 mb-2 text-base md:text-lg">📋 Booking Information</h3>
            <ul className="text-coffee-700 space-y-2 text-xs md:text-sm">
              <li>• Pricing: $50 per hour + $10 per guest</li>
              <li>• Maximum capacity: 100 guests</li>
              <li>• We'll contact you within 24 hours to confirm your booking</li>
              <li>• Cancellation policy: Free cancellation up to 48 hours before event</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookEvent;

