import { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  // Load cart from localStorage on mount
  // Also sync with database if user is logged in
  useEffect(() => {
    loadCart();
  }, [user]);

  // Load cart from localStorage
  // If user is logged in, also fetch from database and merge
  const loadCart = async () => {
    // Get cart from localStorage
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(localCart);

    // If user is logged in, sync with database
    if (user) {
      try {
        const response = await cartAPI.getCart();
        const dbCart = response.data.items || [];
        
        // Merge local and database cart (simple merge - database takes priority)
        if (dbCart.length > 0) {
          setCartItems(dbCart);
          localStorage.setItem('cart', JSON.stringify(dbCart));
        } else if (localCart.length > 0) {
          // If database cart is empty but local has items, sync local to database
          for (const item of localCart) {
            await cartAPI.addToCart(item.product._id || item.product, item.quantity);
          }
          const updatedResponse = await cartAPI.getCart();
          setCartItems(updatedResponse.data.items || []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  };

  // Add item to cart
  // Flow: Add to local state -> Save to localStorage -> If logged in, sync to database
  const addToCart = async (product, quantity = 1) => {
    const newItems = [...cartItems];
    const existingIndex = newItems.findIndex(
      item => (item.product._id || item.product) === (product._id || product)
    );

    if (existingIndex > -1) {
      // Update quantity if item exists
      newItems[existingIndex].quantity += quantity;
    } else {
      // Add new item
      newItems.push({ product, quantity });
    }

    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));

    // Sync to database if user is logged in
    if (user) {
      try {
        await cartAPI.addToCart(product._id || product, quantity);
      } catch (error) {
        console.error('Error syncing cart to database:', error);
      }
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    const newItems = cartItems.map(item => {
      const itemProductId = item.product._id || item.product;
      if (itemProductId === productId) {
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with 0 quantity

    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));

    // Sync to database if user is logged in
    if (user) {
      try {
        // Find the cart item ID from database
        const cartResponse = await cartAPI.getCart();
        const dbItem = cartResponse.data.items.find(
          item => (item.product._id || item.product) === productId
        );
        if (dbItem) {
          await cartAPI.updateItem(dbItem._id, quantity);
        }
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const newItems = cartItems.filter(
      item => (item.product._id || item.product) !== productId
    );
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));

    // Sync to database if user is logged in
    if (user) {
      try {
        const cartResponse = await cartAPI.getCart();
        const dbItem = cartResponse.data.items.find(
          item => (item.product._id || item.product) === productId
        );
        if (dbItem) {
          await cartAPI.removeItem(dbItem._id);
        }
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    }
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

