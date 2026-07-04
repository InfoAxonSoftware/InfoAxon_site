import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const row1 = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django', 'GraphQL', 'Tailwind CSS'];
const row2 = ['ERP Systems', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'React Native', 'Express'];

function TechBadge({ name }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-xl
                    bg-white dark:bg-dark-800/60
                    border border-dark-200/70 dark:border-dark-700/50
                    text-dark-600 dark:text-dark-300 text-sm font-medium
                    hover:border-primary-400/60 dark:hover:border-primary-500/40
                    hover:text-primary-600 dark:hover:text-primary-400
                    shadow-sm dark:shadow-none transition-all duration-300 select-none cursor-default">
      <span className="w-2 h-2 rounded-full bg-gradient-to-br from-primary-400 to-accent-cyan opacity-70 flex-shrink-0" />
      {name}
    </div>
  );
}

export default function TechStackSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-white dark:bg-dark-950">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-dark-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-dark-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-subtitle">Technology</span>
          <h2 className="section-title mt-3 mb-4">
            Powered by a Modern{' '}
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-description mx-auto">
            We use industry-leading tools and frameworks to build fast, scalable, and maintainable solutions.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex animate-scroll-left gap-4" style={{ width: 'max-content' }}>
          {[...row1, ...row1, ...row1].map((tech, i) => (
            <TechBadge key={i} name={tech} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-right gap-4" style={{ width: 'max-content' }}>
          {[...row2, ...row2, ...row2].map((tech, i) => (
            <TechBadge key={i} name={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
