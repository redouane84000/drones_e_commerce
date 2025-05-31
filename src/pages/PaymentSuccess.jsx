import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '3rem',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#4CAF50'
        }}>
          Paiement Réussi !
        </h1>
        <p style={{ 
          fontSize: '1.2rem',
          marginBottom: '2rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          Votre commande a été confirmée avec succès. Un email de confirmation vous sera envoyé dans les plus brefs délais.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess; 