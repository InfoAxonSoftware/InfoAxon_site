import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { companyInfo } = useData();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 to-white dark:from-dark-950 dark:to-dark-950" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary-400/10 dark:bg-primary-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/5 dark:bg-accent-cyan/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 text-sm text-dark-400 mb-6">
              <span>Home</span>
              <span>/</span>
              <span className="text-primary-400">Contact</span>
            </div>
            <span className="section-subtitle">Contact Us</span>
            <h1 className="section-title mt-4 mb-6 max-w-3xl">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Great Together</span>
            </h1>
            <p className="section-description max-w-3xl">
              Get in touch with our team and let&apos;s discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Map Placeholder */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card overflow-hidden h-80">
            <div className="w-full h-full bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">{companyInfo.name}</h3>
                <p className="text-dark-400">{companyInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
