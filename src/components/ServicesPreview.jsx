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

        {/* Table — pencil sketch style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderLeft: '1.5px solid rgba(100,100,120,0.35)', borderRight: '1.5px solid rgba(100,100,120,0.35)' }}
        >
          {/* Header row — no top border */}
          <div className="grid grid-cols-1 sm:grid-cols-5" style={{ borderBottom: '1.5px solid rgba(100,100,120,0.35)' }}>
            {solutions.map((solution, i) => {
              const s = colStyles[i] || colStyles[0];
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                  className="relative"
                  style={i < solutions.length - 1 ? { borderRight: '1.5px solid rgba(100,100,120,0.35)' } : {}}
                >
                  <div className="px-8 py-5 bg-white dark:bg-dark-950">
                    <div className={`text-base font-bold leading-snug ${s.label}`}>
                      {solution.shortTitle || solution.title}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feature rows */}
          {Array.from({ length: Math.max(...solutions.map(s => s.features.length)) }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid grid-cols-1 sm:grid-cols-5 ${rowIdx % 2 === 0 ? 'bg-dark-50/50 dark:bg-dark-900/50' : 'bg-white dark:bg-dark-950'}`}
              style={{ borderBottom: '1px dashed rgba(100,100,120,0.25)' }}
            >
              {solutions.map((solution, colIdx) => {
                const s = colStyles[colIdx] || colStyles[0];
                const feat = solution.features[rowIdx];
                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.15 + rowIdx * 0.04 + colIdx * 0.02 }}
                    className="px-8 py-3.5"
                    style={colIdx < solutions.length - 1 ? { borderRight: '1px dashed rgba(100,100,120,0.25)' } : {}}
                  >
                    {feat ? (
                      <div className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0 mt-[6px]`} />
                        <span className="text-sm text-dark-600 dark:text-dark-300 leading-snug">{feat}</span>
                      </div>
                    ) : (
                      <span className="block w-5 h-px bg-dark-300/30 dark:bg-dark-600/30 mt-2" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}

          {/* Footer row — no bottom border */}
          <div className="grid grid-cols-1 sm:grid-cols-5 bg-white dark:bg-dark-950" style={{ borderTop: '1.5px solid rgba(100,100,120,0.35)' }}>
            {solutions.map((solution, i) => {
              const s = colStyles[i] || colStyles[0];
              return (
                <div
                  key={solution.id}
                  style={i < solutions.length - 1 ? { borderRight: '1.5px solid rgba(100,100,120,0.35)' } : {}}
                >
                  <Link
                    to={`/solutions/${solution.id}`}
                    className={`flex items-center justify-between px-8 py-4 text-sm font-semibold ${s.label} group hover:opacity-80 transition-opacity duration-150`}
                  >
                    <span className="underline underline-offset-4 decoration-current/40 group-hover:decoration-current transition-all duration-150">
                      View solution
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-150">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

