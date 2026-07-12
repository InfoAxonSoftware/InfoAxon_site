import { motion } from 'framer-motion';
import { Link, useLocation, useParams, Navigate } from 'react-router-dom';
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
import { useHardwareCart } from '../context/HardwareCartContext';
import SEO,{SITE_URL,breadcrumbSchema} from '../components/SEO';

const iconMap = {
  erp: HiOutlineCube,
  crm: HiOutlineUserGroup,
  ecommerce: HiOutlineShoppingCart,
  mobile: HiOutlineDeviceMobile,
  bespoke: HiOutlineCog,
};

const imageMap = {
  erp: '/images/solutions/erp-pos/erp-pos.jpg',
  crm: '/images/solutions/crm.jpg',
  ecommerce: '/images/solutions/ecommerce.jpg',
  mobile: '/images/solutions/mobile-apps.jpg',
  bespoke: '/images/solutions/bespoke.jpg',
};

// Extra detail content per solution icon
const extraContent = {
  erp: {
    highlights: [
      {
        title: 'Smart POS Billing',
        image: '/images/solutions/erp-pos/smart-pos-billing.png',
        desc: 'Fast and accurate billing with barcode scanning, receipt printing, discounts, returns, and smooth checkout.',
      },
      {
        title: 'Inventory & Stock Control',
        image: '/images/solutions/erp-pos/inventory-stock-control.png',
        desc: 'Track stock quantities in real time, manage stock-in and stock-out, and monitor low-stock items easily.',
      },
      {
        title: 'Purchase & Supplier Management',
        image: '/images/solutions/erp-pos/purchase-supplier-management.png',
        desc: 'Manage suppliers, purchase orders, goods receiving, and product costing in one connected system.',
      },
      {
        title: 'Multi-branch Reports & Growth',
        image: '/images/solutions/erp-pos/multi-branch-reporting.png',
        desc: 'Monitor branches, sales, stock, and performance with clear reports and business insights.',
      },
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

export default function SolutionDetail({ solutionId }) {
  const location=useLocation();
  const { id } = useParams();
  const { solutions,loading } = useData();
  const solution = solutions.find((s) => s.id === (solutionId||id));

  if (loading) return <div className="min-h-screen pt-32 text-center text-dark-400">Loading solution…</div>;
  if (!solution) return <Navigate to="/solutions" replace />;

  const Icon = iconMap[solution.icon] || HiOutlineCog;
  const imageSrc = solution.imageUrl || imageMap[solution.icon];
  const extra = {highlights:(solution.keyFeatures||[]).map(f=>({title:f.title,desc:f.description,image:f.imageUrl,number:f.number})),useCases:[]};
  const pricingSol = solution.pricing;
  const requestedReturnPath = new URLSearchParams(location.search).get('returnTo');
  const returnTo = requestedReturnPath?.startsWith('/pos-hardware')
    ? requestedReturnPath
    : null;

  return (
    <>
      <SEO title={solution.seoTitle||`${solution.title} | InfoAxon Sri Lanka`} description={solution.seoDescription||solution.description.slice(0,160)} path={solution.canonicalPath||`/solutions/${solution.id}`} image={solution.ogImage||imageSrc} robots={solution.indexable===false?'noindex, nofollow':'index, follow'} jsonLd={[{'@context':'https://schema.org','@type':'Service',name:solution.title,description:solution.description,provider:{'@type':'Organization',name:'InfoAxon',url:SITE_URL},areaServed:'Sri Lanka'},breadcrumbSchema([{name:'Home',path:'/'},{name:'Solutions',path:'/solutions'},{name:solution.title,path:`/solutions/${solution.id}`}])]}/>
      <SEO title={solution.seoTitle||`${solution.title} | InfoAxon Sri Lanka`} description={solution.seoDescription||solution.description.slice(0,160)} path={solution.canonicalPath||`/solutions/${solution.id}`} image={solution.ogImage||imageSrc} robots={solution.indexable===false?'noindex, nofollow':'index, follow'} jsonLd={[{'@context':'https://schema.org','@type':'Service',name:solution.title,description:solution.description,provider:{'@type':'Organization',name:'InfoAxon',url:SITE_URL},areaServed:'Sri Lanka'},breadcrumbSchema([{name:'Home',path:'/'},{name:'Solutions',path:'/solutions'},{name:solution.title,path:`/solutions/${solution.id}`}])]}/>
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
      {pricingSol && <PricingSection pricingSol={pricingSol} returnTo={returnTo} />}

      {solution.icon === 'erp' && <HardwarePreviewSection />}

    </>
  );
}

function FeatureSection({ solution, extra }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isErp = solution.icon === 'erp';

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {extra.highlights.map((highlight, index) => (
            isErp ? (
              <motion.article
                key={highlight.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-dark-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/70 hover:shadow-xl hover:shadow-primary-500/10 dark:border-dark-700/50 dark:bg-dark-900 dark:hover:border-primary-500/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-dark-200/60 bg-dark-100 dark:border-dark-700/50 dark:bg-dark-800">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="relative flex flex-1 flex-col px-5 pb-6">
                  <div className={'relative -mt-5 mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-black text-white shadow-lg ' + solution.color}>
                    {highlight.number || String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-bold leading-snug text-dark-900 dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">
                    {highlight.desc}
                  </p>
                </div>
              </motion.article>
            ) : (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="h-full bg-white dark:bg-dark-900 rounded-2xl border border-dark-200/60 dark:border-dark-700/50 p-6"
              >
                <div className="text-2xl font-black text-dark-200 dark:text-dark-700 mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="font-semibold text-dark-900 dark:text-white text-sm mb-2">
                  {highlight.title}
                </div>
                <div className="text-dark-400 dark:text-dark-500 text-xs leading-relaxed">
                  {highlight.desc}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {!isErp && solution.features && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
            {solution.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.07 }}
                className="flex items-center gap-3 bg-white dark:bg-dark-900 rounded-xl border border-dark-200/60 dark:border-dark-700/50 px-4 py-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <HiCheck className="text-primary-400" size={11} />
                </div>
                <span className="text-dark-700 dark:text-dark-200 text-sm font-medium">
                  {feature}
                </span>
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

function HardwarePreviewSection() {
  return (
    <section className="section-padding bg-dark-50/60 dark:bg-dark-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary-200/70 bg-white p-6 shadow-xl shadow-primary-500/5 dark:border-primary-500/20 dark:bg-dark-900 sm:p-10">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-subtitle">POS Hardware</span>
              <h2 className="mt-3 text-2xl font-bold text-dark-900 dark:text-white sm:text-3xl">
                Need a complete setup?
              </h2>
              <p className="mt-3 leading-relaxed text-dark-500 dark:text-dark-300">
                Choose compatible POS hardware together with your software package.
              </p>
            </div>
            <Link to="/pos-hardware/builder" className="btn-primary w-full justify-center sm:w-auto">
              Build Your POS Setup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function PricingSection({ pricingSol, returnTo }) {
  const { purchaseType, setSelectedPlanId } = useHardwareCart();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="pricing" ref={ref} className="section-padding bg-white dark:bg-dark-950 border-y border-dark-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {returnTo && (
          <Link to={returnTo} className="mb-6 inline-flex text-sm font-semibold text-primary-600 dark:text-primary-400">
            ← Return to POS Setup Builder
          </Link>
        )}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {pricingSol.plans.map((plan, i) => {
            const isPopular = !!plan.badge;
            const contactUrl = plan.id
              ? `/contact?service=${pricingSol.id}&plan=${plan.id}`
              : '/contact';

            return (
              <motion.article
                id={plan.id ? 'plan-' + plan.id : undefined}
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative min-w-0 flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isPopular
                    ? `${pricingSol.colorBorder} shadow-xl lg:-mt-3 lg:mb-3`
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

                <div className={`p-5 sm:p-7 flex flex-col gap-5 flex-1 ${isPopular ? 'pt-10' : ''}`}>
                  <div>
                    <h3 className="font-bold text-dark-900 dark:text-white text-xl">
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed mt-2">
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-dark-100 dark:border-dark-800 pt-5">
                    <div className="text-[11px] text-dark-400 dark:text-dark-500 uppercase tracking-wide mb-1.5">
                      Starting from
                    </div>
                    <div className={`text-3xl font-extrabold bg-gradient-to-r ${pricingSol.color} bg-clip-text text-transparent leading-none`}>
                      {plan.price ? `LKR ${plan.price}` : "Let's Talk"}
                    </div>
                    {plan.delivery && (
                      <div className="text-xs text-dark-400 dark:text-dark-500 mt-2">
                        Est. {plan.delivery}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2.5">
                    {(plan.keyFeatures || plan.features).map((feature) => (
                      <li key={feature} className="flex min-w-0 items-start gap-3">
                        <span className={'w-1.5 h-1.5 rounded-full bg-gradient-to-br flex-shrink-0 mt-[7px] ' + pricingSol.color} />
                        <span className="min-w-0 break-words text-dark-600 dark:text-dark-300 text-sm leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.supportPeriod && (
                    <div className="rounded-xl border border-primary-200/70 bg-primary-50/70 px-4 py-3 dark:border-primary-500/20 dark:bg-primary-500/5">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                        Support period
                      </div>
                      <div className="mt-1 text-sm font-semibold text-dark-800 dark:text-dark-100">
                        {plan.supportPeriod}
                      </div>
                    </div>
                  )}

                  {plan.keyFeatures && (
                    <details className="group rounded-xl border border-dark-200/70 bg-dark-50/50 dark:border-dark-700/50 dark:bg-dark-800/30">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        <span>View full features</span>
                        <span className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
                      </summary>

                      <div className="space-y-5 border-t border-dark-200/60 px-4 py-4 dark:border-dark-700/50">
                        {plan.includesLabel && (
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                            {plan.includesLabel}
                          </p>
                        )}

                        <ul className="space-y-2.5">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex min-w-0 items-start gap-3">
                              <span className={'w-1.5 h-1.5 rounded-full bg-gradient-to-br flex-shrink-0 mt-[7px] ' + pricingSol.color} />
                              <span className="min-w-0 break-words text-dark-600 dark:text-dark-300 text-xs leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {plan.exclusions?.length > 0 && (
                          <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-3">
                              Not included
                            </h4>
                            <ul className="space-y-2">
                              {plan.exclusions.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-dark-600 dark:text-dark-400">
                                  <span className="text-amber-600 dark:text-amber-400 flex-shrink-0">—</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {plan.optionalAddOns?.length > 0 && (
                          <div className="rounded-xl border border-cyan-200/70 bg-cyan-50/70 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/5">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-400 mb-3">
                              Optional add-ons
                            </h4>
                            <ul className="space-y-2">
                              {plan.optionalAddOns.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-dark-600 dark:text-dark-400">
                                  <span className="text-cyan-600 dark:text-cyan-400 flex-shrink-0">+</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {plan.note && (
                          <p className="rounded-xl border border-primary-200/70 bg-primary-50/70 p-4 text-xs font-medium leading-relaxed text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/5 dark:text-primary-300">
                            {plan.note}
                          </p>
                        )}
                      </div>
                    </details>
                  )}
                  {pricingSol.id === 'custom-erp-pos' ? (
                    <Link
                      to={'/build-your-pos?type=' + (['software', 'hardware', 'complete'].includes(purchaseType) ? purchaseType : 'software')}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={plan.ctaStyle + ' mt-auto w-full justify-center'}
                    >Choose Plan</Link>
                  ) : (
                    <Link to={contactUrl} className={plan.ctaStyle + ' w-full justify-center mt-auto'}>
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {pricingSol.comparison?.length > 0 && (
          <PricingComparisonTable
            comparison={pricingSol.comparison}
            color={pricingSol.color}
            inView={inView}
          />
        )}
      </div>
    </section>
  );
}

function PricingComparisonTable({ comparison, color, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.35 }}
      className="mt-14"
    >
      <div className="text-center mb-7">
        <span className="section-subtitle">Compare packages</span>
        <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mt-2">
          POS Package Comparison
        </h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-dark-200/70 dark:border-dark-700/50">
        <table className="w-full min-w-[760px] border-collapse bg-white text-left dark:bg-dark-900">
          <thead>
            <tr className="border-b border-dark-200/70 dark:border-dark-700/50">
              <th className="w-[22%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-dark-500 dark:text-dark-400">
                Feature
              </th>
              {['Starter POS', 'Professional POS', 'Enterprise POS'].map((name) => (
                <th key={name} className="px-4 py-4 text-sm font-bold text-dark-900 dark:text-white">
                  <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, index) => (
              <tr
                key={row.feature}
                className={`border-b border-dark-100 last:border-b-0 dark:border-dark-800 ${
                  index % 2 === 0 ? 'bg-dark-50/50 dark:bg-dark-800/25' : ''
                }`}
              >
                <th className="px-4 py-3 text-xs font-semibold text-dark-700 dark:text-dark-200">
                  {row.feature}
                </th>
                <td className="px-4 py-3 text-xs leading-relaxed text-dark-600 dark:text-dark-400">
                  {row.starter}
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-dark-600 dark:text-dark-400">
                  {row.professional}
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-dark-600 dark:text-dark-400">
                  {row.enterprise}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-dark-400 dark:text-dark-500 md:hidden">
        Swipe horizontally to compare all packages.
      </p>
    </motion.div>
  );
}
