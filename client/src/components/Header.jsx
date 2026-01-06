import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import React from 'react';

function Header() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Shop Sphere
        </Link>
        <Link to="/cart" className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-gray-700 group-hover:text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-base font-bold rounded-full px-3 py-1 shadow-lg">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Header;
