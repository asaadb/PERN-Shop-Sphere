import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { fetchCart, updateCartItem, removeFromCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { sessionId, cartItems, dispatch, cartCount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetchCart(sessionId)
        .then((data) => {
          dispatch({ type: 'SET_CART', payload: data });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching cart:', err);
          setLoading(false);
        });
    }
  }, [sessionId, dispatch]);

  const handleUpdateQuantity = async (itemId, newQuantity, maxStock) => {
    // Validate quantity
    if (newQuantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    if (newQuantity > maxStock) {
      alert(`Only ${maxStock} items available in stock`);
      return;
    }

    setUpdating(itemId);
    try {
      await updateCartItem(itemId, newQuantity);
      dispatch({
        type: 'UPDATE_ITEM',
        payload: { id: itemId, quantity: newQuantity },
      });
    } catch (error) {
      console.log('Error updating cart item:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };
  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleRemove = async (itemId) => {
    setUpdating(itemId);
    try {
      await removeFromCart(itemId);
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } catch (error) {
      alert('Failed to remove item');
      console.error('Error removing cart item:', error);
    } finally {
      setUpdating(null);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart ({cartCount} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b py-4">
              <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">
                  Stock: {item.stock_quantity}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <label className="text-sm">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    max={item.stock_quantity}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item.id,
                        parseInt(e.target.value) || 1,
                        item.stock_quantity
                      )
                    }
                    disabled={updating === item.id}
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={updating === item.id}
                    className="text-red-600 hover:text-red-800 text-sm ml-r"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium mb-2">
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 py-3 rounded-md hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
