import React from 'react';
import { ProcessedImage } from '../types';
import { formatFileSize, downloadCompressedImage } from '../utils/helpers';
import { DownloadIcon, DeleteIcon, LoadingIcon, ArrowIcon, RetryIcon, ErrorIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageCardProps {
  image: ProcessedImage;
  onRemove: (id: string) => void;
  onPreview: (image: ProcessedImage) => void;
  onRetry: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onRemove, onPreview, onRetry }) => {
  const { t } = useLanguage();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadCompressedImage(image);
  };

  return (
    <div className="glass-elevated rounded-2xl overflow-hidden flex flex-col h-full border border-zinc-200 dark:border-zinc-700/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
      {/* Preview Area */}
      <div
        className="aspect-video relative overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 cursor-zoom-in"
        onClick={() => onPreview(image)}
      >
        <img
          src={image.originalPreviewUrl}
          alt={image.originalFile.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover veil with preview hint (hidden while processing/error overlays are active) */}
        {image.status === 'done' && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {t('previewLabel')}
            </span>
          </div>
        )}

        {/* Result badge (top-left) — kept visible during re-processing to avoid layout shift */}
        {image.compressedBlob && !image.keptOriginal && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-lg text-xs font-bold text-white shadow-lg">
            -{image.compressionRatio}%
          </div>
        )}
        {image.compressedBlob && image.keptOriginal && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 bg-sky-500/90 backdrop-blur-sm rounded-lg text-xs font-medium text-white shadow-lg"
            title={t('keptOriginalDesc')}
          >
            {t('keptOriginal')}
          </div>
        )}

        {/* Remove button (top-right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-sm rounded-full text-zinc-300 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100"
          title={t('removeImage')}
          aria-label={t('removeImage')}
        >
          <DeleteIcon className="w-4 h-4" />
        </button>

        {/* Processing overlay */}
        {image.status === 'processing' && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2.5 text-white">
            <LoadingIcon className="w-7 h-7 animate-spin text-primary-light" />
            <span className="text-xs font-medium tracking-wide">{t('statusCompressing')}</span>
          </div>
        )}

        {/* Error overlay with retry */}
        {image.status === 'error' && (
          <div className="absolute inset-0 bg-red-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 text-red-300 text-xs font-medium">
              <ErrorIcon className="w-4 h-4" />
              {t('statusFailed')}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRetry(image.id);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg border border-white/20 transition-all duration-300"
            >
              <RetryIcon className="w-3.5 h-3.5" />
              {t('retry')}
            </button>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-3.5 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate" title={image.originalFile.name}>
            {image.originalFile.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">{formatFileSize(image.originalFile.size)}</span>
            <ArrowIcon className="w-3 h-3 text-zinc-400 shrink-0" />
            {image.compressedBlob ? (
              <span className={`font-semibold transition-opacity ${image.status === 'processing' ? 'text-zinc-400 dark:text-zinc-500' : 'text-primary-dark dark:text-primary-light'}`}>
                {formatFileSize(image.compressedBlob.size)}
              </span>
            ) : image.status === 'error' ? (
              <span className="text-red-500 dark:text-red-400">—</span>
            ) : (
              <span className="text-zinc-500 animate-pulse">...</span>
            )}
          </div>
        </div>

        {image.compressedBlob && (
          <button
            onClick={handleDownload}
            disabled={image.status === 'processing'}
            title={t('downloadBtn')}
            aria-label={t('downloadBtn')}
            className="w-9 h-9 shrink-0 flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-95 disabled:opacity-50 disabled:cursor-wait"
          >
            {image.status === 'processing' ? (
              <LoadingIcon className="w-4 h-4 animate-spin" />
            ) : (
              <DownloadIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
