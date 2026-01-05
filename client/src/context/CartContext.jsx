import { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;

    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return updatedCart;
      }
      return [...state, action.payload];
    }

    case 'UPDATE_ITEM':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
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
