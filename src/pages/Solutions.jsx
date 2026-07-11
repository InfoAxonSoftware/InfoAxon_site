import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { pricingSolutions } from '../data/pricingData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineShoppingCart,
  HiOutlineDeviceMobile,
  HiOutlineCog,
  HiCheck,
} from 'react-icons/hi';
import { useData } from '../context/DataContext';

const iconMap = {
  erp: HiOutlineCube,
  crm: HiOutlineUserGroup,
  ecommerce: HiOutlineShoppingCart,
  mobile: HiOutlineDeviceMobile,
  bespoke: HiOutlineCog,
};

const pricingIdMap = {
  erp: 'erp',
  crm: 'crm',
  ecommerce: 'ecommerce',
  mobile: 'mobile',
  bespoke: 'custom',
};

export default function Solutions() {
  const { solutions } = useData();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

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
              <span className="text-primary-400">Solutions</span>
            </div>
            <span className="section-subtitle">Solutions</span>
            <h1 className="section-title mt-4 mb-6 max-w-4xl">
              Unify All Your Operations on{' '}
              <span className="gradient-text">One Platform</span>
            </h1>
            <p className="section-description max-w-3xl">
              We deliver end-to-end digital solutions that help businesses simplify operations,
              enhance customer experiences, and accelerate digital transformation. Our solutions
              are built to meet the evolving needs of modern enterprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="section-padding pt-8">
        <div className="max-w-7xl mx-auto">
          

          <div className="space-y-12">
            {solutions.map((solution, i) => (
              <SolutionCard key={solution.id} solution={solution} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const imageMap = {
  erp:       '/images/solutions/erp-pos/erp-pos.jpg',
  crm:       '/images/solutions/crm.jpg',
  ecommerce: '/images/solutions/ecommerce.jpg',
  mobile:    '/images/solutions/mobile-apps.jpg',
  bespoke:   '/images/solutions/bespoke.jpg',
};

function SolutionVisual({ solution, Icon }) {
  const src = imageMap[solution.icon];
  if (src) {
    return (
      <img
        src={src}
        alt={solution.shortTitle || solution.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }
  return (
    <div className="relative p-8 lg:p-16 text-center">
      <div className="w-24 h-24 rounded-3xl gradient-bg mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary-500/20">
        <Icon className="text-white" size={48} />
      </div>
      <h3 className="text-2xl font-bold text-dark-900 dark:text-white">{solution.shortTitle || solution.title}</h3>
    </div>
  );
}

function SolutionCard({ solution, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const Icon = iconMap[solution.icon] || HiOutlineCog;
  const isReversed = index % 2 === 1;
  const pricingId = pricingIdMap[solution.icon];
  const pricingSol = pricingId ? pricingSolutions.find((s) => s.id === pricingId) : null;

  return (
    <div id={solution.id} ref={ref} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card-hover overflow-hidden"
      >
        <div className={`grid lg:grid-cols-2 gap-0 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
          {/* Visual Side */}
          <div
            className={`relative flex items-center justify-center bg-gradient-to-br from-dark-100 to-dark-200 dark:from-dark-800 dark:to-dark-900 min-h-[320px] overflow-hidden ${
              isReversed ? 'lg:col-start-2' : ''
            }`}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5`} />

            {/* Image if available, else icon fallback */}
            <SolutionVisual solution={solution} Icon={Icon} />

            {/* Decorative dots */}
            <div className="absolute top-4 right-4 grid grid-cols-3 gap-1.5 opacity-20">
              {Array(9).fill(null).map((_, j) => (
                <div key={j} className="w-1.5 h-1.5 rounded-full bg-white" />
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold uppercase tracking-wider mb-3">
              {solution.shortTitle || solution.title}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-900 dark:text-white mb-6">
              {solution.title}
            </h3>
            <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-8">
              {solution.description}
            </p>

            {/* Features */}
            {solution.features && (
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {solution.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <HiCheck className="text-primary-400" size={14} />
                    </div>
                    <span className="text-dark-500 dark:text-dark-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <Link
              to={`/solutions/${solution.id}`}
              className="btn-primary inline-flex self-start group"
            >
              View Details
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
