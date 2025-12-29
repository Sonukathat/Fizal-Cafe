const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

// All cart routes require authentication
router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/item/:itemId', auth, updateCartItem);
router.delete('/item/:itemId', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

module.exports = router;

