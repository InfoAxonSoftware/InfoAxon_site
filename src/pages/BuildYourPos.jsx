import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiShoppingCart } from 'react-icons/hi';
import { useCatalog } from '../context/CatalogContext';
import { formatLkr } from '../data/hardwareData';
import { useHardwareCart } from '../context/HardwareCartContext';
import HardwareCatalogue from '../components/hardware/HardwareCatalogue';

const options = [
  {
    id: 'software',
    title: 'Software Only',
    description: 'Choose the right POS package without adding hardware.',
  },
  {
    id: 'hardware',
    title: 'Hardware Only',
    description: 'Build a compatible hardware bundle for your existing software.',
  },
  {
    id: 'complete',
    title: 'Complete POS Setup',
    description: 'Combine InfoAxon POS software with compatible counter hardware.',
  },
];

export default function BuildYourPos() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { packages: plans } = useCatalog();
  const {
    purchaseType,
    selectedPlanId,
    setPurchaseType,
    setSelectedPlanId,
    itemCount,
    subtotal,
  } = useHardwareCart();
  const allowedTypes = ['software', 'hardware', 'complete'];
  const requestedType = searchParams.get('type');
  const [selectedPurchaseType, setSelectedPurchaseType] = useState(() => allowedTypes.includes(requestedType) ? requestedType : (allowedTypes.includes(purchaseType) ? purchaseType : 'software'));
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setPurchaseType(selectedPurchaseType);
    if (requestedType !== selectedPurchaseType) setSearchParams({ type: selectedPurchaseType }, { replace: true });
  }, []);
  const handlePurchaseTypeChange = (type) => {
    if (!allowedTypes.includes(type)) return;
    setSelectedPurchaseType(type);
    setPurchaseType(type);
    const next = new URLSearchParams(searchParams);
    next.set('type', type);
    setSearchParams(next, { replace: true });
  };
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || null;
  const softwarePrice =
    selectedPurchaseType !== 'hardware' && selectedPlan
      ? Number(selectedPlan.price.replace(/,/g, ''))
      : 0;
  const showSoftware = selectedPurchaseType === 'software' || selectedPurchaseType === 'complete';
  const showHardware = selectedPurchaseType === 'hardware' || selectedPurchaseType === 'complete';
  const canCheckout = Boolean((showSoftware&&selectedPlan)||(showHardware&&itemCount>0));

  const startCheckout = () => {if(canCheckout)navigate('/pos-hardware/checkout')};

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 to-white dark:from-dark-950 dark:to-dark-950" />
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-400/10 blur-3xl dark:bg-primary-600/15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-subtitle">Configure your counter</span>
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="section-title">Build Your <span className="gradient-text">POS System</span></h1>
                <p className="mt-4 max-w-2xl text-dark-500 dark:text-dark-300">
                  Choose software, hardware, or a complete setup and request a tailored quotation through WhatsApp.
                </p>
              </div>
              <Link to="/pos-hardware/cart" className="btn-secondary self-start px-5 py-3 sm:self-auto">
                <HiShoppingCart /> Cart ({itemCount + (showSoftware && selectedPlan ? 1 : 0)})
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="space-y-14 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {options.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => handlePurchaseTypeChange(option.id)}
                className={`min-h-36 rounded-2xl border p-5 text-left transition-all ${
                  selectedPurchaseType === option.id
                    ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-500/10 dark:border-primary-500/50 dark:bg-primary-500/10'
                    : 'border-dark-200/70 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-dark-700/50 dark:bg-dark-900'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-bold text-dark-900 dark:text-white">{option.title}</h2>
                  <span className={`h-3 w-3 rounded-full border ${selectedPurchaseType === option.id ? 'border-primary-500 bg-primary-500' : 'border-dark-300 dark:border-dark-600'}`} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{option.description}</p>
              </button>
            ))}
          </div>
        </section>

        {showSoftware && (
          <section className="mx-auto max-w-7xl">
            <div className="mb-7">
              <span className="section-subtitle">Software package</span>
              <h2 className="mt-2 text-2xl font-bold text-dark-900 dark:text-white">Choose Your POS Plan</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => {
                const selected = selectedPlan?.id === plan.id;
                const detailsUrl =
                  '/solutions/custom-erp-pos?returnTo=' +
                  encodeURIComponent('/build-your-pos?type=' + selectedPurchaseType) +
                  '#plan-' +
                  plan.id;

                return (
                  <article key={plan.id} className={`flex h-full flex-col rounded-2xl border ${selected ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-500/10 dark:border-primary-500/50 dark:bg-primary-500/10' : 'border-dark-200/70 bg-white dark:border-dark-700/50 dark:bg-dark-900'}`}>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-dark-900 dark:text-white">{plan.name}</h3>
                        {plan.badge && <span className="rounded-full bg-gradient-to-r from-primary-600 to-cyan-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white">{plan.badge}</span>}
                      </div>
                      <div className="mt-3 text-2xl font-extrabold gradient-text">{formatLkr(Number(plan.price.replace(/,/g, '')))}</div>
                      <ul className="mt-4 flex-1 space-y-2">
                        {(plan.keyFeatures || plan.features).slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => setSelectedPlanId(selected?null:plan.id)} className={selected ? 'btn-secondary mt-5 w-full justify-center' : 'btn-primary mt-5 w-full justify-center'}>
                        {selected ? 'Unselect Plan' : 'Choose Plan'}
                      </button>
                    </div>
                    <Link to={detailsUrl} className="group flex items-center justify-between border-t border-dark-200/70 px-5 py-3 text-sm font-semibold text-primary-600 dark:border-dark-700/50 dark:text-primary-400">
                      <span>View Details</span><HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {showHardware && (
          <section className="mx-auto max-w-7xl">
            <div className="mb-7">
              <span className="section-subtitle">POS hardware</span>
              <h2 className="mt-2 text-2xl font-bold text-dark-900 dark:text-white">Choose Compatible Hardware</h2>
              <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">Compatibility is checked only when you proceed to checkout.</p>
            </div>
            <HardwareCatalogue />
          </section>
        )}

        <section className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl bg-dark-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between dark:bg-dark-800">
          <div>
            <div className="text-sm text-dark-300">Estimated total</div>
            <div className="mt-1 text-2xl font-extrabold">{formatLkr(softwarePrice + (showHardware ? subtotal : 0))}</div>
            <div className="mt-1 text-xs text-dark-400">{selectedPurchaseType === 'software' ? (selectedPlan?.name||'No software selected') : selectedPurchaseType === 'complete' ? `${selectedPlan?.name||'No software selected'} + ${itemCount} hardware item(s)` : `${itemCount} hardware item(s)`}</div>
          </div>
          <button type="button" disabled={!canCheckout} onClick={startCheckout} className="btn-primary min-h-12 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
            Proceed to Quotation Checkout
          </button>
          {!canCheckout&&<p className="text-center text-xs text-dark-400 sm:text-right">Select a software plan or add hardware to continue.</p>}
        </section>
      </main>

    </>
  );
}
