import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi';
import { useHardwareCart } from '../context/HardwareCartContext';
import { formatLkr } from '../data/hardwareData';
import { pricingSolutions } from '../data/pricingData';
import CompatibilityChecker from '../components/hardware/CompatibilityChecker';

export default function HardwareCart() {
  const navigate = useNavigate();
  const [checkerOpen, setCheckerOpen] = useState(false);
  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeItem,
    purchaseType,
    selectedPlanId,
  } = useHardwareCart();
  const plans =
    pricingSolutions.find((solution) => solution.id === 'erp')?.plans || [];
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
  const showSoftware = purchaseType !== 'hardware' && selectedPlan;
  const showHardware = purchaseType !== 'software';
  const softwarePrice = showSoftware
    ? Number(selectedPlan.price.replace(/,/g, ''))
    : 0;
  const total = softwarePrice + (showHardware ? subtotal : 0);

  const startCheckout = () => {
    if (showHardware) {
      setCheckerOpen(true);
      return;
    }
    navigate('/pos-hardware/checkout');
  };

  const proceedAfterCheck = () => {
    setCheckerOpen(false);
    navigate('/pos-hardware/checkout');
  };

  return (
    <>
      <main className="min-h-screen bg-dark-50/60 px-4 pb-24 pt-32 dark:bg-dark-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="section-subtitle">Build Your POS</span>
          <h1 className="section-title mt-3">
            Your POS <span className="gradient-text">Cart</span>
          </h1>

          {showSoftware && (
            <section className="mt-10 rounded-2xl border border-primary-200/70 bg-primary-50/70 p-5 dark:border-primary-500/20 dark:bg-primary-500/10 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                    Selected software
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-dark-900 dark:text-white">
                    {selectedPlan.name}
                  </h2>
                  <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
                    {formatLkr(softwarePrice)}
                  </p>
                </div>
                <Link
                  to="/build-your-pos"
                  className="text-sm font-semibold text-primary-600 dark:text-primary-400"
                >
                  Change software plan →
                </Link>
              </div>
            </section>
          )}

          {showHardware && (
            <div className="mt-6 space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="flex flex-col gap-4 rounded-2xl border border-dark-200/70 bg-white p-4 dark:border-dark-700/50 dark:bg-dark-900 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-24 w-full rounded-xl object-cover sm:w-28"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-dark-900 dark:text-white">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                      {formatLkr(product.price)} each
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-100 dark:bg-dark-800"
                      >
                        <HiMinus size={13} />
                      </button>
                      <span className="w-7 text-center font-semibold text-dark-900 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-100 dark:bg-dark-800"
                      >
                        <HiPlus size={13} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-dark-400 hover:text-red-500"
                      aria-label={'Remove ' + product.name}
                    >
                      <HiTrash />
                    </button>
                  </div>
                </article>
              ))}

              {cartItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-dark-300 p-10 text-center dark:border-dark-700">
                  <h2 className="font-bold text-dark-900 dark:text-white">
                    No hardware selected
                  </h2>
                  <p className="mt-2 text-sm text-dark-400">
                    You can continue, and the compatibility check will help
                    identify essential equipment.
                  </p>
                </div>
              )}
            </div>
          )}

          <section className="mt-8 rounded-2xl border border-dark-200/70 bg-white p-6 dark:border-dark-700/50 dark:bg-dark-900">
            <div className="space-y-2">
              {showSoftware && (
                <div className="flex justify-between text-sm text-dark-500 dark:text-dark-400">
                  <span>Software subtotal</span>
                  <span>{formatLkr(softwarePrice)}</span>
                </div>
              )}
              {showHardware && (
                <div className="flex justify-between text-sm text-dark-500 dark:text-dark-400">
                  <span>Hardware subtotal</span>
                  <span>{formatLkr(subtotal)}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-dark-200 pt-3 text-xl font-extrabold text-dark-900 dark:border-dark-800 dark:text-white">
                <span>Estimated total</span>
                <span>{formatLkr(total)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                to="/build-your-pos"
                className="btn-secondary justify-center"
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={startCheckout}
                className="btn-primary justify-center"
              >
                Proceed to Quotation Checkout
              </button>
            </div>
          </section>
        </div>
      </main>

      <CompatibilityChecker
        open={checkerOpen}
        onClose={() => setCheckerOpen(false)}
        onProceed={proceedAfterCheck}
      />
    </>
  );
}