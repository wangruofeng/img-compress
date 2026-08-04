import React from 'react';
import { CompressionSettings } from '../types';
import { SettingsIcon, ArrowRightIcon, CompressIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';
import { formatFileSize } from '../utils/helpers';

interface StatsData {
  totalOriginal: number;
  totalCompressed: number;
  savedBytes: number;
  savedPercent: number;
}

interface SettingsPanelProps {
  settings: CompressionSettings;
  onSettingsChange: (newSettings: CompressionSettings) => void;
  stats?: StatsData | null;
}

const MAX_WIDTH_OPTIONS = [0, 2560, 1920, 1280, 800];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, stats }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = React.useState(false);

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      quality: parseFloat(e.target.value)
    });
  };

  const handleMaxWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 只允许整数数字，过滤掉所有非数字字符
    const digits = e.target.value.replace(/\D/g, '');
    onSettingsChange({
      ...settings,
      maxWidth: digits === '' ? 0 : parseInt(digits, 10)
    });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  React.useEffect(() => {
    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
      return () => {
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  const getQualityLabel = (q: number) => {
    if (q >= 0.8) return t('qualityHigh');
    if (q >= 0.5) return t('qualityMed');
    return t('qualityLow');
  };

  const qualityColor = settings.quality >= 0.8
    ? { gradient: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)', solid: '#10b981', badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25' }
    : settings.quality >= 0.5
    ? { gradient: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)', solid: '#f59e0b', badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25' }
    : { gradient: 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)', solid: '#ef4444', badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25' };

  const qualityPercent = ((settings.quality - 0.1) / (1.0 - 0.1)) * 100;

  const formats: { value: CompressionSettings['format']; label: string; descKey: 'formatAutoDesc' | 'formatJpegDesc' | 'formatPngDesc' | 'formatWebpDesc' }[] = [
    { value: 'auto', label: t('formatAuto'), descKey: 'formatAutoDesc' },
    { value: 'image/jpeg', label: 'JPG', descKey: 'formatJpegDesc' },
    { value: 'image/png', label: 'PNG', descKey: 'formatPngDesc' },
    { value: 'image/webp', label: 'WebP', descKey: 'formatWebpDesc' }
  ];

  return (
    <div className="glass-elevated rounded-2xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-800/30">
        <div className="p-1.5 bg-primary/20 rounded-lg">
          <SettingsIcon className="w-4 h-4 text-primary-light" />
        </div>
        <h2 className="font-display font-semibold text-zinc-800 dark:text-white">{t('settingsTitle')}</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Lossless mode toggle */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
          <div className="min-w-0">
            <label htmlFor="lossless-toggle" className="text-sm font-medium text-zinc-800 dark:text-zinc-200 block cursor-pointer">
              {t('losslessLabel')}
            </label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{t('losslessDesc')}</p>
          </div>
          <button
            id="lossless-toggle"
            role="switch"
            aria-checked={settings.lossless}
            aria-label={t('losslessLabel')}
            onClick={() => onSettingsChange({ ...settings, lossless: !settings.lossless })}
            className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
              settings.lossless ? 'bg-gradient-to-r from-primary to-primary-dark' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                settings.lossless ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Quality Slider — primary control, full width */}
        <div
          className={`space-y-3 transition-opacity duration-300 ${settings.lossless ? 'opacity-40 pointer-events-none' : ''}`}
          aria-disabled={settings.lossless}
        >
          <div className="flex justify-between items-center">
            <label htmlFor="quality-slider" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('qualityLabel')}
            </label>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${qualityColor.badge}`}>
              {Math.round(settings.quality * 100)}% · {getQualityLabel(settings.quality)}
            </span>
          </div>

          <div className="relative group py-1.5">
            {/* Track */}
            <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${qualityPercent}%`, background: qualityColor.gradient }}
              />
            </div>

            {/* Native input (invisible, handles interaction + keyboard) */}
            <input
              id="quality-slider"
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={settings.quality}
              onChange={handleQualityChange}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              aria-label={t('qualityLabel')}
              aria-valuetext={`${Math.round(settings.quality * 100)}% - ${getQualityLabel(settings.quality)}`}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10 peer"
              style={{ background: 'transparent', WebkitAppearance: 'none', appearance: 'none' }}
            />

            {/* Visible thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md pointer-events-none transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-primary/40 group-hover:scale-110"
              style={{
                left: `calc(${qualityPercent}% - 8px)`,
                border: `2.5px solid ${qualityColor.solid}`
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-zinc-500">
            <span>{t('lowSize')}</span>
            <span>{t('bestQuality')}</span>
          </div>
        </div>

        {/* Format + Max Width — secondary controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Format segmented control */}
          <div
            className={`space-y-2.5 transition-opacity duration-300 ${settings.lossless ? 'opacity-40 pointer-events-none' : ''}`}
            aria-disabled={settings.lossless}
          >
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">{t('outputFormat')}</label>
            <div
              role="group"
              aria-label={t('outputFormat')}
              className="grid grid-cols-4 gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/50"
            >
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => onSettingsChange({ ...settings, format: format.value })}
                  aria-pressed={settings.format === format.value}
                  title={t(format.descKey)}
                  className={`py-2 px-3 text-sm rounded-lg transition-all duration-300 ${
                    settings.format === format.value
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white font-medium shadow-md shadow-primary/25'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/50'
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max width chips */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">{t('maxWidthLabel')}</label>
            <div role="group" aria-label={t('maxWidthLabel')} className="flex flex-wrap gap-1.5">
              {MAX_WIDTH_OPTIONS.map((width) => {
                const isActive = settings.maxWidth === width;
                return (
                  <button
                    key={width}
                    onClick={() => onSettingsChange({ ...settings, maxWidth: width })}
                    aria-pressed={isActive}
                    className={`px-3 py-2 text-xs rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'border-primary bg-primary/15 text-primary-dark dark:text-primary-light font-semibold'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }`}
                  >
                    {width === 0 ? t('maxWidthOriginal') : width}
                  </button>
                );
              })}
            </div>

            {/* 自定义宽度输入 */}
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={settings.maxWidth === 0 ? '' : settings.maxWidth}
                onChange={handleMaxWidthChange}
                placeholder={t('maxWidthCustom')}
                aria-label={t('maxWidthLabel')}
                className="w-full py-2 pl-3 pr-10 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 dark:text-zinc-500 pointer-events-none">px</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('maxWidthHint')}</p>
          </div>
        </div>

        {/* Stats Summary */}
        {stats && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700/50">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">{t('originalLabel')}</span>
              <span className="text-zinc-800 dark:text-white font-semibold">{formatFileSize(stats.totalOriginal)}</span>
              <ArrowRightIcon className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-500 dark:text-zinc-400">{t('compressedLabel')}</span>
              <span className="text-primary-dark dark:text-primary-light font-semibold">{formatFileSize(stats.totalCompressed)}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 w-full sm:w-auto justify-center sm:justify-start">
              <CompressIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">-{stats.savedPercent}%</span>
              <span className="text-zinc-500 text-xs">{t('savedLabel')} {formatFileSize(stats.savedBytes)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
