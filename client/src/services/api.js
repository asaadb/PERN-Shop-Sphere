// Clear all items from cart for a session
export const clearCart = async (sessionId) => {
  try {
    const response = await fetch(`${API_URL}/cart?session_id=${sessionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
const API_URL = 'http://localhost:5001/api';

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
};

// Cart API functions
export const fetchCart = async (sessionId) => {
  const response = await fetch(`${API_URL}/cart?session_id=${sessionId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return await response.json();
};

export const addToCart = async (sessionId, productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        product_id: productId,
        quantity: quantity,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/cart/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};
