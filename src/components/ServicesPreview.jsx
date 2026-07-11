import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const colStyles = [
  { gradient: 'from-blue-500 to-cyan-400',      dot: 'bg-blue-500',    bar: 'from-blue-500 to-cyan-400',    label: 'text-blue-600 dark:text-blue-400',    badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300' },
  { gradient: 'from-violet-500 to-purple-400',  dot: 'bg-violet-500',  bar: 'from-violet-500 to-purple-400', label: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300' },
  { gradient: 'from-emerald-500 to-green-400',  dot: 'bg-emerald-500', bar: 'from-emerald-500 to-green-400', label: 'text-emerald-600 dark:text-emerald-400',badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  { gradient: 'from-orange-500 to-amber-400',   dot: 'bg-orange-500',  bar: 'from-orange-500 to-amber-400',  label: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300' },
  { gradient: 'from-pink-500 to-rose-400',      dot: 'bg-pink-500',    bar: 'from-pink-500 to-rose-400',     label: 'text-pink-600 dark:text-pink-400',     badge: 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300' },
];

export default function ServicesPreview() {
  const { solutions } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-dark-50/60 dark:bg-dark-900/60">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-200/60 dark:via-dark-700/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-200/60 dark:via-dark-700/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-subtitle">What We Do</span>
          <h2 className="section-title mt-3 mb-4">
            Solutions Built for <span className="gradient-text">Real Impact</span>
          </h2>
          <p className="section-description mx-auto">
            End-to-end digital solutions that simplify operations, elevate customer experiences,
            and accelerate your business transformation.
          </p>
        </motion.div>

        {/* Desktop comparison columns */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:grid lg:grid-cols-5 border-y border-dark-200/70 dark:border-dark-700/50 bg-white dark:bg-dark-950"
        >
          {solutions.map((solution, i) => {
            const s = colStyles[i] || colStyles[0];

            return (
              <motion.article
                key={solution.id}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.45 }}
                className={'relative min-w-0 flex h-full flex-col px-5 py-6 xl:px-6 ' + (
                  i < solutions.length - 1
                    ? 'border-r border-dark-200/70 dark:border-dark-700/50'
                    : ''
                )}
              >
                <div className={'absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ' + s.bar} />

                <h3 className={'min-h-[3rem] break-words text-base font-bold leading-snug ' + s.label}>
                  {solution.shortTitle || solution.title}
                </h3>

                <ul className="mt-5 flex-1 space-y-3.5">
                  {(solution.features || []).map((feature) => (
                    <li key={feature} className="flex min-w-0 items-start gap-2.5">
                      <span className={'mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full ' + s.dot} />
                      <span className="min-w-0 break-words text-sm leading-snug text-dark-600 dark:text-dark-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={'/solutions/' + solution.id}
                  className={'group mt-6 flex items-center justify-between gap-2 border-t border-dark-200/60 pt-4 text-sm font-semibold dark:border-dark-700/50 ' + s.label}
                >
                  <span className="underline decoration-current/40 underline-offset-4 transition-all group-hover:decoration-current">
                    View solution
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-150 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Mobile and tablet cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:hidden"
        >
          {solutions.map((solution, i) => {
            const s = colStyles[i] || colStyles[0];

            return (
              <motion.article
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-dark-200/70 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-950"
              >
                <div className={'absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ' + s.bar} />

                <h3 className={'break-words text-lg font-bold leading-snug ' + s.label}>
                  {solution.shortTitle || solution.title}
                </h3>

                <ul className="mt-4 flex-1 space-y-3">
                  {(solution.features || []).map((feature) => (
                    <li key={feature} className="flex min-w-0 items-start gap-3">
                      <span className={'mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full ' + s.dot} />
                      <span className="min-w-0 break-words text-sm leading-snug text-dark-600 dark:text-dark-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={'/solutions/' + solution.id}
                  className={'group mt-5 flex items-center justify-between gap-3 border-t border-dark-200/60 pt-4 text-sm font-semibold dark:border-dark-700/50 ' + s.label}
                >
                  <span className="underline decoration-current/40 underline-offset-4 transition-all group-hover:decoration-current">
                    View solution
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-150 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

