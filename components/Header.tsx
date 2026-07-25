import React from 'react';
import { SunIcon, MoonIcon, HelpIcon } from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onShowOnboarding: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowOnboarding }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="ImgCompress" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">{t('appTitle')}</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:block">{t('appSubtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/wangruofeng/img-compress/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary-dark hover:text-primary-light transition-colors">{t('documentation')}</a>
              <a href="https://github.com/wangruofeng/img-compress/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <img src={`${import.meta.env.BASE_URL}github.svg`} alt="GitHub" className="w-5 h-5 dark:invert" />
              </a>
            </div>
            <button onClick={onShowOnboarding} className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title={t('onboardHelpLabel')} aria-label={t('onboardHelpLabel')}>
              <HelpIcon className="w-5 h-5" />
            </button>
            <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title={theme === 'dark' ? t('themeToLight') : t('themeToDark')} aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}>
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
