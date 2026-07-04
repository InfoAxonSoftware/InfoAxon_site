import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { useData } from '../context/DataContext';

const tagColors = [
  'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
];

function ProjectCard({ project, index, inView, featured = false }) {
  const tagColor = tagColors[index % tagColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card-hover overflow-hidden group ${featured ? '' : 'flex flex-col'}`}
    >
      {featured ? (
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          {/* Visual panel */}
          <div className="relative flex items-center justify-center p-10 bg-gradient-to-br from-dark-100 to-dark-200/80 dark:from-dark-800 dark:to-dark-900 min-h-[240px]">
            <div className="w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-dark-200/60 dark:border-dark-700/40 bg-white dark:bg-dark-800 flex items-center justify-center shadow-xl">
              <div className="text-center select-none">
                <div className="text-5xl font-black gradient-text mb-1">{project.title.charAt(0)}</div>
                <div className="text-dark-400 text-xs font-medium">{project.client}</div>
              </div>
            </div>
            {/* Dots */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-white/5 dark:to-dark-950/20" />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tagColor}`}>
              {project.category}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-5 text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech, j) => (
                <span key={j} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {project.results.map((result, j) => (
                <div key={j} className="flex items-center gap-1.5 text-xs text-dark-500 dark:text-dark-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {result}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Compact visual */}
          <div className="relative flex items-center justify-center p-7 bg-gradient-to-br from-dark-100 to-dark-200/60 dark:from-dark-800 dark:to-dark-900 min-h-[160px]">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-dark-800 border border-dark-200/60 dark:border-dark-700/40 flex items-center justify-center shadow-lg">
              <div className="text-3xl font-black gradient-text">{project.title.charAt(0)}</div>
            </div>
            <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold ${tagColor}`}>
              {project.category}
            </span>
          </div>
          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 3).map((tech, j) => (
                <span key={j} className="tech-tag text-[10px]">{tech}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function ProjectsPreview() {
  const { projects } = useData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const featured = projects.filter((p) => p.featured);
  const [first, ...rest] = featured;
  const secondary = rest.slice(0, 2);

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
          className="text-center mb-14"
        >
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title mt-3 mb-5">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-description mx-auto">
            Every solution we build solves real challenges and delivers measurable results.
          </p>
        </motion.div>

        {/* Featured large card */}
        {first && (
          <div className="mb-5">
            <ProjectCard project={first} index={0} inView={inView} featured />
          </div>
        )}

        {/* Two smaller cards */}
        {secondary.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            {secondary.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} inView={inView} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-primary">
            View All Projects <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
