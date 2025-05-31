import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      color: '#ffffff',
      padding: '0.5rem 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {/* À propos */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold',
              marginBottom: '0.3rem',
              color: '#ffffff'
            }}>
              À propos
            </h3>
            <p style={{ 
              color: '#ffffff',
              fontSize: '0.8rem',
              lineHeight: '1.3'
            }}>
              Drone-Experience, votre spécialiste en drones et formations.
            </p>
          </div>

          {/* Liens rapides */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold',
              marginBottom: '0.3rem',
              color: '#ffffff'
            }}>
              Liens rapides
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
              <li>
                <Link to="/drones" style={{ 
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  transition: 'color 0.3s ease'
                }}>
                  Nos Drones
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ 
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  transition: 'color 0.3s ease'
                }}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/formations" style={{ 
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  transition: 'color 0.3s ease'
                }}>
                  Formations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold',
              marginBottom: '0.3rem',
              color: '#ffffff'
            }}>
              Contact
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: '#ffffff',
              fontSize: '0.8rem'
            }}>
              <li style={{ marginBottom: '0.2rem' }}>contact@drone-experience.com</li>
              <li style={{ marginBottom: '0.2rem' }}>01 23 45 67 89</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: '0.7rem'
        }}>
          <p>&copy; {new Date().getFullYear()} Drone-Experience. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 