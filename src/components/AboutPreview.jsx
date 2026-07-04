import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../context/DataContext';

const statCards = [
  { key: 'projects', label: 'Projects Delivered', gradient: 'from-blue-500 to-primary-500', ring: 'ring-blue-500/20' },
  { key: 'clients', label: 'Happy Clients', gradient: 'from-primary-500 to-violet-500', ring: 'ring-primary-500/20' },
  { key: 'teamMembers', label: 'Team Members', gradient: 'from-violet-500 to-pink-500', ring: 'ring-violet-500/20' },
  { key: 'yearsExperience', label: 'Years Experience', gradient: 'from-amber-500 to-orange-500', ring: 'ring-amber-500/20' },
];

const pillars = [
  { title: 'Innovation First', desc: 'We bring forward-thinking solutions to every project.' },
  { title: 'Rock-Solid Quality', desc: 'Tested, reliable software that performs under pressure.' },
  { title: 'True Partnership', desc: 'We grow alongside your business, not just deliver and leave.' },
];

export default function AboutPreview() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="pt-8 pb-20 sm:pt-10 sm:pb-24 relative overflow-hidden bg-white dark:bg-dark-950">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/5 dark:bg-accent-cyan/8 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-subtitle">Who We Are</span>
          <h2 className="section-title mt-3 mb-4">
            Digital Solutions <span className="gradient-text">That Matter</span>
          </h2>
          <p className="text-dark-500 dark:text-dark-300 text-base leading-relaxed">
            InfoAxon is a full service software development company helping businesses transform through technology.

          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.55 }}
              className={`relative group rounded-2xl p-6 bg-dark-50/60 dark:bg-dark-900/50 border border-dark-100 dark:border-dark-800 ring-1 ${s.ring} hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
              <div className={`text-3xl font-extrabold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                {companyInfo.stats[s.key]}
              </div>
              <div className="text-dark-400 dark:text-dark-500 text-xs font-medium mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main content: text left, pillars right */}
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-5 leading-tight">
              We don&apos;t just write code<br />
              <span className="gradient-text">we engineer your growth.</span>
            </h3>
            <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-8 text-sm">
              Founded with a mission to make world-class software accessible, InfoAxon has grown into a trusted
              partner for businesses across industries. Our team combines deep technical expertise with a genuine
              commitment to your success.
            </p>

            {/* Vision callout */}
            <div className="pl-4 border-l-4 border-primary-500 py-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-1">Our Vision</div>
              <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed line-clamp-2">{companyInfo.vision}</p>
            </div>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-dark-50/60 dark:bg-dark-900/50 border border-dark-100 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="font-semibold text-dark-900 dark:text-white mb-1">{p.title}</div>
                  <div className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

