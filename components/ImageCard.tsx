import React from 'react';
import { ProcessedImage } from '../types';
import { formatFileSize, downloadCompressedImage } from '../utils/helpers';
import { DownloadIcon, DeleteIcon, LoadingIcon, ArrowIcon, RetryIcon, ErrorIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageCardProps {
  image: ProcessedImage;
  onRemove: (id: string) => void;
  onPreview: (image: ProcessedImage, trigger: HTMLButtonElement) => void;
  onRetry: (id: string) => void;
}

const actionClass = 'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors focus-visible:outline-primary';

const ImageCard: React.FC<ImageCardProps> = ({ image, onRemove, onPreview, onRetry }) => {
  const { t } = useLanguage();
  const { originalFile, originalPreviewUrl, compressedBlob, status, keptOriginal, compressionRatio, id } = image;
  const busy = status === 'pending' || status === 'processing';

  return (
    <article className="glass-elevated home-surface flex h-full min-w-0 flex-col rounded-2xl p-2 shadow-md shadow-zinc-900/5 transition-shadow hover:shadow-lg dark:shadow-black/25">
      <button
        type="button"
        onClick={event => onPreview(image, event.currentTarget)}
        aria-label={`${t('previewLabel')} ${originalFile.name}`}
        className="group/preview relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-zinc-900/75"
      >
        <img src={originalPreviewUrl} alt="" className="h-full w-full object-contain" />
        <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover/preview:bg-black/20 group-focus-visible/preview:bg-black/20">
          <span className="rounded-lg bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
            {t('previewLabel')}
          </span>
        </span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 px-2 pb-1 pt-3">
        <div className="min-w-0 space-y-1.5">
          <h3 className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100" title={originalFile.name}>{originalFile.name}</h3>
          <div className="flex min-h-6 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
            <span title={t('originalLabel')}>{formatFileSize(originalFile.size)}</span>
            {compressedBlob && (
              <>
                <ArrowIcon aria-hidden="true" className="h-3 w-3 shrink-0 text-zinc-400" />
                <span title={t('compressedLabel')} className="font-semibold text-zinc-800 dark:text-zinc-200">{formatFileSize(compressedBlob.size)}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-1.5">
          <div className="min-w-0 text-xs font-medium">
            {busy && (
              <span role="status" className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                <LoadingIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 animate-spin motion-reduce:animate-none" />
                {t('statusCompressing')}
              </span>
            )}
            {status === 'error' && (
              <span role="status" className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <ErrorIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                {t('statusFailed')}
              </span>
            )}
            {status === 'done' && compressedBlob && (
              <span
                title={keptOriginal ? t('keptOriginalDesc') : t('savedLabel')}
                className={`inline-block rounded-md px-2 py-1 tabular-nums ${
                  keptOriginal ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                {keptOriginal ? t('keptOriginal') : `−${compressionRatio}%`}
              </span>
            )}
          </div>

          <div className="flex shrink-0 gap-1">
            {status === 'error' ? (
              <button
                type="button"
                onClick={() => onRetry(id)}
                title={t('retry')}
                aria-label={t('retry')}
                className={`${actionClass} bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`}
              >
                <RetryIcon className="h-4 w-4" />
              </button>
            ) : compressedBlob && (
              <button
                type="button"
                onClick={() => downloadCompressedImage(image)}
                disabled={busy}
                title={t('downloadBtn')}
                aria-label={t('downloadBtn')}
                className={`${actionClass} bg-primary/10 text-primary-dark hover:bg-primary/20 disabled:opacity-50 dark:text-primary-light`}
              >
                <DownloadIcon className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => onRemove(id)}
              title={t('removeImage')}
              aria-label={t('removeImage')}
              className={`${actionClass} text-zinc-500 hover:bg-red-500/10 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400`}
            >
              <DeleteIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ImageCard;
