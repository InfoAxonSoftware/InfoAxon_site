import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineShoppingCart,
  HiOutlineDeviceMobile,
  HiOutlineCog,
  HiCheck,
  HiArrowRight,
} from 'react-icons/hi';
import { useData } from '../context/DataContext';
import { pricingSolutions } from '../data/pricingData';

const pricingIdMap = {
  erp: 'erp',
  crm: 'crm',
  ecommerce: 'ecommerce',
  mobile: 'mobile',
  bespoke: 'custom',
};

const iconMap = {
  erp: HiOutlineCube,
  crm: HiOutlineUserGroup,
  ecommerce: HiOutlineShoppingCart,
  mobile: HiOutlineDeviceMobile,
  bespoke: HiOutlineCog,
};

const imageMap = {
  erp: '/images/solutions/erp-pos.jpg',
  crm: '/images/solutions/crm.jpg',
  ecommerce: '/images/solutions/ecommerce.jpg',
  mobile: '/images/solutions/mobile-apps.jpg',
  bespoke: '/images/solutions/bespoke.jpg',
};

// Extra detail content per solution icon
const extraContent = {
  erp: {
    highlights: [
      { title: 'Inventory Control', desc: 'Track stock levels in real time across all branches with automated alerts.' },
      { title: 'Smart Invoicing', desc: 'Generate accurate invoices instantly with multi-tax and multi-currency support.' },
      { title: 'Multi-branch Ready', desc: 'Centralise operations across unlimited locations under one dashboard.' },
      { title: 'Custom Workflows', desc: 'Automate approvals, purchase orders, and reporting to match your process.' },
    ],
    useCases: ['Retail & Supermarkets', 'Automobile Service Centers', 'Warehousing & Logistics', 'Manufacturing'],
  },
  crm: {
    highlights: [
      { title: 'Pipeline Management', desc: 'Visualise your full sales funnel from lead to close in one place.' },
      { title: 'Order Tracking', desc: 'End-to-end order lifecycle management with customer-facing portals.' },
      { title: 'Automated Follow-ups', desc: 'Schedule reminders and alerts so no deal slips through the cracks.' },
      { title: 'Analytics & Reports', desc: 'Deep insights into team performance, conversion rates, and revenue.' },
    ],
    useCases: ['Distribution Companies', 'Sales Teams', 'B2B Enterprises', 'Service Providers'],
  },
  ecommerce: {
    highlights: [
      { title: 'Mobile-First Design', desc: 'Every site is built responsive from day one — perfect on any screen size or device.' },
      { title: 'E-Commerce Ready', desc: 'Launch a full online store with product listings, cart, and secure payment gateways.' },
      { title: 'SEO & Performance', desc: 'Fast load times, clean code, and built-in SEO best practices to rank and convert.' },
      { title: 'CMS Integration', desc: 'Manage your own content easily with a user-friendly CMS — no developer needed.' },
    ],
    useCases: ['Corporate & Business Sites', 'E-Commerce Stores', 'Portfolio & Agency Sites', 'Landing Pages & Campaigns'],
  },
  mobile: {
    highlights: [
      { title: 'Cross-platform', desc: 'One codebase, native experience on both Android and iOS devices.' },
      { title: 'Offline Mode', desc: 'Keep working even without internet — data syncs automatically on reconnect.' },
      { title: 'Push Notifications', desc: 'Engage users with targeted, timely notifications and in-app messages.' },
      { title: 'Custom UI/UX', desc: 'Pixel-perfect interfaces designed for delight and usability.' },
    ],
    useCases: ['Field Service Apps', 'Customer Loyalty Apps', 'Delivery & Tracking', 'Internal Business Tools'],
  },
  bespoke: {
    highlights: [
      { title: 'Tailored Architecture', desc: 'Designed from scratch around your exact processes — no compromise.' },
      { title: 'API-First Design', desc: 'Clean REST or GraphQL APIs that integrate with any existing system.' },
      { title: 'Scalable & Secure', desc: 'Built with cloud-native practices and security from the ground up.' },
      { title: 'Full Documentation', desc: 'Comprehensive docs and handover so your team can maintain the system.' },
    ],
    useCases: ['Unique Industry Problems', 'Internal Operations Tools', 'Platform Businesses', 'Automation Systems'],
  },
};

export default function SolutionDetail() {
  const { id } = useParams();
  const { solutions } = useData();
  const solution = solutions.find((s) => s.id === id);

  if (!solution) return <Navigate to="/solutions" replace />;

  const Icon = iconMap[solution.icon] || HiOutlineCog;
  const imageSrc = imageMap[solution.icon];
  const extra = extraContent[solution.icon] || { highlights: [], useCases: [] };
  const pricingId = pricingIdMap[solution.icon];
  const pricingSol = pricingId ? pricingSolutions.find((s) => s.id === pricingId) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[520px] flex items-end overflow-hidden bg-dark-50 dark:bg-dark-950">
        {/* Background image or gradient */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={solution.shortTitle || solution.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20 dark:opacity-30`} />
        )}
        {/* Gradient overlays for readability */}
        {/* Light mode: strong white fade so dark text is always legible */}
        <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
        {/* Dark mode: dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 dark:from-black/80 dark:via-black/40 dark:to-black/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-white/60 mb-6">
              <Link to="/" className="hover:text-primary-500 dark:hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/solutions" className="hover:text-primary-500 dark:hover:text-white transition-colors">Solutions</Link>
              <span>/</span>
              <span className="text-dark-800 dark:text-white/90">{solution.shortTitle || solution.title}</span>
            </div>

            <div className="max-w-2xl">
              
              <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-900 dark:text-white leading-tight mb-5">
                {solution.title}
              </h1>
              <p className="text-dark-500 dark:text-white/75 leading-relaxed text-base mb-8">
                {solution.description}
              </p>
              <Link to="/contact" className="btn-primary inline-flex group">
                Start a Project
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <FeatureSection solution={solution} extra={extra} />

      {/* Pricing */}
      {pricingSol && <PricingSection pricingSol={pricingSol} />}

    </>
  );
}

function FeatureSection({ solution, extra }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-dark-50/60 dark:bg-dark-900/60 border-y border-dark-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-subtitle">What's included</span>
          <h2 className="section-title mt-3">Key Features</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {extra.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-200/60 dark:border-dark-700/50 p-6"
            >
              <div className={`text-2xl font-black text-dark-200 dark:text-dark-700 mb-3`}>{String(i + 1).padStart(2, '0')}</div>
              <div className="font-semibold text-dark-900 dark:text-white text-sm mb-2">{h.title}</div>
              <div className="text-dark-400 dark:text-dark-500 text-xs leading-relaxed">{h.desc}</div>
            </motion.div>
          ))}
        </div>

        {solution.features && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {solution.features.map((feature, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + j * 0.07 }}
                className="flex items-center gap-3 bg-white dark:bg-dark-900 rounded-xl border border-dark-200/60 dark:border-dark-700/50 px-4 py-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <HiCheck className="text-primary-400" size={11} />
                </div>
                <span className="text-dark-700 dark:text-dark-200 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function UseCasesSection({ useCases, solution }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="section-subtitle">Who it's for</span>
          <h2 className="section-title mt-3">Common Use Cases</h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {useCases.map((uc, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              className="px-5 py-2.5 rounded-full border border-dark-200/70 dark:border-dark-700/50 bg-dark-50 dark:bg-dark-900 text-dark-700 dark:text-dark-200 text-sm font-medium"
            >
              {uc}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherSolutions({ solutions }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = HiOutlineCog;

  return (
    <section ref={ref} className="section-padding bg-dark-50/60 dark:bg-dark-900/60 border-y border-dark-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="section-subtitle">Explore more</span>
          <h2 className="section-title mt-3">Other Solutions</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/solutions/${sol.id}`}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-dark-200/60 dark:border-dark-700/50 bg-white dark:bg-dark-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="font-semibold text-dark-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {sol.shortTitle || sol.title}
                </div>
                <div className="text-dark-400 dark:text-dark-500 text-xs line-clamp-2 leading-relaxed">
                  {sol.description}
                </div>
                <span className="text-xs font-semibold text-primary-500 dark:text-primary-400 mt-auto">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ pricingSol }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  // Find Professional plan price to show for Enterprise
  const professionalPlan = pricingSol.plans.find((p) => p.name === 'Professional');

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-dark-950 border-y border-dark-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-subtitle">Pricing</span>
          <h2 className="section-title mt-3">Choose a Package</h2>
          <p className="text-dark-400 dark:text-dark-500 text-sm mt-3">
            All prices in LKR — starting rates. Final quote after a free scoping call.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricingSol.plans.map((plan, i) => {
            const isPopular = !!plan.badge;
            const displayPrice = plan.price
              ? `LKR ${plan.price}`
              : professionalPlan
              ? `LKR ${professionalPlan.price}+`
              : 'Custom';
            const priceNote = plan.price ? 'Starting from' : 'From Professional price';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300
                  ${isPopular
                    ? `${pricingSol.colorBorder} shadow-xl md:-mt-3 md:mb-3`
                    : 'border-dark-200/70 dark:border-dark-700/50 hover:shadow-md'
                  } bg-white dark:bg-dark-900`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                    <span className={`bg-gradient-to-r ${pricingSol.color} text-white text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-b-xl`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className={`h-0.5 w-full bg-gradient-to-r ${pricingSol.color}`} />

                <div className={`p-7 flex flex-col gap-5 flex-1 ${isPopular ? 'pt-10' : ''}`}>
                  <div className="font-bold text-dark-900 dark:text-white text-xl">{plan.name}</div>

                  <div className="border-t border-dark-100 dark:border-dark-800 pt-5">
                    <div className="text-[11px] text-dark-400 dark:text-dark-500 uppercase tracking-wide mb-1.5">{priceNote}</div>
                    <div className={`text-3xl font-extrabold bg-gradient-to-r ${pricingSol.color} bg-clip-text text-transparent leading-none`}>
                      {displayPrice}
                    </div>
                    <div className="text-xs text-dark-400 dark:text-dark-500 mt-2">Est. {plan.delivery}</div>
                    {!plan.price && (
                      <div className="text-xs text-dark-400 dark:text-dark-500 mt-1">Custom timeline &amp; scope</div>
                    )}
                  </div>

                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${pricingSol.color} flex-shrink-0 mt-[7px]`} />
                        <span className="text-dark-600 dark:text-dark-300 text-sm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className={`${plan.ctaStyle} w-full justify-center mt-2`}>
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
