import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiShoppingCart } from 'react-icons/hi';
import { useCatalog } from '../context/CatalogContext';
import { formatLkr } from '../data/hardwareData';
import { useHardwareCart } from '../context/HardwareCartContext';
import ProductCard from '../components/hardware/ProductCard';
import PurchaseOptions from '../components/hardware/PurchaseOptions';
import CartDrawer from '../components/hardware/CartDrawer';

export default function PosSetupBuilder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount, subtotal,selectedPlanId,setSelectedPlanId } = useHardwareCart();
  const {packages:plans,products:hardwareProducts}=useCatalog();
  const requestedPlan = searchParams.get('plan');
  const selectedPlan = plans.find((plan) => plan.id === (requestedPlan||selectedPlanId)) || null;

  const choosePlan = (planId) => {
    const next=selectedPlan?.id===planId?null:planId;
    setSelectedPlanId(next);
    setSearchParams(next?{ plan: next }:{});
  };

  const softwarePrice = Number(selectedPlan?.price?.replace(/,/g, '')) || 0;
  const checkoutUrl = `/pos-hardware/checkout?mode=complete&plan=${selectedPlan?.id || ''}`;
  const canCheckout=Boolean(selectedPlan||itemCount);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 to-white dark:from-dark-950 dark:to-dark-950" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-subtitle">Complete POS Setup</span>
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="section-title">POS Setup <span className="gradient-text">Builder</span></h1>
                <p className="mt-4 max-w-2xl text-dark-500 dark:text-dark-300">
                  Combine your software package with compatible hardware and check the setup before requesting a quotation.
                </p>
              </div>
              <button type="button" onClick={() => setCartOpen(true)} className="btn-primary self-start px-5 py-3 sm:self-auto">
                <HiShoppingCart /> Cart ({itemCount})
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="space-y-12 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><PurchaseOptions active="complete" /></div>

        <section className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="section-subtitle">Step 1</span>
            <h2 className="mt-2 text-2xl font-bold text-dark-900 dark:text-white">Choose Software</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const selected = selectedPlan?.id === plan.id;
              const returnPath = '/pos-hardware/builder?plan=' + plan.id;
              const detailsUrl =
                '/solutions/custom-erp-pos?returnTo=' +
                encodeURIComponent(returnPath) +
                '#plan-' +
                plan.id;

              return (
                <article
                  key={plan.id}
                  className={
                    'flex h-full flex-col rounded-2xl border transition-all ' +
                    (selected
                      ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-500/10 dark:border-primary-500/50 dark:bg-primary-500/10'
                      : 'border-dark-200/70 bg-white dark:border-dark-700/50 dark:bg-dark-900')
                  }
                >
                  <button
                    type="button"
                    onClick={() => choosePlan(plan.id)}
                    className="flex-1 p-5 text-left"
                    aria-pressed={selected}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-bold text-dark-900 dark:text-white">
                        {plan.name}
                      </div>
                      <span className={'h-3 w-3 rounded-full border ' + (selected ? 'border-primary-500 bg-primary-500' : 'border-dark-300 dark:border-dark-600')} />
                    </div>
                    <div className="mt-2 text-lg font-extrabold gradient-text">
                      {formatLkr(Number(plan.price.replace(/,/g, '')))}
                    </div>
                    <div className="mt-2 text-sm text-dark-500 dark:text-dark-400">
                      {plan.description}
                    </div>
                  </button>
                  <Link
                    to={detailsUrl}
                    className="group flex items-center justify-between border-t border-dark-200/70 px-5 py-3 text-sm font-semibold text-primary-600 dark:border-dark-700/50 dark:text-primary-400"
                  >
                    <span>View details</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="section-subtitle">Step 2</span>
              <h2 className="mt-2 text-2xl font-bold text-dark-900 dark:text-white">Add Compatible Hardware</h2>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-xs text-dark-400">Current estimate</div>
              <div className="font-extrabold text-dark-900 dark:text-white">{formatLkr(softwarePrice + subtotal)}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hardwareProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-2xl bg-dark-900 p-6 text-white sm:flex-row dark:bg-dark-800">
          <div>
            <div className="text-sm text-dark-300">Estimated software + hardware total</div>
            <div className="mt-1 text-2xl font-extrabold">{formatLkr(softwarePrice + subtotal)}</div>
          </div>
          {canCheckout?<Link to={checkoutUrl} className="btn-primary w-full justify-center sm:w-auto">Proceed to Checkout</Link>:<button type="button" disabled className="btn-primary w-full justify-center opacity-50 sm:w-auto">Select software or hardware first</button>}
        </div>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        checkoutUrl={checkoutUrl}
        estimatedTotal={softwarePrice + subtotal}
        canCheckout={canCheckout}
      />
    </>
  );
}
