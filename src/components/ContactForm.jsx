import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPaperAirplane, HiPhone, HiMail, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';

const inputClass =
  'w-full bg-dark-50 dark:bg-dark-900/60 border border-dark-200 dark:border-dark-700/60 rounded-xl px-4 py-3 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-white/30 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400/60 focus:ring-1 focus:ring-primary-500/30 dark:focus:ring-primary-400/30 transition-colors duration-200 text-sm';

const budgetOptions = {
  erp: [
    { value: 'erp-starter',      label: 'Starter — LKR 150,000  (4–6 weeks)' },
    { value: 'erp-professional', label: 'Professional — LKR 450,000  (8–12 weeks)' },
    { value: 'erp-enterprise',   label: 'Enterprise — LKR 450,000+  (Custom scope)' },
  ],
  crm: [
    { value: 'crm-starter',      label: 'Starter — LKR 100,000  (3–5 weeks)' },
    { value: 'crm-professional', label: 'Professional — LKR 300,000  (6–10 weeks)' },
    { value: 'crm-enterprise',   label: 'Enterprise — LKR 300,000+  (Custom scope)' },
  ],
  ecommerce: [
    { value: 'web-starter',      label: 'Starter — LKR 80,000  (2–4 weeks)' },
    { value: 'web-professional', label: 'Professional — LKR 250,000  (5–9 weeks)' },
    { value: 'web-enterprise',   label: 'Enterprise — LKR 250,000+  (Custom scope)' },
  ],
  mobile: [
    { value: 'mob-starter',      label: 'Starter — LKR 180,000  (5–7 weeks)' },
    { value: 'mob-professional', label: 'Professional — LKR 500,000  (10–16 weeks)' },
    { value: 'mob-enterprise',   label: 'Enterprise — LKR 500,000+  (Custom scope)' },
  ],
  bespoke: [
    { value: 'cus-starter',      label: 'Starter — LKR 200,000  (4–7 weeks)' },
    { value: 'cus-professional', label: 'Professional — LKR 600,000  (10–18 weeks)' },
    { value: 'cus-enterprise',   label: 'Enterprise — LKR 600,000+  (Custom scope)' },
  ],
};

export default function ContactForm() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  const [formData, setFormData] = useState({
    name: '', email: '', service: '', budget: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset budget whenever service changes
      ...(name === 'service' ? { budget: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: '', email: '', service: '', budget: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-dark-50/60 dark:bg-dark-900/60">
      {/* Decorative top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-200/60 dark:via-dark-700/40 to-transparent" />
      {/* Subtle blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 dark:bg-accent-cyan/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-14 xl:gap-20 items-start">

            {/* ── Left ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 px-4 py-1.5 rounded-full mb-5">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-dark-900 dark:text-white mb-5">
                Have a project{' '}
                <span className="gradient-text">in mind?</span>
              </h2>
              <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-10 text-sm max-w-sm">
                Let&apos;s discuss how we can transform your business with custom software solutions.
                We respond within 24 hours.
              </p>

              {/* Contact details */}
              <div className="space-y-5">
                {[
                  { icon: HiLocationMarker, label: 'Visit Us',  value: companyInfo.address },
                  { icon: HiPhone,          label: 'Call Us',   value: companyInfo.phone },
                  { icon: HiMail,           label: 'Email Us',  value: companyInfo.email },
                ].map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                    <div>
                      <div className="text-dark-400 dark:text-dark-500 text-xs mb-0.5">{label}</div>
                      <div className="text-dark-800 dark:text-white/80 text-sm font-medium">{value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

             
            </motion.div>

            {/* ── Right — Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-dark-800/40 border border-dark-200/60 dark:border-dark-700/40 rounded-3xl p-8 space-y-5 shadow-sm dark:shadow-none"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-dark-600 dark:text-dark-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-600 dark:text-dark-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-dark-600 dark:text-dark-300 mb-2">Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      <option value="erp">Custom ERP & POS</option>
                      <option value="crm">CRM & Distribution</option>
                      <option value="ecommerce">Business Website Development</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="bespoke">Custom Software</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-600 dark:text-dark-300 mb-2">Budget / Plan</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={!formData.service}
                      className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <option value="">
                        {formData.service ? 'Select a plan' : 'Select a service first'}
                      </option>
                      {(budgetOptions[formData.service] || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-dark-600 dark:text-dark-300 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm py-3.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane className="rotate-90" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
