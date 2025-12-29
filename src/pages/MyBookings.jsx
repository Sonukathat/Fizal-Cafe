import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancelBooking(bookingId);
      loadBookings();
      alert('Booking cancelled successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-coffee-800">Please login to view your bookings</h1>
          <Link to="/login" className="text-coffee-600 hover:underline">Login here</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center pt-24">
        <div className="text-2xl text-coffee-700">Loading bookings...</div>
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
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-800">My Bookings</h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/book-event"
              className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg inline-block"
            >
              + New Booking
            </Link>
          </motion.div>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="bg-cream-50 rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center border-2 border-coffee-200">
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">📅</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-coffee-800">No Bookings Yet</h2>
            <p className="text-coffee-600 mb-6 md:mb-8">Start planning your special event!</p>
            <Link
              to="/book-event"
              className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg inline-block"
            >
              Book Your Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <AnimatePresence>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-cream-50 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border-2 border-coffee-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 md:mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-coffee-800 mb-1">{booking.eventName}</h3>
                    <p className="text-coffee-600 font-semibold text-sm md:text-base">{booking.eventType}</p>
                  </div>
                  <span className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm border-2 ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-1 md:space-y-2 mb-3 md:mb-4 text-coffee-700 text-sm md:text-base">
                  <p><span className="font-bold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><span className="font-bold">Time:</span> {booking.startTime} - {booking.endTime}</p>
                  <p><span className="font-bold">Guests:</span> {booking.numberOfGuests}</p>
                  <p><span className="font-bold">Contact:</span> {booking.contactPhone}</p>
                  <p className="text-lg md:text-xl font-bold text-coffee-800 mt-2 md:mt-3">
                    Total: ${booking.totalPrice?.toFixed(2) || '0.00'}
                  </p>
                </div>

                {booking.specialRequests && (
                  <div className="mb-3 md:mb-4 p-2 md:p-3 bg-cream-100 rounded-lg">
                    <p className="text-xs md:text-sm text-coffee-700">
                      <span className="font-bold">Special Requests:</span> {booking.specialRequests}
                    </p>
                  </div>
                )}

                {booking.status === 'Pending' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-amber-600 transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;

