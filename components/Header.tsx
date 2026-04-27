import React, { useState, useRef, useEffect } from 'react';
import { ImageIconRef, GlobeIcon, SunIcon, MoonIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../locales/translations';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '简体中文', flag: '🇨🇳' },
    { code: 'zh-hk', label: '繁體中文', flag: '🇭🇰' },
  ];

  return (
    <header className="glass sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="ImgCompress" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">{t('appTitle')}</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:block">{t('appSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/wangruofeng/img-compress/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary-dark hover:text-primary-light transition-colors"
              >
                {t('documentation')}
              </a>
              <a
                href="https://github.com/wangruofeng/img-compress/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary-dark hover:text-primary-light transition-colors"
              >
                {t('github')}
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center gap-2 h-9 px-3 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <GlobeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languages.find(l => l.code === language)?.label}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-lg py-1 overflow-hidden animate-scale-in bg-white dark:bg-zinc-900 shadow-lg border border-zinc-100 dark:border-zinc-800">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 flex items-center gap-2 ${language === lang.code
                        ? 'text-zinc-900 dark:text-white font-medium'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                        }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
