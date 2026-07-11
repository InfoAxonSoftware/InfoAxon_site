import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCatalog } from '../context/CatalogContext';
import { formatLkr } from '../data/hardwareData';
import { useHardwareCart } from '../context/HardwareCartContext';
import { api, messageOf } from '../lib/api';

const inputClass = 'w-full rounded-xl border border-dark-200 bg-dark-50 px-4 py-3 text-sm text-dark-900 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 dark:border-dark-700 dark:bg-dark-900 dark:text-white';

export default function HardwareCheckout() {
  const { packages: plans } = useCatalog();
  const {
    cartItems,
    subtotal,
    purchaseType,
    selectedPlanId,
  } = useHardwareCart();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', phone: '', email: '', location: '', notes: '' });
const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
  const showSoftware = purchaseType !== 'hardware' && selectedPlan;
  const showHardware = purchaseType !== 'software';
  const softwarePrice = showSoftware
    ? Number(selectedPlan.price.replace(/,/g, ''))
    : 0;
  const hardwareSubtotal = showHardware ? subtotal : 0;
  const total = hardwareSubtotal + softwarePrice;
  const purchaseTypeLabel =
    purchaseType === 'software'
      ? 'Software Only'
      : purchaseType === 'hardware'
        ? 'Hardware Only'
        : 'Complete POS Setup';
  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSubmitting(true);
    let saved;
    try {
      const response = await api.post('/quotations', {
        customerName: formData.name.trim(), businessName: formData.business.trim(),
        phone: formData.phone.trim(), email: formData.email.trim(), location: formData.location.trim(),
        purchaseType, softwarePackageId: showSoftware ? selectedPlan.id : null,
        items: showHardware ? cartItems.map(({ product, quantity }) => ({ productId: product.id, quantity })) : [],
        notes: formData.notes.trim(),
      });
      saved = response.data;
    } catch (error) {
      toast.error(messageOf(error));
      setSubmitting(false);
      return;
    }
    const hardwareLines = showHardware && cartItems.length
      ? cartItems.map(({ product, quantity }) => `- ${product.name} x ${quantity} — ${formatLkr(product.price)} each`).join('\n')
      : '- No hardware selected';
    const softwareLabel = showSoftware
      ? `${selectedPlan.name} — ${formatLkr(softwarePrice)}`
      : 'No software selected';
    const message = `Hello InfoAxon Software Solutions,

I would like to request a POS quotation.

Customer Name: ${formData.name.trim()}
Business Name: ${formData.business.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim()}
Location: ${formData.location.trim()}

Selected Software Package:
${softwareLabel}

Hardware Items:
${hardwareLines}

Purchase Type: ${purchaseTypeLabel}

Hardware Subtotal: ${formatLkr(hardwareSubtotal)}
Estimated Total: ${formatLkr(Number(saved.estimatedTotal))}

Notes:
${formData.notes.trim() || 'None'}`;
    const whatsappWindow = window.open(`https://wa.me/94711474064?text=${encodeURIComponent(message)}`, '_blank');
    if (!whatsappWindow) {
      toast.error('WhatsApp could not be opened. Please allow pop-ups and try again.');
      setSubmitting(false);
      return;
    }
    whatsappWindow.opener = null;
    toast.success('Your quotation request is ready in WhatsApp. Please send the message, and our team will contact you shortly.');
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-dark-50/60 px-4 pb-24 pt-32 dark:bg-dark-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <span className="section-subtitle">Quotation checkout</span>
        <h1 className="section-title mt-3">Review Your <span className="gradient-text">POS Setup</span></h1>
        <p className="mt-4 text-dark-500 dark:text-dark-400">No payment is collected. Submit the completed request through WhatsApp for a confirmed quotation.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-dark-200/70 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-900 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Customer name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
              <Field label="Business name" name="business" value={formData.business} onChange={handleChange} required className={inputClass} />
              <Field label="Phone number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={inputClass} />
              <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} />
            </div>
            <Field label="Location" name="location" value={formData.location} onChange={handleChange} required className={inputClass} />
            <div>
              <label className="mb-2 block text-xs font-medium text-dark-600 dark:text-dark-300" htmlFor="hardware-notes">Notes</label>
              <textarea id="hardware-notes" name="notes" value={formData.notes} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Installation requirements, preferred brands, delivery details..." />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-50">
              {submitting ? 'Opening WhatsApp...' : 'Request Quotation via WhatsApp'}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-dark-200/70 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-900 sm:p-7">
            <h2 className="text-lg font-bold text-dark-900 dark:text-white">Quotation Summary</h2>
            <div className="mt-5 rounded-xl bg-primary-50 p-4 dark:bg-primary-500/10">
              <div className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400">Software</div>
              <div className="mt-1 font-semibold text-dark-900 dark:text-white">{showSoftware ? selectedPlan.name : 'No software selected'}</div>
              {softwarePrice > 0 && <div className="mt-1 text-sm text-dark-500">{formatLkr(softwarePrice)}</div>}
            </div>
            <div className="mt-5 space-y-3">
              {showHardware && cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-dark-600 dark:text-dark-300">{product.name} × {quantity}</span>
                  <span className="flex-shrink-0 font-semibold text-dark-900 dark:text-white">{formatLkr(product.price * quantity)}</span>
                </div>
              ))}
              {(!showHardware || cartItems.length === 0) && <p className="text-sm text-dark-400">No hardware selected.</p>}
            </div>
            <div className="mt-6 space-y-2 border-t border-dark-200 pt-4 dark:border-dark-800">
              <div className="flex justify-between text-sm text-dark-500"><span>Hardware subtotal</span><span>{formatLkr(hardwareSubtotal)}</span></div>
              <div className="flex justify-between text-lg font-extrabold text-dark-900 dark:text-white"><span>Estimated total</span><span>{formatLkr(total)}</span></div>
            </div>
            <Link to="/build-your-pos" className="mt-5 block text-center text-sm font-semibold text-primary-600 dark:text-primary-400">← Continue shopping</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', value, onChange, required, className }) {
  const id = `hardware-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-dark-600 dark:text-dark-300">{label}</label>
      <input id={id} name={name} type={type} value={value} onChange={onChange} required={required} className={className} />
    </div>
  );
}
