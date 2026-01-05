import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="group cursor-pointer">
      <div className="aspect-square w-full rounded-lg bg-gray-200 overflow-hidden">
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">No Image Available</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-xs text-blue-600">{product.category_name}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          {product.stock_quantity > 0 ? (
            <p className="text-xs text-green-600">In Stock</p>
          ) : (
            <p className="text-xs text-red-600">Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
