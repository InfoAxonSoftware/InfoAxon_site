import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../context/DataContext';

const accentColors = [
  { ring: 'ring-blue-400/30',    bg: 'bg-blue-500/10',    text: 'text-blue-500' },
  { ring: 'ring-violet-400/30',  bg: 'bg-violet-500/10',  text: 'text-violet-500' },
  { ring: 'ring-emerald-400/30', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  { ring: 'ring-orange-400/30',  bg: 'bg-orange-500/10',  text: 'text-orange-500' },
  { ring: 'ring-pink-400/30',    bg: 'bg-pink-500/10',    text: 'text-pink-500' },
  { ring: 'ring-cyan-400/30',    bg: 'bg-cyan-500/10',    text: 'text-cyan-500' },
];

export default function WhyChooseUs() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const items = companyInfo.whyChooseUs || [];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-white dark:bg-dark-950">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-500/4 dark:bg-primary-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-subtitle">Why InfoAxon</span>
          <h2 className="section-title mt-3 mb-5">
            Your{' '}
            <span className="gradient-text">Competitive Edge</span>{' '}
            Starts Here
          </h2>
          <p className="section-description mx-auto">
            We combine deep technical expertise with a client-first approach to deliver solutions
            that make a real difference.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const c = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + 0.12 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card-hover p-7 group flex flex-col items-center text-center gap-4"
              >
                <div className="flex items-center justify-center mb-3">
                  <span className={`text-5xl font-black ${c.text} opacity-20 group-hover:opacity-40 transition-opacity leading-none select-none`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="max-w-[90%]">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-dark-400 dark:text-dark-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className={`h-0.5 rounded-full ${c.bg} w-10 group-hover:w-full transition-all duration-500 mx-auto`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
