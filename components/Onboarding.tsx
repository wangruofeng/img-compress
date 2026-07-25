import React, { useEffect, useState, useRef } from 'react';
import {
  CloseIcon, ShieldIcon, BatchIcon, SparklesIcon, GemIcon,
  UploadIcon, SettingsIcon, DownloadIcon, ChevronDownIcon, ArrowRightIcon,
  SunIcon, MoonIcon
} from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface OnboardingProps {
  onClose: () => void;
}

const headerButtonClass =
  'flex items-center justify-center w-11 h-11 text-zinc-500 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors';

// Scroll-triggered reveal wrapper: fades + rises once when entering the viewport
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onVisible?: () => void;
}> = ({ children, delay = 0, className = '', onVisible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        onVisibleRef.current?.();
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Onboarding: React.FC<OnboardingProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [barsVisible, setBarsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    scrollRef.current?.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  // Lock body scroll and support ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Compensate for the removed scrollbar so the page behind doesn't shift sideways
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [onClose]);

  const features = [
    { icon: ShieldIcon, title: t('featurePrivacyTitle'), desc: t('featurePrivacyDesc') },
    { icon: SparklesIcon, title: t('featureAutoTitle'), desc: t('featureAutoDesc') },
    { icon: GemIcon, title: t('featureLosslessTitle'), desc: t('featureLosslessDesc') },
    { icon: BatchIcon, title: t('featureBatchTitle'), desc: t('featureBatchDesc') }
  ];

  const steps = [
    { icon: UploadIcon, title: t('step1Title'), desc: t('step1Desc') },
    { icon: SettingsIcon, title: t('step2Title'), desc: t('step2Desc') },
    { icon: DownloadIcon, title: t('step3Title'), desc: t('step3Desc') }
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') }
  ];

  return (
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('onboardHelpLabel')}
      className="fixed inset-0 z-[200] overflow-y-auto bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#09090b] dark:via-[#18181b] dark:to-[#0c0c10] noise-bg"
    >
      {/* Controls — mirrors the main header's button group so the language button aligns across pages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-2 sm:gap-2.5 pt-4">
          <button
            onClick={onClose}
            aria-label={t('closePreview')}
            className={headerButtonClass}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className={headerButtonClass}
            title={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
            aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 space-y-16 sm:space-y-24">
        {/* Hero — leaves a peek of the next section at the bottom to signal scrollability */}
        <section className="relative min-h-[calc(100dvh-11.5rem)] flex flex-col items-center justify-center text-center space-y-6 py-16 animate-fade-in motion-reduce:animate-none">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="ImgCompress"
            className="w-20 h-20 rounded-3xl shadow-2xl shadow-primary/30"
          />
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold gradient-text leading-normal">
              {t('appTitle')}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300">
              {t('onboardTagline')}
            </p>
            <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t('onboardHeroSub')}
            </p>
          </div>
          <button
            onClick={onClose}
            autoFocus
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-medium rounded-2xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 group"
          >
            {t('onboardStart')}
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Scroll hint */}
          <button
            onClick={scrollToContent}
            aria-label={t('onboardFeaturesTitle')}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-500 hover:text-primary-light transition-colors"
          >
            <ChevronDownIcon className="w-6 h-6 animate-soft-float" />
          </button>
        </section>

        {/* Features */}
        <Reveal>
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-zinc-800 dark:text-white">
              {t('onboardFeaturesTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 space-y-3 group"
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-5 h-5 text-primary-light" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-zinc-800 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Steps */}
        <Reveal>
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-zinc-800 dark:text-white">
              {t('onboardStepsTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative glass rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 text-center space-y-3 group"
                >
                  <span className="absolute top-4 left-4 text-4xl font-display font-bold text-primary/15 dark:text-primary/20 group-hover:text-primary/30 transition-colors duration-300 select-none">
                    {index + 1}
                  </span>
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-zinc-800 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Compression demo — bars animate when scrolled into view */}
        <Reveal onVisible={() => setBarsVisible(true)}>
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-zinc-800 dark:text-white">
              {t('onboardCompareTitle')}
            </h2>
            <div className="glass-elevated rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700/50 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{t('originalLabel')}</span>
                  <span className="font-semibold text-zinc-800 dark:text-white">2.4 MB</span>
                </div>
                <div className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-zinc-400 dark:bg-zinc-600 transition-all duration-1000 ease-out"
                    style={{ width: barsVisible ? '100%' : '0%' }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{t('compressedLabel')}</span>
                  <span className="font-semibold text-primary-dark dark:text-primary-light">380 KB</span>
                </div>
                <div className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000 ease-out delay-300"
                    style={{ width: barsVisible ? '16%' : '0%' }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('onboardCompareDesc')}</p>
                <span className={`shrink-0 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-xl border border-emerald-500/20 transition-all duration-500 delay-700 ${barsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                  -84%
                </span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-zinc-800 dark:text-white">
              {t('onboardFaqTitle')}
            </h2>
            <div className="space-y-3 max-w-2xl mx-auto">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className={`glass rounded-2xl border transition-colors duration-300 overflow-hidden ${
                      isOpen ? 'border-primary/40' : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                    >
                      {faq.q}
                      <ChevronDownIcon
                        className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-light' : ''}`}
                      />
                    </button>
                    <div
                      id={`faq-panel-${index}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <section className="text-center pb-8">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-medium rounded-2xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 group"
            >
              {t('onboardStart')}
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </section>
        </Reveal>
      </div>
    </div>
  );
};

export default Onboarding;
