import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiExclamation, HiPlus, HiShieldCheck, HiX } from 'react-icons/hi';
import { hardwareProducts } from '../../data/hardwareData';
import { useHardwareCart } from '../../context/HardwareCartContext';

const recommendations = [
  { type: 'computer', label: 'POS terminal or computer', required: true, reason: 'This is required to run the POS software and operate the counter.' },
  { type: 'scanner', label: 'Barcode scanner', required: true, reason: 'A scanner is required for fast and accurate product checkout.' },
  { type: 'receipt-printer', label: 'Receipt printer', required: true, reason: 'A receipt printer is required to provide printed customer receipts.' },
  { type: 'cash-drawer', label: 'Cash drawer', required: false, reason: 'Recommended for secure cash handling at the counter.' },
  { type: 'ups', label: 'UPS', required: false, reason: 'Recommended to protect the POS setup during power interruptions.' },
];

export function getMissingHardware(cartItems) {
  const selectedTypes = new Set(cartItems.map((item) => item.product.compatibilityType));
  return recommendations.filter((item) => !selectedTypes.has(item.type));
}

export default function CompatibilityChecker({ open, onClose, onProceed }) {
  const { cartItems, addItem } = useHardwareCart();
  const [ownedConfirmations, setOwnedConfirmations] = useState({});
  const missing = getMissingHardware(cartItems);
  const requiredMissing = missing.filter((item) => item.required);
  const optionalMissing = missing.filter((item) => !item.required);
  const requiredConfirmed = requiredMissing.every((item) => ownedConfirmations[item.type]);

  useEffect(() => {
    if (!open) setOwnedConfirmations({});
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close compatibility checker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 top-0 z-[80] flex w-[calc(100vw-1rem)] max-w-md flex-col bg-white shadow-2xl dark:bg-dark-950 sm:w-full"
          >
            <div className="flex items-start justify-between border-b border-dark-200 p-5 dark:border-dark-800">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                  <HiShieldCheck size={23} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-dark-900 dark:text-white">Check Your POS Setup</h2>
                  <p className="mt-1 text-xs leading-relaxed text-dark-400">Confirm the essential hardware before quotation checkout.</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="text-dark-400 hover:text-dark-900 dark:hover:text-white" aria-label="Close compatibility checker">
                <HiX size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {missing.length === 0 ? (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Your cart contains the required and recommended POS hardware.
                </div>
              ) : (
                missing.map((item) => {
                  const recommendation = hardwareProducts.find((product) => product.compatibilityType === item.type);
                  return (
                    <div
                      key={item.type}
                      className={'rounded-xl border p-4 ' + (item.required ? 'border-red-200/70 bg-red-50/60 dark:border-red-500/20 dark:bg-red-500/5' : 'border-amber-200/70 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/5')}
                    >
                      <div className="flex items-start gap-2">
                        <HiExclamation className={'mt-0.5 flex-shrink-0 ' + (item.required ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400')} />
                        <div>
                          <div className="text-sm font-bold text-dark-900 dark:text-white">
                            {item.required ? 'Required: ' : 'Recommended: '}{item.label}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-dark-600 dark:text-dark-400">{item.reason}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-3">
                        {recommendation && (
                          <button
                            type="button"
                            onClick={() => addItem(recommendation.id, 1)}
                            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-primary-300 px-4 text-sm font-semibold text-primary-600 dark:border-primary-500/40 dark:text-primary-400"
                          >
                            <HiPlus /> Add Recommended Item
                          </button>
                        )}
                        {item.required && (
                          <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-dark-600 dark:text-dark-300">
                            <input
                              type="checkbox"
                              checked={!!ownedConfirmations[item.type]}
                              onChange={(event) => setOwnedConfirmations((current) => ({ ...current, [item.type]: event.target.checked }))}
                              className="mt-0.5 h-4 w-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
                            />
                            {'I confirm that I already own compatible ' + item.label + '.'}
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-dark-200 p-4 dark:border-dark-800 sm:p-5">
              {!requiredConfirmed && (
                <p className="mb-3 text-xs leading-relaxed text-red-600 dark:text-red-400">
                  Add each required item or confirm that you already own compatible hardware.
                </p>
              )}
              <button type="button" onClick={onProceed} disabled={!requiredConfirmed} className="btn-primary min-h-12 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">
                {optionalMissing.length > 0 ? 'Continue Without Optional Items' : 'Continue to Quotation Checkout'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}