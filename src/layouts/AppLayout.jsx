import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AppLayout = ({ cartItems }) => {
  return (
    <div className="min-h-screen relative">
      {/* Image de fond fixe pour mobile */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: 'url(/drone3.png)' }}
      />

      {/* Image de fond fixe pour desktop */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: 'url(/drone2.png)' }}
      />

      {/* Contenu principal avec overlay */}
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <Navigation cartItems={cartItems} />
        
        {/* Contenu des pages */}
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout; 