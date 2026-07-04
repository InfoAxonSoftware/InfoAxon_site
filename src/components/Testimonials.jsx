import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'Rajan Perera',
    role: 'Owner',
    company: 'AutoCool Service Center',
    service: 'ERP & POS',
    accentFrom: 'from-blue-500',
    accentTo: 'to-cyan-500',
    dotColor: 'bg-blue-500',
    quote:
      'The custom POS and ERP system InfoAxon built for us completely transformed how we operate. Billing that used to take 20 minutes now takes under 3. Our inventory accuracy went from guesswork to near-perfect. Genuinely life-changing for our workshop.',
    rating: 5,
  },
  {
    name: 'Dilini Jayawardena',
    role: 'Operations Manager',
    company: 'RetailMax Lanka',
    service: 'ERP & POS',
    accentFrom: 'from-primary-500',
    accentTo: 'to-violet-500',
    dotColor: 'bg-primary-500',
    quote:
      'Managing five branches used to be a nightmare with spreadsheets. InfoAxon delivered a unified ERP that gives us real-time visibility across every outlet. The team was incredibly responsive and understood our business deeply.',
    rating: 5,
  },
  {
    name: 'Kasun Fernando',
    role: 'CEO',
    company: 'DistroConnect Wholesale',
    service: 'CRM & Distribution',
    accentFrom: 'from-violet-500',
    accentTo: 'to-pink-500',
    dotColor: 'bg-violet-500',
    quote:
      'Our order processing used to be slow and error-prone. The CRM platform InfoAxon built cut our processing time in half and almost eliminated manual mistakes. The customer portal our clients use is polished and intuitive.',
    rating: 5,
  },
  {
    name: 'Amaya Wijesinghe',
    role: 'Marketing Director',
    company: 'Pulse Fashion Brand',
    service: 'Business Website',
    accentFrom: 'from-emerald-500',
    accentTo: 'to-green-500',
    dotColor: 'bg-emerald-500',
    quote:
      'InfoAxon redesigned and rebuilt our e-commerce website from scratch. Online sales doubled within two months of launch. The site is fast, beautiful, and our customers constantly compliment the experience.',
    rating: 5,
  },
  {
    name: 'Niroshan Silva',
    role: 'Founder',
    company: 'QuickBite F&B Group',
    service: 'Mobile App',
    accentFrom: 'from-orange-500',
    accentTo: 'to-red-500',
    dotColor: 'bg-orange-500',
    quote:
      'We needed a mobile ordering app fast — InfoAxon delivered ahead of schedule. 10,000 downloads in the first month speaks for itself. The app is smooth, our customers love the loyalty points feature, and support has been excellent.',
    rating: 5,
  },
  {
    name: 'Tharushi Bandara',
    role: 'Supply Chain Head',
    company: 'ProManufacture Ltd.',
    service: 'Custom Software',
    accentFrom: 'from-indigo-500',
    accentTo: 'to-violet-500',
    dotColor: 'bg-indigo-500',
    quote:
      'The inventory management system InfoAxon engineered for our three warehouses is incredibly robust. Automated reordering alone saved us a significant amount monthly. Their team really took the time to understand our complex workflows.',
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  // 6 testimonials, 3 per page → 2 pages
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);

  const go = useCallback(
    (next) => {
      setDirection(next > page ? 1 : -1);
      setPage(next);
    },
    [page]
  );

  const prev = () => go((page - 1 + totalPages) % totalPages);
  const next = () => go((page + 1) % totalPages);

  // Auto-advance every 5 s
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setDirection(1);
      setPage((p) => (p + 1) % totalPages);
    }, 5000);
    return () => clearInterval(id);
  }, [inView, totalPages]);

  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  // Container staggers the children in/out one by one
  const containerVariants = {
    enter: { transition: { staggerChildren: 0.15, delayChildren: 0 } },
    center: { transition: { staggerChildren: 0.15, delayChildren: 0 } },
    exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  };

  // Each card slides from the direction of travel
  const cardVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-dark-50 dark:bg-dark-900"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 dark:bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-cyan/5 dark:bg-accent-cyan/8 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-subtitle">Client Stories</span>
          <h2 className="section-title mt-3 mb-5">
            Trusted by{' '}
            <span className="gradient-text">Businesses</span>{' '}
            That Mean Business
          </h2>
          <p className="section-description mx-auto">
            Real results from real clients. Here's what the teams we've partnered
            with have to say about working with InfoAxon.
          </p>
        </motion.div>

        {/* Carousel — 3 cards per slide */}
        <div className="relative px-8 sm:px-10">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visible.map((t, i) => (
                  <motion.div
                    key={i}
                    custom={direction}
                    variants={cardVariants}
                    className="glass-card p-7 flex flex-col gap-5 group hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Top bar accent */}
                    <div className={`h-0.5 rounded-full bg-gradient-to-r ${t.accentFrom} ${t.accentTo} w-10 group-hover:w-full transition-all duration-500`} />

                    {/* Stars + badge */}
                    <div className="flex items-center justify-between">
                      <StarRating count={t.rating} />
                      <span className="text-xs font-medium text-dark-400 dark:text-dark-500 bg-dark-100 dark:bg-dark-800 px-2.5 py-1 rounded-full">
                        {t.service}
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote className="relative text-dark-600 dark:text-dark-300 text-sm leading-relaxed flex-1">
                      <span className="absolute -top-2 -left-1 text-5xl leading-none font-serif text-dark-200 dark:text-dark-700 select-none">"</span>
                      <span className="relative">{t.quote}</span>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-2 border-t border-dark-100 dark:border-dark-800">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.accentFrom} ${t.accentTo} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark-900 dark:text-white leading-tight">{t.name}</p>
                        <p className="text-xs text-dark-400 dark:text-dark-500">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-dark-500 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-dark-500 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === page
                  ? 'w-6 h-2 bg-primary-500'
                  : 'w-2 h-2 bg-dark-300 dark:bg-dark-600 hover:bg-primary-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
