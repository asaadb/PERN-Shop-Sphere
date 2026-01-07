import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, addToCart } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { sessionId, dispatch } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Product not found</div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!sessionId) return;

    // Validate quantity
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    if (quantity > product.stock_quantity) {
      alert(`Only ${product.stock_quantity} items available in stock`);
      setQuantity(product.stock_quantity);
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(sessionId, product.id, quantity);
      dispatch({
        type: 'ADD_ITEM',
        payload: { product_id: product.id, quantity },
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setAddingToCart(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          ) : (
            <span className="text-gray-400">No Image Available</span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-blue-600 mb-2">{product.category_name}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Stock:{' '}
              <span
                className={
                  product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {product.stock_quantity > 0
                  ? `${product.stock_quantity} available`
                  : 'Out of stock'}
              </span>
            </p>
          </div>

          <div className="flex gap-4 items-center mb-4">
            <label className="text-sm font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock_quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={product.stock_quantity === 0 || addingToCart}
          >
            {addingToCart
              ? 'Adding...'
              : product.stock_quantity > 0
              ? 'Add to Cart'
              : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
