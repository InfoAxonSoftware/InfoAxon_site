import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import { useData } from '../context/DataContext';
import HeroAdvertisementCarousel from './HeroAdvertisementCarousel';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const terminalLines = [
  { delay: 0.7,  color: 'text-accent-cyan',  text: '$ deploying erp-solution --env prod' },
  { delay: 1.2,  color: 'text-green-400',     text: '  ✓ Building ERP modules...' },
  { delay: 1.7,  color: 'text-green-400',     text: '  ✓ Running migrations...' },
  { delay: 2.2,  color: 'text-primary-400',   text: '  → Deployment successful 🚀' },
  { delay: 2.9,  color: 'text-accent-cyan',   text: '$ build mobile-app --platform all' },
  { delay: 3.4,  color: 'text-green-400',     text: '  ✓ iOS bundle ready' },
  { delay: 3.9,  color: 'text-green-400',     text: '  ✓ Android APK ready' },
  { delay: 4.4,  color: 'text-primary-400',   text: '  → App live on stores 📱' },
];

const services = [
  { icon: '⚡', label: 'ERP Systems',   color: 'text-primary-500',  bg: 'bg-primary-500/10' },
  { icon: '📱', label: 'Mobile Apps',   color: 'text-accent-cyan',  bg: 'bg-accent-cyan/10' },
  { icon: '🌐', label: 'Web Development', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
];

export default function HeroSection() {
  const { companyInfo } = useData();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-white to-primary-50/30 dark:from-dark-950 dark:via-dark-950 dark:to-dark-900" />
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-primary-400/10 dark:bg-primary-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-accent-cyan/8 dark:bg-accent-cyan/12 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(100,100,100,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.2) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:py-28">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-20 items-center">

          {/* ── Left Content ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex min-w-0 flex-col gap-5 sm:gap-7">

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex self-start items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                         bg-primary-50 dark:bg-primary-500/10
                         border border-primary-200 dark:border-primary-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 animate-pulse" />
              <span className="text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium tracking-wide">
                Welcome to InfoAxon
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="break-words text-[2.25rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] sm:leading-[1.1] tracking-tight text-dark-900 dark:text-white"
            >
              Build Smarter<br />
              with{' '}
              <span className="gradient-text">Innovative<br />Technology</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-dark-500 dark:text-dark-300 text-base sm:text-lg leading-relaxed max-w-[30rem]"
            >
              {companyInfo.heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/contact" className="btn-primary w-full sm:w-auto justify-center px-5 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base group">
                Start Your Project
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/projects" className="btn-secondary w-full sm:w-auto justify-center px-5 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base">
                <HiPlay />
                View Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-2 sm:flex sm:gap-10 pt-5 sm:pt-7 border-t border-dark-200/60 dark:border-dark-800/50"
            >
              {[
                { value: companyInfo.stats.projects,       label: 'Projects Delivered' },
                { value: companyInfo.stats.clients,        label: 'Happy Clients' },
                { value: companyInfo.stats.yearsExperience, label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="min-w-0 text-center sm:text-left"
                >
                  <div className="text-xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="break-words text-[10px] sm:text-xs leading-tight text-dark-400 dark:text-dark-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 self-stretch flex-col gap-4 [&>div]:lg:h-full [&>div]:lg:min-h-[580px] [&>div]:lg:aspect-auto"
          >
            <HeroAdvertisementCarousel />
            <div className="hidden">
            {/* Terminal card */}
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-3 bg-primary-500/8 dark:bg-primary-500/15 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-dark-200/60 dark:border-dark-700/50 shadow-2xl shadow-dark-900/10 dark:shadow-dark-950/50">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-dark-100 dark:bg-dark-800 border-b border-dark-200/50 dark:border-dark-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-dark-400 dark:text-dark-500 font-mono select-none">
                    infoaxon ~ solutions
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-5 font-mono bg-[#0d1117] space-y-[0.45rem]">
                  {terminalLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: line.delay, duration: 0.35 }}
                      className={`${line.color} text-[0.72rem] leading-snug`}
                    >
                      {line.text}
                    </motion.p>
                  ))}

                  {/* Blinking cursor */}
                  <motion.div
                    className="flex items-center gap-1.5 text-accent-cyan text-[0.72rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.0 }}
                  >
                    <span className="text-dark-500">$</span>
                    <motion.span
                      className="inline-block w-[7px] h-[14px] bg-accent-cyan rounded-[2px]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Service chips row */}
            <div className="flex gap-3">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.2 + i * 0.15, duration: 0.4 }}
                  className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl
                             bg-white dark:bg-dark-800/80
                             border border-dark-200/60 dark:border-dark-700/40
                             shadow-sm"
                >
                  <span className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center text-base flex-shrink-0`}>
                    {s.icon}
                  </span>
                  <span className={`${s.color} text-xs font-semibold leading-tight`}>{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated dot grid */}
            <div className="flex justify-end pr-2">
              <div className="grid grid-cols-8 gap-[5px] opacity-25 dark:opacity-15">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-primary-500"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.06 }}
                  />
                ))}
              </div>
            </div>
            </div>
          </motion.div>

        </div>
      </div>


    </section>
  );
}
