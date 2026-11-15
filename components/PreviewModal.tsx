import React, { useEffect, useState, useRef } from 'react';
import { ProcessedImage } from '../types';
import { formatFileSize, downloadCompressedImage } from '../utils/helpers';
import { CloseIcon, CompareIcon, DownloadIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface PreviewModalProps {
  image: ProcessedImage;
  onClose: () => void;
}

const clampSplit = (value: number) => Math.round(Math.max(0, Math.min(100, value)));

const PreviewModal: React.FC<PreviewModalProps> = ({ image, onClose }) => {
  const { t } = useLanguage();
  const { originalPreviewUrl: originalUrl, compressedUrl, originalFile, compressedBlob } = image;
  const title = originalFile.name;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<'original' | 'compare' | 'compressed'>('compare');
  const [split, setSplit] = useState(50);
  const activeView = compressedUrl ? view : 'original';
  const isComparing = activeView === 'compare';
  const views = [
    { value: 'original', label: t('previewOriginal') },
    { value: 'compare', label: t('previewCompare') },
    { value: 'compressed', label: t('previewCompressed') },
  ] as const;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  const moveSplit = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width > 0) setSplit(clampSplit((event.clientX - bounds.left) * 100 / bounds.width));
  };

  const handleSliderKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const delta = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[event.key];
    if (delta !== undefined) {
      event.preventDefault();
      setSplit(current => clampSplit(current + delta));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setSplit(event.key === 'Home' ? 0 : 100);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={event => { event.preventDefault(); onClose(); }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden bg-zinc-950/95 text-zinc-100 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
        <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="min-w-0 truncate text-sm font-semibold sm:text-base" title={title}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label={t('closePreview')}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-primary-light"
          >
            <CloseIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        <div
          className="mx-4 grid min-h-0 min-w-0 place-items-center [container-type:size] sm:mx-6"
          onClick={event => { if (event.target === event.currentTarget) onClose(); }}
        >
          <div className="preview-checkerboard relative isolate rounded-lg shadow-2xl">
            <img
              src={originalUrl}
              alt={`${title} - ${t('previewOriginal')}`}
              aria-hidden={activeView === 'compressed'}
              draggable={false}
              className="block h-auto max-h-[100cqh] w-auto max-w-[100cqw] rounded-lg object-contain"
              style={isComparing ? { clipPath: `inset(0 ${100 - split}% 0 0)` } : { visibility: activeView === 'compressed' ? 'hidden' : 'visible' }}
            />
            {activeView !== 'original' && (
              <img
                src={compressedUrl}
                alt={`${title} - ${t('previewCompressed')}`}
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full rounded-lg object-contain"
                style={isComparing ? { clipPath: `inset(0 0 0 ${split}%)` } : undefined}
              />
            )}
            {isComparing && (
              <div
                role="slider"
                tabIndex={0}
                aria-label={t('compareSliderLabel')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={split}
                aria-valuetext={`${t('previewOriginal')} ${split}% · ${t('previewCompressed')} ${100 - split}%`}
                onKeyDown={handleSliderKey}
                onPointerDown={event => {
                  if (!event.isPrimary || event.button !== 0) return;
                  event.currentTarget.focus({ preventScroll: true });
                  event.currentTarget.setPointerCapture(event.pointerId);
                  moveSplit(event);
                }}
                onPointerMove={event => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) moveSplit(event);
                }}
                className="absolute inset-0 touch-none cursor-ew-resize select-none rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light"
              >
                <span className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_#0008]" style={{ left: `${split}%` }} aria-hidden="true" />
                <span
                  className="pointer-events-none absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-800 shadow-lg sm:h-11 sm:w-11"
                  style={{ left: `${split}%` }}
                  aria-hidden="true"
                >
                  <CompareIcon className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
          {compressedUrl && (
            <div role="group" aria-label={t('previewLabel')} className="flex gap-1 rounded-xl bg-white/10 p-1">
              {views.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={view === value}
                  onClick={() => setView(value)}
                  className={`min-h-9 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-primary-light sm:text-sm ${
                    view === value ? 'bg-white/15 text-white' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white/10 px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
            <span className="whitespace-nowrap tabular-nums text-zinc-200">
              {formatFileSize(originalFile.size)}
              {compressedBlob && <> <span className="mx-1 text-zinc-400">→</span> <strong>{formatFileSize(compressedBlob.size)}</strong></>}
            </span>
            {image.status === 'done' && (
              <span
                title={image.keptOriginal ? t('keptOriginalDesc') : undefined}
                className={`rounded-md px-2 py-1 text-xs ${image.keptOriginal ? 'bg-sky-500/15 text-sky-300' : 'bg-emerald-500/15 text-emerald-300'}`}
              >
                {image.keptOriginal ? t('keptOriginal') : `−${image.compressionRatio}%`}
              </span>
            )}
            {(image.status === 'processing' || image.status === 'pending') && <span role="status" className="text-zinc-400">{t('statusCompressing')}</span>}
            {image.status === 'error' && <span role="status" className="text-red-300">{t('statusFailed')}</span>}
            {compressedBlob && (
              <button
                type="button"
                onClick={() => downloadCompressedImage(image)}
                disabled={image.status !== 'done'}
                aria-label={t('downloadBtn')}
                title={t('downloadBtn')}
                className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary-dark px-2.5 font-semibold text-white transition-colors hover:bg-violet-600 focus-visible:outline-primary-light disabled:opacity-40"
              >
                <DownloadIcon aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">{t('downloadBtn')}</span>
              </button>
            )}
          </div>
        </footer>
      </div>
    </dialog>
  );
};

export default PreviewModal;
