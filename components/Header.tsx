import React from 'react';
import { SunIcon, MoonIcon, HelpIcon } from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onShowOnboarding: () => void;
}

const flatButtonClass =
  'flex items-center justify-center w-11 h-11 text-zinc-500 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors';

const Header: React.FC<HeaderProps> = ({ onShowOnboarding }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-5">
          <div className="flex shrink-0 items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="ImgCompress" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">{t('appTitle')}</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:block">{t('appSubtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
            <div className="hidden md:flex items-center gap-2.5">
              <a href="https://github.com/wangruofeng/img-compress/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t('documentation')}</a>
              <a href="https://github.com/wangruofeng/img-compress/" target="_blank" rel="noopener noreferrer" className={flatButtonClass} aria-label="GitHub">
                <img src={`${import.meta.env.BASE_URL}github.svg`} alt="GitHub" className="w-5 h-5 dark:invert" />
              </a>
            </div>
            <button onClick={onShowOnboarding} className={flatButtonClass} title={t('onboardHelpLabel')} aria-label={t('onboardHelpLabel')}>
              <HelpIcon className="w-5 h-5" />
            </button>
            <button onClick={toggleTheme} className={flatButtonClass} title={theme === 'dark' ? t('themeToLight') : t('themeToDark')} aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}>
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
