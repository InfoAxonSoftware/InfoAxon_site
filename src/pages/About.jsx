import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../context/DataContext';

export default function About() {
  const { companyInfo } = useData();

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
              <span className="text-primary-400">About</span>
            </div>
            <span className="section-subtitle">About</span>
            <h1 className="section-title mt-4 mb-6 max-w-3xl">
              Who <span className="gradient-text">We Are</span>
            </h1>
            <p className="section-description max-w-3xl">
              {companyInfo.about.split('\n\n')[0]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <AboutContent />

      {/* Mission, Vision, Values */}
      <MissionVisionValues />

      {/* Stats */}
      <StatsSection />

      {/* Why Choose Us */}
      <ExpertiseSection />
    </>
  );
}

function AboutContent() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold gradient-text mb-4">IA</div>
                  <div className="text-dark-400 text-lg">InfoAxon Technologies</div>
                  <div className="text-dark-400 dark:text-dark-500 text-sm mt-2">Building Digital Futures</div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-primary-400/20 dark:border-primary-500/20 -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-dark-900 dark:text-white">
              Your Trusted <span className="gradient-text">Technology Partner</span>
            </h2>
            {companyInfo.about.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-dark-500 dark:text-dark-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const items = [
    {
      title: 'Our Mission',
      content: companyInfo.mission,
      icon: '🎯',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Our Vision',
      content: companyInfo.vision,
      icon: '🔭',
      gradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'Our Values',
      content: companyInfo.values.join(' • '),
      icon: '💎',
      gradient: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20',
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-dark-50/50 dark:bg-dark-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-subtitle">Our Foundation</span>
          <h2 className="section-title mt-4">
            Mission, Vision & <span className="gradient-text">Values</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * i }}
              className={`glass-card p-8 border ${item.border} relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-dark-500 dark:text-dark-300 leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { value: companyInfo.stats.projects, label: 'Projects Delivered', icon: '🚀' },
    { value: companyInfo.stats.clients, label: 'Happy Clients', icon: '🤝' },
    { value: companyInfo.stats.teamMembers, label: 'Team Members', icon: '👥' },
    { value: companyInfo.stats.yearsExperience, label: 'Years Experience', icon: '📅' },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-accent-cyan/5" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 * i, type: 'spring' }}
                className="text-center"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-dark-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  const { companyInfo } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-dark-50/50 dark:bg-dark-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-subtitle">Our Expertise</span>
          <h2 className="section-title mt-4 mb-6">
            Why Choose <span className="gradient-text">InfoAxon</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {(companyInfo.whyChooseUs || []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * i }}
              className="glass-card-hover p-8"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white text-xl font-bold mb-6">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-dark-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
