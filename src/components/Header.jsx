import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem'
      }}>
        <Link to="/" style={{ 
          color: '#ffffff', 
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Experience Drone
        </Link>
      </div>
    </header>
  );
};

export default Header; 