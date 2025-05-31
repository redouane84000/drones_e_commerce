import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

const Navigation = ({ cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos Drones', path: '/drones' },
    { name: 'Services', path: '/services' },
    { name: 'Formations', path: '/formations' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Contact', path: '/contact' }
  ];

  const totalItems = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  return (
    <nav style={{ position: 'relative', zIndex: 9999 }}>
      <div>
        {/* Menu mobile */}
        <div className="mobile-menu">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                color: '#ffffff', 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 1001
              }}
            >
              <FaBars size={24} />
            </button>
            <Link
              to="/cart"
              className="nav-link cart-link"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 1001
              }}
            >
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </div>
          
          {isMenuOpen && (
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.95)',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 9999,
              padding: '0.5rem 0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Menu desktop */}
        <div className="desktop-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="nav-link cart-link"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 