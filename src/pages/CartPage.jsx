import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaCreditCard, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  // Sauvegarder dans le localStorage à chaque modification du panier
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Panier sauvegardé:', cartItems);
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Convertir le prix en nombre si c'est une chaîne
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(' EUR', '').replace(',', '.'))
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Votre Panier</h1>
        <div className="cart-summary">
          <span className="cart-count">{cartItems.length} article(s)</span>
          <span className="cart-total">Total: {calculateTotal().toFixed(2)} EUR</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Votre panier est vide</h2>
          <button 
            className="return-btn"
            onClick={() => navigate('/drones')}
          >
            <FaArrowLeft /> Retourner au catalogue
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{item.price} EUR</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="item-total">
                  {(() => {
                    const price = typeof item.price === 'string' 
                      ? parseFloat(item.price.replace(' EUR', '').replace(',', '.'))
                      : item.price;
                    return (price * item.quantity).toFixed(2) + ' EUR';
                  })()}
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button 
              className="return-btn"
              onClick={() => navigate('/drones')}
            >
              <FaArrowLeft /> Continuer mes achats
            </button>
            <button 
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              <FaCreditCard /> Passer au paiement
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage; 