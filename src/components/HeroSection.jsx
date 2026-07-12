import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import { useData } from '../context/DataContext';
import HeroAdvertisementCarousel from './HeroAdvertisementCarousel';

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection() {
  const { companyInfo } = useData();

  const heroGridRef = useRef(null);
  const measuredContentRef = useRef(null);

  const [carouselLayout, setCarouselLayout] = useState({
    height: null,
    topOffset: 0,
  });

  useEffect(() => {
    const updateCarouselLayout = () => {
      const gridElement = heroGridRef.current;
      const contentElement = measuredContentRef.current;

      if (!gridElement || !contentElement) {
        return;
      }

      // Tablet/mobile: let the carousel use its normal responsive aspect ratio.
      if (window.innerWidth < 1024) {
        setCarouselLayout({
          height: null,
          topOffset: 0,
        });

        return;
      }

      const gridRect = gridElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();

      setCarouselLayout({
        height: Math.round(contentRect.height),
        topOffset: Math.round(contentRect.top - gridRect.top),
      });
    };

    updateCarouselLayout();

    const resizeObserver = new ResizeObserver(updateCarouselLayout);

    if (heroGridRef.current) {
      resizeObserver.observe(heroGridRef.current);
    }

    if (measuredContentRef.current) {
      resizeObserver.observe(measuredContentRef.current);
    }

    window.addEventListener('resize', updateCarouselLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCarouselLayout);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-white to-primary-50/30 dark:from-dark-950 dark:via-dark-950 dark:to-dark-900" />

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary-400/10 blur-3xl dark:bg-primary-600/15" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-cyan/8 blur-3xl dark:bg-accent-cyan/12" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(100,100,100,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.2) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:py-28 lg:px-8">
        <div
          ref={heroGridRef}
          className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] xl:gap-20"
        >
          {/* Left Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex min-w-0 flex-col gap-5 sm:gap-7"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex self-start items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 dark:border-primary-500/20 dark:bg-primary-500/10 sm:px-4 sm:py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500 dark:bg-primary-400" />

              <span className="text-xs font-medium tracking-wide text-primary-600 dark:text-primary-400 sm:text-sm">
                Welcome to InfoAxon Software Solutions
              </span>
            </motion.div>

            {/*
              This block determines the advertisement height.
              It starts at the headline and ends after the CTA buttons.
            */}
            <div
              ref={measuredContentRef}
              className="flex flex-col gap-5 sm:gap-7"
            >
              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="break-words text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-dark-900 dark:text-white sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem] xl:text-[4rem]"
              >
                <span className="gradient-text">
                  InfoAxon Software Solutions
                </span>

                <br />

                Sri Lanka
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="max-w-[30rem] text-base leading-relaxed text-dark-500 dark:text-dark-300 sm:text-lg"
              >
                {companyInfo.heroSubtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              >
                <Link
                  to="/contact"
                  className="btn-primary group w-full justify-center px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
                >
                  Start Your Project

                  <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/projects"
                  className="btn-secondary w-full justify-center px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
                >
                  <HiPlay />

                  View Our Work
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-2 border-t border-dark-200/60 pt-5 dark:border-dark-800/50 sm:flex sm:gap-10 sm:pt-7"
            >
              {[
                {
                  value: companyInfo.stats.projects,
                  label: 'Projects Delivered',
                },
                {
                  value: companyInfo.stats.clients,
                  label: 'Happy Clients',
                },
                {
                  value: companyInfo.stats.yearsExperience,
                  label: 'Years Experience',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.9 + index * 0.12,
                  }}
                  className="min-w-0 text-center sm:text-left"
                >
                  <div className="gradient-text text-xl font-bold sm:text-3xl">
                    {stat.value}
                  </div>

                  <div className="mt-1 break-words text-[10px] leading-tight text-dark-400 dark:text-dark-500 sm:text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Advertisement */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-w-0 flex-col"
            style={{
              marginTop:
                carouselLayout.height !== null
                  ? `${carouselLayout.topOffset}px`
                  : undefined,
            }}
          >
            <HeroAdvertisementCarousel
              desktopHeight={carouselLayout.height}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}