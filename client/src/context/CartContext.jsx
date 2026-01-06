import { useEffect } from 'react';
import { createContext, useContext, useReducer, useState } from 'react';
import { fetchCart } from '../services/api';
import cartReducer from './cartReducer';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize sessionId directly from localStorage (no effect needed)
  const [sessionId] = useState(() => {
    let storedSessionId = localStorage.getItem('cart_session_id');
    if (!storedSessionId) {
      storedSessionId = crypto.randomUUID();
      localStorage.setItem('cart_session_id', storedSessionId);
    }
    return storedSessionId;
  });

  const [cartItems, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    if (sessionId) {
      fetchCart(sessionId)
        .then((data) => {
          dispatch({ type: 'SET_CART', payload: data });
        })
        .catch((err) => {
          console.error('Error fetching cart:', err);
        });
    }
  }, [sessionId]);

  // Calculate total cart count (derived state)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    sessionId,
    cartItems,
    dispatch,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
