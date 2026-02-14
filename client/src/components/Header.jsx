import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { cartCount } = useCart();
  const { isLoggedIn, setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      navigate('/login');
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Shop Sphere
        </Link>
        <div className="flex items-center gap-6">
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
          {/* Profile Dropdown */}
          <Menu as="div" className="relative ml-3">
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="font-medium text-gray-700">{isLoggedIn ? `Hello ${user.username}` : "Guest"}</span>
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5">
            {isLoggedIn ? (
              <MenuItem>
                {() => (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </button>
                )}
              </MenuItem>
            ) : (
              <>
              <MenuItem>
                {() => (
                  <button
                    onClick={() => navigate('/login')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                  >
                    Sign in
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {() => (
                  <button
                    onClick={() => navigate('/register')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                  >
                    Register
                  </button>
                )}
              </MenuItem>
              </>
            )}
              
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Header;
