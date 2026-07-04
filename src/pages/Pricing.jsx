import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pricingSolutions } from '../data/pricingData';

const faqs = [
  { q: 'Are these fixed prices?', a: "These are starting rates. Final cost depends on scope, features, and integrations. We'll give you a clear quote after a free discovery call." },
  { q: 'Can I start with Starter and upgrade later?', a: "Absolutely. We build modular systems designed to grow. You can add features, users, or modules as your business expands." },
  { q: 'How do payments work?', a: "We split into milestones: deposit, mid-project, and final payment on delivery. Flexible to suit you." },
  { q: 'Do you offer maintenance after launch?', a: "All packages include a support period. We also offer ongoing monthly maintenance retainers." },
  { q: "What if my project doesn't fit a package?", a: "These packages are guides, not rigid boxes. Contact us and we'll scope a plan built exactly for your needs." },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 to-white dark:from-dark-950 dark:to-dark-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/10 dark:bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-sm text-dark-400 mb-6">
              <span>Home</span><span>/</span>
              <span className="text-primary-500 dark:text-primary-400">Pricing</span>
            </div>
            <span className="section-subtitle">Pricing</span>
            <h1 className="section-title mt-4 mb-4 max-w-2xl">
              Pricing by <span className="gradient-text">Solution</span>
            </h1>
            <p className="text-dark-500 dark:text-dark-300 text-base max-w-xl">
              Select a solution to see its packages and starting prices. All prices in{' '}
              <strong className="text-dark-800 dark:text-white">LKR</strong> — final quote after a free scoping call.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-5">
            {pricingSolutions.map((sol, i) => (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <Link
                  to={`/pricing/${sol.id}`}
                  className="group flex flex-col h-full rounded-2xl border border-dark-200/70 dark:border-dark-700/50 bg-white dark:bg-dark-900 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-dark-300 dark:hover:border-dark-600"
                >
                  <div className={`h-0.5 w-full bg-gradient-to-r ${sol.color}`} />
                  <div className="p-6 flex flex-col gap-4 flex-1">

                    <div>
                      <div className="font-bold text-dark-900 dark:text-white text-base mb-1">{sol.title}</div>
                      <div className="text-dark-400 dark:text-dark-500 text-xs">{sol.tagline}</div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {['Starter', 'Professional', 'Enterprise'].map((tier) => (
                        <span
                          key={tier}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-dark-100/70 dark:bg-dark-800 text-dark-500 dark:text-dark-400 border border-dark-200/60 dark:border-dark-700/60"
                        >
                          {tier}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-dark-100 dark:border-dark-800 pt-4 mt-auto flex items-end justify-between">
                      <div>
                        <div className="text-[11px] text-dark-400 dark:text-dark-500 mb-0.5">Starting from</div>
                        <div className={`text-xl font-extrabold bg-gradient-to-r ${sol.color} bg-clip-text text-transparent`}>
                          LKR {sol.startingFrom}
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${sol.colorText} group-hover:underline transition-all`}>
                        View Packages &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center text-dark-400 dark:text-dark-500 text-xs mt-10"
          >
            All prices are starting estimates in LKR. Final cost determined after a free scoping session.{' '}
            <Link to="/contact" className="text-primary-500 dark:text-primary-400 hover:underline">Book a free call &rarr;</Link>
          </motion.p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-dark-50/60 dark:bg-dark-900/60 border-y border-dark-100 dark:border-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-lg font-bold text-dark-900 dark:text-white mb-12"
          >
            How it works
          </motion.p>
          <div className="grid sm:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Free Discovery Call', desc: 'Tell us about your project' },
              { step: '02', title: 'Detailed Proposal', desc: 'Cost, timeline & deliverables' },
              { step: '03', title: 'Milestone Payments', desc: 'Pay as we build, stage by stage' },
              { step: '04', title: 'Post-Launch Support', desc: 'We stay with you after go-live' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <div className="text-3xl font-black text-dark-200 dark:text-dark-700 mb-1">{s.step}</div>
                <div className="font-semibold text-dark-900 dark:text-white text-sm">{s.title}</div>
                <div className="text-dark-400 dark:text-dark-500 text-xs leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title mt-3">Quick Answers</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-dark-200/60 dark:border-dark-700/50 bg-dark-50/50 dark:bg-dark-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span className="font-semibold text-dark-900 dark:text-white text-sm">{faq.q}</span>
                  <span className={`text-primary-500 text-xl font-light flex-shrink-0 transition-transform duration-200 leading-none ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-dark-500 dark:text-dark-400 text-sm leading-relaxed border-t border-dark-100 dark:border-dark-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-dark-50/60 dark:bg-dark-900/60 border-t border-dark-100 dark:border-dark-800">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">Not sure where to start?</h2>
            <p className="text-dark-500 dark:text-dark-400 text-sm mb-7">
              Book a free 30-min call and we will recommend the right solution and package for your business.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Book a Free Call
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
