import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { pricingSolutions } from '../data/pricingData';

export default function PricingDetail() {
  const { id } = useParams();
  const sol = pricingSolutions.find((s) => s.id === id);

  if (!sol) return <Navigate to="/pricing" replace />;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 to-white dark:from-dark-950 dark:to-dark-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/10 dark:bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-sm text-dark-400 mb-5">
              <span>Home</span><span>/</span>
              <Link to="/pricing" className="hover:text-primary-500 transition-colors">Pricing</Link>
              <span>/</span>
              <span className="text-primary-500 dark:text-primary-400">{sol.title}</span>
            </div>
            <Link to="/pricing" className="inline-flex text-sm text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-6">
              &larr; Back to all solutions
            </Link>
            <span className="section-subtitle block">{sol.title}</span>
            <h1 className="section-title mt-2 mb-3">
              Choose a <span className="gradient-text">Package</span>
            </h1>
            <p className="text-dark-500 dark:text-dark-300 text-sm max-w-xl">{sol.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {sol.plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300
                  ${plan.badge
                    ? `${sol.colorBorder} shadow-xl md:-mt-3 md:mb-3`
                    : 'border-dark-200/70 dark:border-dark-700/50 hover:shadow-md'
                  } bg-white dark:bg-dark-900`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                    <span className={`bg-gradient-to-r ${sol.color} text-white text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-b-xl`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`h-0.5 w-full bg-gradient-to-r ${sol.color}`} />

                <div className={`p-7 flex flex-col gap-5 flex-1 ${plan.badge ? 'pt-10' : ''}`}>

                  {/* Plan name */}
                  <div className="font-bold text-dark-900 dark:text-white text-xl">{plan.name}</div>

                  {/* Price block */}
                  <div className="border-t border-dark-100 dark:border-dark-800 pt-5">
                    <div className="text-[11px] text-dark-400 dark:text-dark-500 uppercase tracking-wide mb-1.5">Starting from</div>
                    {plan.price ? (
                      <div className={`text-3xl font-extrabold bg-gradient-to-r ${sol.color} bg-clip-text text-transparent leading-none`}>
                        LKR {plan.price}
                      </div>
                    ) : (
                      <div className={`text-2xl font-extrabold bg-gradient-to-r ${sol.color} bg-clip-text text-transparent leading-none`}>
                        {"Let's Talk"}
                      </div>
                    )}
                    <div className="text-xs text-dark-400 dark:text-dark-500 mt-2">Est. {plan.delivery}</div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${sol.color} flex-shrink-0 mt-[7px]`} />
                        <span className="text-dark-600 dark:text-dark-300 text-sm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/contact" className={`${plan.ctaStyle} w-full justify-center mt-2`}>
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-center text-dark-400 dark:text-dark-500 text-xs mt-8"
          >
            Prices are starting estimates in LKR. Final quote after a free scoping call.{' '}
            <Link to="/contact" className="text-primary-500 dark:text-primary-400 hover:underline">Get your free quote &rarr;</Link>
          </motion.p>
        </div>
      </section>

      {/* Other solutions */}
      <section className="py-14 bg-dark-50/60 dark:bg-dark-900/60 border-t border-dark-100 dark:border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-widest mb-8"
          >
            Explore other solutions
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {pricingSolutions
              .filter((s) => s.id !== sol.id)
              .map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/pricing/${s.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-dark-200/70 dark:border-dark-700/50 bg-white dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-sm hover:border-dark-300 dark:hover:border-dark-600 hover:shadow-sm transition-all duration-200"
                  >
                    {s.title}
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
