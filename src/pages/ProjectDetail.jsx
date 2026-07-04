import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useState, useEffect } from 'react';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useData();
  const project = projects.find((p) => p.id === id);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-950">
        <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-primary-500 hover:underline text-lg">← Back to Projects</Link>
      </div>
    );
  }

  const demoLink = project.demoUrl || project.link || '#';
  const images = project.images || [];
  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 via-white to-white dark:from-dark-950 dark:via-dark-950 dark:to-dark-950" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-400/5 dark:bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors mb-8 group">
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 dark:text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-dark-500 dark:text-dark-300">
                  Client: <span className="font-semibold text-dark-700 dark:text-dark-200">{project.client}</span>
                </p>
              </div>

              <div className="flex gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">{project.results?.length || 0}</div>
                  <div className="text-xs text-dark-400 uppercase tracking-wider mt-1">Results</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">{project.technologies?.length || 0}</div>
                  <div className="text-xs text-dark-400 uppercase tracking-wider mt-1">Tech Stack</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500">{images.length}</div>
                  <div className="text-xs text-dark-400 uppercase tracking-wider mt-1">Screenshots</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding pt-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Description & Gallery */}
            <div className="flex-1 space-y-12">
              {/* Description Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-800/50 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Project Overview
                </h2>
                <p className="text-dark-500 dark:text-dark-300 leading-relaxed text-lg whitespace-pre-line">
                  {project.description}
                </p>
              </motion.div>

              {/* 👇 Image Gallery - දැන් Overview එක වගේම glass-card එකක් ඇතුලේ */}
              {images.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-800/50 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Project Gallery
                    <span className="text-sm font-normal text-dark-400 ml-2">({images.length} images)</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayImages.map((img, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="relative group overflow-hidden rounded-xl cursor-pointer border-2 border-dark-200 dark:border-dark-700 shadow-lg hover:shadow-2xl hover:border-primary-500/50 transition-all duration-300"
                        onClick={() => openLightbox(idx)}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} screenshot ${idx + 1}`} 
                          className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            <span className="text-sm font-semibold">Click to view</span>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </div>
                      </motion.div>
                    ))}

                    {remainingCount > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group overflow-hidden rounded-xl cursor-pointer border-2 border-dashed border-primary-500/50 shadow-lg hover:shadow-2xl hover:border-primary-500 transition-all duration-300 bg-gradient-to-br from-primary-500/10 to-primary-600/10 dark:from-primary-500/20 dark:to-primary-600/20"
                        onClick={() => openLightbox(4)}
                      >
                        <div className="w-full h-48 md:h-56 flex flex-col items-center justify-center text-center p-6">
                          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
                            <span className="text-3xl font-bold text-white">+{remainingCount}</span>
                          </div>
                          <p className="text-dark-700 dark:text-dark-200 font-semibold text-lg">
                            {remainingCount} more {remainingCount === 1 ? 'image' : 'images'}
                          </p>
                          <p className="text-dark-400 text-sm mt-1">Click to view all</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="w-full lg:w-96 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Live Demo Button */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-gradient-to-br from-primary-500/5 to-primary-600/5 dark:from-primary-500/10 dark:to-primary-600/10 shadow-xl"
                >
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Demo
                  </h3>
                  <a 
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg gradient-bg text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] transition-all"
                  >
                    Visit Live Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>

                {/* Technologies Used */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-800/50"
                >
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag text-sm px-3 py-1.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Key Results */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6 rounded-2xl border border-dark-200/50 dark:border-dark-700/50 bg-white dark:bg-dark-800/50"
                >
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Results
                  </h3>
                  <ul className="space-y-3">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-dark-600 dark:text-dark-300">
                        <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0 shadow-sm shadow-green-500/50" />
                        <span className="text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/20 hover:scale-110 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute -top-12 left-0 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold">
                {currentImageIndex + 1} / {images.length}
              </div>

              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                  className="w-full h-[80vh] object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/20 hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/20 hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex 
                          ? 'border-primary-500 scale-110 shadow-lg shadow-primary-500/50' 
                          : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}