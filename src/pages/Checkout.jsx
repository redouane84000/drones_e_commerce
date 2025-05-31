import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe('pk_test_51RUb6zFpbwjXDkApqaMzyto9AKiX4TBywlDlrPuZEpxDr9UqM1U0ugA7uhPJiY6SsgSWaKMb6lunrGAvSdLkF7yG00BodkqBM1');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Open Sans", sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '10px 12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Composant du formulaire de paiement
function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('https://dronesecommerce-production.up.railway.app/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amountInEuros: amount }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError('Erreur lors de la création de l\'intention de paiement');
        console.error(err);
      }
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      // Vérifier d'abord si le paiement a réussi
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Paiement réussi !');
        navigate('/payment/success');
        return;
      }

      // Si le paiement n'a pas réussi, on gère l'erreur
      if (stripeError) {
        console.error('Erreur Stripe:', stripeError);
        setError(stripeError.message);
        setTimeout(() => {
          navigate('/payment/failed');
        }, 2000);
      } else {
        console.error('Paiement échoué sans erreur spécifique');
        setError('Le paiement n\'a pas pu être traité');
        setTimeout(() => {
          navigate('/payment/failed');
        }, 2000);
      }
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError('Une erreur est survenue lors du paiement');
      setTimeout(() => {
        navigate('/payment/failed');
      }, 2000);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}>
      <h2 style={{ 
        color: '#ffffff',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Paiement de {amount.toFixed(2)} €
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          color: '#ffffff',
          marginBottom: '0.5rem',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          Numéro de carte
        </label>
        <div style={{
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Date d'expiration
          </label>
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Code de sécurité (CVC)
          </label>
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          color: '#f44336',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.1rem',
          cursor: processing ? 'not-allowed' : 'pointer',
          opacity: processing ? 0.7 : 1,
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => !processing && (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => !processing && (e.target.style.backgroundColor = '#4CAF50')}
      >
        {processing ? 'Traitement en cours...' : 'Payer'}
      </button>
    </form>
  );
}

// Composant principal Checkout
function Checkout() {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  // Premier useEffect pour le calcul initial
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log('Articles du panier (raw):', cartItems);

    const total = cartItems.reduce((sum, item) => {
      console.log('Traitement de l\'article:', item);
      
      let price;
      if (typeof item.price === 'string') {
        const priceStr = item.price.replace(/[^\d.,]/g, '');
        console.log('Prix nettoyé:', priceStr);
        price = parseFloat(priceStr.replace(',', '.'));
        console.log('Prix converti:', price);
      } else {
        price = item.price;
        console.log('Prix direct:', price);
      }

      if (isNaN(price)) {
        console.error('Prix invalide pour l\'article:', item);
        return sum;
      }

      const quantity = item.quantity || 1;
      console.log(`Article: ${item.name}, Prix: ${price}, Quantité: ${quantity}, Sous-total: ${price * quantity}`);
      
      return sum + (price * quantity);
    }, 0);

    console.log('Total final calculé:', total);
    setTotalAmount(total);
  }, []);

  // Deuxième useEffect pour la synchronisation avec le localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cartItems') {
        const cartItems = JSON.parse(e.newValue || '[]');
        console.log('Nouveaux articles du panier:', cartItems);

        const total = cartItems.reduce((sum, item) => {
          let price;
          if (typeof item.price === 'string') {
            const priceStr = item.price.replace(/[^\d.,]/g, '').replace(',', '.');
            price = parseFloat(priceStr);
            console.log(`Prix converti pour ${item.name}:`, price);
          } else {
            price = item.price;
            console.log(`Prix direct pour ${item.name}:`, price);
          }

          if (isNaN(price)) {
            console.error('Prix invalide pour l\'article:', item);
            return sum;
          }

          const quantity = item.quantity || 1;
          const itemTotal = price * quantity;
          console.log(`Sous-total pour ${item.name}:`, itemTotal);
          
          return sum + itemTotal;
        }, 0);

        console.log('Nouveau total calculé:', total);
        setTotalAmount(total);
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('storage', handleStorageChange);

    // Vérifier immédiatement le contenu du localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length > 0) {
      handleStorageChange({ key: 'cartItems', newValue: JSON.stringify(cartItems) });
    }

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <button
        onClick={() => navigate('/cart')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '2rem',
          cursor: 'pointer'
        }}
      >
        Retour au panier
      </button>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={totalAmount} />
      </Elements>
    </div>
  );
}

export default Checkout; 