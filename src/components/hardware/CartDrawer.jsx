import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiMinus, HiPlus, HiTrash, HiX } from 'react-icons/hi';
import { formatLkr } from '../../data/hardwareData';
import { useHardwareCart } from '../../context/HardwareCartContext';

export default function CartDrawer({ open, onClose, checkoutUrl, estimatedTotal,canCheckout }) {
  const { cartItems, subtotal, updateQuantity, removeItem } = useHardwareCart();
  const total = estimatedTotal ?? subtotal;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close hardware cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-dark-950"
          >
            <div className="flex items-center justify-between border-b border-dark-200 px-5 py-5 dark:border-dark-800">
              <div>
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">Hardware Cart</h2>
                <p className="text-xs text-dark-400">Review quantities before checkout</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-100 text-dark-600 dark:bg-dark-800 dark:text-dark-300"
                aria-label="Close cart"
              >
                <HiX size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-lg font-semibold text-dark-800 dark:text-white">Your cart is empty</div>
                  <p className="mt-2 max-w-xs text-sm text-dark-400">Add compatible POS hardware to prepare your quotation.</p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="rounded-xl border border-dark-200/70 p-4 dark:border-dark-700/50">
                    <div className="flex gap-3">
                      <img src={product.imageUrl || '/favicon.svg'} alt={product.name} onError={e=>{e.currentTarget.src='/favicon.svg'}} className="h-16 w-16 flex-shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-dark-900 dark:text-white">{product.name}</div>
                        <div className="mt-1 text-sm font-bold text-primary-600 dark:text-primary-400">{formatLkr(product.price)}</div>
                      </div>
                      <button type="button" onClick={() => removeItem(product.id)} className="text-dark-400 hover:text-red-500" aria-label={`Remove ${product.name}`}>
                        <HiTrash />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-end gap-3">
                      <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-100 dark:bg-dark-800"><HiMinus size={13} /></button>
                      <span className="w-6 text-center text-sm font-semibold text-dark-900 dark:text-white">{quantity}</span>
                      <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-100 dark:bg-dark-800"><HiPlus size={13} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-dark-200 p-5 dark:border-dark-800">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-500 dark:text-dark-400">Hardware subtotal</span>
                  <span className="font-semibold text-dark-800 dark:text-dark-200">{formatLkr(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-dark-700 dark:text-dark-300">Estimated total</span>
                  <span className="text-xl font-extrabold text-dark-900 dark:text-white">{formatLkr(total)}</span>
                </div>
              </div>
              <Link
                to={checkoutUrl}
                onClick={onClose}
                className={`btn-primary w-full justify-center ${!(canCheckout??cartItems.length>0) ? 'pointer-events-none opacity-50' : ''}`}
              >
                Proceed to Checkout
              </Link>
              <button type="button" onClick={onClose} className="mt-3 w-full py-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
                Continue shopping
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
