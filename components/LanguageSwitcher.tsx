import React, { useState, useRef, useEffect } from 'react';
import { GlobeIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../locales/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'zh-hk', label: '繁體中文', flag: '🇭🇰' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-label={t('languageLabel')}
        className="flex items-center justify-center gap-2 h-11 px-3.5 text-[13px] font-medium header-control"
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
      </button>
      {isDropdownOpen && (
        <div role="listbox" aria-label={t('languageLabel')} className="absolute right-0 mt-2 w-36 flex flex-col gap-1 rounded-lg p-1 overflow-hidden animate-scale-in bg-white dark:bg-zinc-900 shadow-lg border border-zinc-100 dark:border-zinc-800">
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsDropdownOpen(false);
              }}
              className={`w-full rounded-md text-left px-2.5 py-2 text-sm transition-colors duration-150 flex items-center gap-2 focus-visible:outline-none focus-visible:bg-zinc-100 focus-visible:text-zinc-800 dark:focus-visible:bg-zinc-800 dark:focus-visible:text-zinc-200 ${language === lang.code
                ? 'bg-zinc-100 font-medium text-zinc-800 dark:bg-zinc-800/75 dark:text-zinc-200'
                : 'text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
