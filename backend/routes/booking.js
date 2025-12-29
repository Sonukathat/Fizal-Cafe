const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getUserBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes (require authentication)
router.get('/my-bookings', auth, getUserBookings);
router.get('/:id', auth, getBookingById);
router.post('/', auth, createBooking);
router.put('/:id/cancel', auth, cancelBooking);

// Admin routes
router.get('/', auth, adminAuth, getAllBookings);
router.put('/:id/status', auth, adminAuth, updateBookingStatus);
router.delete('/:id', auth, adminAuth, deleteBooking);

module.exports = router;

