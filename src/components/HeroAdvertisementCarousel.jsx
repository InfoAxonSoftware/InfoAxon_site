import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../lib/api';

const terminalLines = [
  '$ deploying erp-solution --env prod',
  'Building ERP modules...',
  'Running migrations...',
  'Deployment successful',
  '$ build mobile-app --platform all',
  'iOS bundle ready',
  'Android APK ready',
  'App live on stores',
];

function TerminalSlide() {
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="relative min-h-0 flex-1 overflow-hidden border border-dark-200/60 dark:border-dark-700/50">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-dark-200/50 bg-dark-100 px-4 py-3 dark:border-dark-700/50 dark:bg-dark-800">
          <i className="h-3 w-3 rounded-full bg-red-400" />
          <i className="h-3 w-3 rounded-full bg-yellow-400" />
          <i className="h-3 w-3 rounded-full bg-green-400" />

          <span className="ml-3 font-mono text-xs text-dark-400">
            infoaxon ~ solutions
          </span>
        </div>

        {/* Terminal Body */}
        <div className="h-full space-y-2 bg-[#0d1117] px-5 py-5 font-mono">
          {terminalLines.map((text, index) => {
            const isCommand = index === 0 || index === 4;
            const isSuccess = index === 3 || index === 7;

            return (
              <motion.p
                key={text}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.2 + index * 0.1,
                }}
                className={`text-[11px] sm:text-xs ${
                  isCommand
                    ? 'text-cyan-400'
                    : isSuccess
                      ? 'text-primary-400'
                      : 'text-green-400'
                }`}
              >
                {!isCommand && (
                  <span className="mr-2">
                    &#10003;
                  </span>
                )}

                {text}
              </motion.p>
            );
          })}
        </div>
      </div>

      {/* Service Labels */}
      <div className="grid grid-cols-3 gap-2">
        {[
          'ERP Systems',
          'Mobile Apps',
          'Web Development',
        ].map((service) => (
          <div
            key={service}
            className="border border-dark-200 bg-white px-2 py-3 text-center text-[10px] font-semibold text-primary-500 dark:border-dark-700 dark:bg-dark-800 sm:text-xs"
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvertisementSlide({
  advertisement,
  onImageError,
}) {
  const isExternalLink = /^https?:\/\//i.test(
    advertisement.ctaLink || '',
  );

  const image = (
    <img
      src={advertisement.imageUrl}
      alt={advertisement.title || 'Advertisement'}
      onError={onImageError}
      className="block h-full w-auto max-h-full max-w-full object-contain object-center"
    />
  );

  if (advertisement.ctaLink) {
    return (
      <a
        href={advertisement.ctaLink}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        aria-label={
          advertisement.title
            ? `Open ${advertisement.title}`
            : 'Open advertisement'
        }
        className="flex h-full w-full cursor-pointer items-center justify-center"
      >
        {image}
      </a>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      {image}
    </div>
  );
}

export default function HeroAdvertisementCarousel({
  desktopHeight,
}) {
  const [advertisements, setAdvertisements] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/advertisements')
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const data = Array.isArray(response.data)
          ? response.data.filter(
              (advertisement) => advertisement.imageUrl,
            )
          : [];

        setAdvertisements(data);
      })
      .catch(() => {
        if (isMounted) {
          setAdvertisements([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const slides = useMemo(
    () => [
      {
        id: 'terminal',
        terminal: true,
      },
      ...advertisements,
    ],
    [advertisements],
  );

  useEffect(() => {
    if (isPaused || slides.length < 2) {
      return undefined;
    }

    const currentSlide = slides[activeIndex];

    const delay = currentSlide?.terminal
      ? 4500
      : Math.max(
          2,
          Math.min(
            60,
            Number(currentSlide?.durationSeconds) || 6,
          ),
        ) * 1000;

    const timer = window.setTimeout(() => {
      setActiveIndex(
        (currentIndex) =>
          (currentIndex + 1) % slides.length,
      );
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    activeIndex,
    isPaused,
    slides,
  ]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    slides.length,
  ]);

  const removeBrokenAdvertisement = (advertisementId) => {
    setAdvertisements((currentAdvertisements) =>
      currentAdvertisements.filter(
        (advertisement) =>
          advertisement.id !== advertisementId,
      ),
    );

    setActiveIndex(0);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="hero-carousel-wrapper relative w-full overflow-visible aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto"
      style={{
        height:
          desktopHeight !== null &&
          desktopHeight !== undefined
            ? `${desktopHeight}px`
            : undefined,
      }}
    >
      {/* Slides */}
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence
          initial={false}
          mode="wait"
        >
          {currentSlide && (
            <motion.div
              key={currentSlide.id}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.85,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex h-full w-full items-center justify-center"
            >
              {currentSlide.terminal ? (
                <TerminalSlide />
              ) : (
                <AdvertisementSlide
                  advertisement={currentSlide}
                  onImageError={() =>
                    removeBrokenAdvertisement(
                      currentSlide.id,
                    )
                  }
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute -bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-7 bg-primary-500'
                  : 'w-3 bg-dark-300 dark:bg-dark-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}