import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dronesecommerce-production.up.railway.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Message envoyé avec succès !');
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          message: ''
        });
      } else {
        alert(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi du message');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#ffffff',
        marginBottom: '2rem',
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '600'
      }}>
        Contactez-nous
      </h1>
      <form onSubmit={handleSubmit} style={{
        maxWidth: '600px',
        width: '100%',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#424770'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#424770'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#424770'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#424770',
              resize: 'vertical',
              minHeight: '120px'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact; 