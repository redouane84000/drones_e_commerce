import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import CartPage from './pages/CartPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const products = [
    {
      id: 1,
      name: "Drone Pro X1",
      price: "1,00 €",
      image: "/produit4.png"
    },
    {
      id: 2,
      name: "Drone Elite X2",
      price: "1,00 €",
      image: "/produit5.png"
    },
    {
      id: 3,
      name: "Drone Master X3",
      price: "1,00 €",
      image: "/produit6.png"
    }
  ];

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout cartItems={cartItems} />}>
          <Route path="/" element={
            <div style={{ 
              color: '#ffffff',
              padding: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <div className="section" style={{
                textAlign: 'center',
                padding: '4rem 0'
              }}>
                <button className="button" style={{ marginTop: '2rem' }}>
                  Découvrir nos services
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
                marginTop: '4rem',
                '@media (min-width: 768px)': {
                  gridTemplateColumns: 'repeat(3, 1fr)'
                }
              }}>
                <div className="card service-card">
                  <h2>Nos Drones</h2>
                  <p>Découvrez notre gamme complète de drones professionnels</p>
                  <Link to="/drones" style={{ textDecoration: 'none' }}>
                    <button className="button" style={{ marginTop: '1.5rem' }}>
                      Explorer
                    </button>
                  </Link>
                </div>

                <div className="card service-card">
                  <h2>Services</h2>
                  <p>Des solutions adaptées à vos besoins</p>
                  <button className="button" style={{ marginTop: '1.5rem' }}>
                    Découvrir
                  </button>
                </div>

                <div className="card service-card">
                  <h2>Formations</h2>
                  <p>Formez-vous aux meilleures pratiques du pilotage</p>
                  <button className="button" style={{ marginTop: '1.5rem' }}>
                    S'inscrire
                  </button>
                </div>
              </div>

              <div className="section" style={{
                textAlign: 'center',
                marginTop: '4rem',
                padding: '2rem'
              }}>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: '300'
                }}>
                  Prêt à commencer votre aventure ?
                </h2>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '2rem'
                }}>
                  Contactez-nous dès aujourd'hui pour en savoir plus
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="button">
                    Nous contacter
                  </button>
                </Link>
              </div>
            </div>
          } />
          <Route path="/drones" element={
            <div style={{ 
              position: 'relative',
              minHeight: '100vh',
              width: '100%'
            }}>
              {/* Image de fond */}
              <img 
                src="/drone3.png"
                alt="Background"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              {/* Conteneur du carrousel */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                gap: '2rem'
              }}>
                {/* Grille de produits */}
                <div className="products-container">
                  <div className="products-grid">
                    {products.map(product => (
                      <div key={product.id} className="product-card">
                        <div className="product-image-container">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                          />
                        </div>
                        <div>
                          <h3 className="product-title">{product.name}</h3>
                          <p className="product-price">{product.price}</p>
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                          >
                            Ajouter au panier
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/services" element={<div style={{ color: '#ffffff' }}>Services</div>} />
          <Route path="/formations" element={<div style={{ color: '#ffffff' }}>Formations</div>} />
          <Route path="/galerie" element={<div style={{ color: '#ffffff' }}>Galerie</div>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={
            <CartPage 
              cartItems={cartItems} 
              setCartItems={setCartItems}
            />
          } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
