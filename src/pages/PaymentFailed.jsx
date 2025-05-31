import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentFailed() {
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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#f44336'
        }}>
          Paiement Échoué
        </h1>
        <p style={{ 
          fontSize: '1.2rem',
          marginBottom: '2rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          Une erreur est survenue lors du traitement de votre paiement. Veuillez vérifier vos informations et réessayer.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/cart')}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Réessayer
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#666'}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed; 