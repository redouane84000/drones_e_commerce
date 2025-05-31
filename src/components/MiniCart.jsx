import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MiniCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Mini panier */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-bleu-nuit">Votre Panier</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Votre panier est vide
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 border-b pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-bleu-nuit">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.quantity} x {item.price.toFixed(2)} €
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-bleu-nuit">
                        {getTotal().toFixed(2)} €
                      </span>
                    </div>

                    <Link
                      to="/panier"
                      onClick={onClose}
                      className="block w-full bg-bleu-nuit text-white text-center py-2 rounded-lg hover:bg-bleu-nuit/90 transition-colors"
                    >
                      Voir le panier
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart; 