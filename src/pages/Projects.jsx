import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function Projects() {
  const { projects } = useData();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const itemsPerPage = 6;

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [filter, searchTerm]);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filtered = projects.filter((p) => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  return (
    <>
      {/* Hero Section */}
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
              <span className="text-primary-400">Projects</span>
            </div>
            <h1 className="section-title mt-4 mb-6 max-w-3xl">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="section-description max-w-3xl">
              Every solution we create is built to solve real challenges and deliver measurable impact.
              Our case studies highlight how businesses have transformed through our technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters, Search & Grid */}
      <section className="section-padding pt-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                    ? 'gradient-bg text-white shadow-lg shadow-primary-500/25 scale-105'
                    : 'filter-btn hover:scale-105'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search projects, tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-2.5 pl-11 rounded-full bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mb-6 text-sm text-dark-400">
            Showing <span className="text-primary-500 font-semibold">{displayedProjects.length}</span> of <span className="font-semibold">{filtered.length}</span> projects
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i % itemsPerPage} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-dark-400 text-lg font-medium">No projects found.</p>
              <p className="text-dark-500 text-sm mt-2">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-full gradient-bg text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 flex items-center gap-2"
              >
                Load More Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            </div>
          )}
        </div>
      </section>

      
      <ContactForm />
    </>
  );
}



const ProjectCard = forwardRef(({ project, index }, ref) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  
  const setRefs = (node) => {
    inViewRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleCardClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handleViewMore = (e) => {
    e.stopPropagation();
    navigate(`/project/${project.id}`);
  };

  const backgroundImage = project.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800';

  return (
    <motion.div
      ref={setRefs}
      layout
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeOut" }}
      className="glass-card-hover overflow-hidden group flex flex-col h-full border border-dark-200/50 dark:border-dark-700/50 rounded-2xl bg-white dark:bg-dark-800/50 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 bg-cover bg-center overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        
        <div className="relative h-full p-6 flex flex-col justify-end">
          <span className="inline-block self-start px-3 py-1 rounded-full bg-primary-500/90 text-white text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-sm">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
            {project.title}
          </h3>
          <p className="text-white/80 text-sm mt-1 font-medium drop-shadow-md">{project.client}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-dark-500 dark:text-dark-300 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, j) => (
              <span key={j} className="tech-tag text-xs px-2.5 py-1">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-dark-400 dark:text-dark-500 px-2 py-1 font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex-grow" />

        <div className="pt-4 border-t border-dark-100 dark:border-dark-700/50 mt-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="text-[10px] font-bold text-dark-400 dark:text-dark-500 uppercase tracking-wider mb-1.5">
                Key Results
              </div>
              {project.results.map((result, j) => (
                <div key={j} className="flex items-center gap-1.5 text-xs text-dark-600 dark:text-dark-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span>{result}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleViewMore}
              className="flex-shrink-0 px-4 py-2.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:shadow-primary-500/20 group/btn"
            >
              View More
              <svg
                className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});