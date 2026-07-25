import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ProcessedImage } from '../types';
import { formatFileSize, downloadCompressedImage } from '../utils/helpers';
import { CloseIcon, CompareIcon, DownloadIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface PreviewModalProps {
  image: ProcessedImage;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ image, onClose }) => {
  const { t } = useLanguage();
  const { originalPreviewUrl: originalUrl, compressedUrl, originalFile, compressedBlob } = image;
  const title = originalFile.name;

  const [splitPosition, setSplitPosition] = useState(50); // 默认中间位置 (50%)
  const [isDragging, setIsDragging] = useState(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSliderKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPosition(prev => Math.min(100, prev + 5));
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const updateSplitPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateSplitPosition(e.clientX);
  }, [isDragging, updateSplitPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches[0]) {
      updateSplitPosition(e.touches[0].clientX);
    }
  }, [updateSplitPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      updateSplitPosition(e.touches[0].clientX);
    }
  }, [isDragging, updateSplitPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // 监听图片加载完成，更新尺寸
  useEffect(() => {
    const handleImageLoad = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        });
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        return () => img.removeEventListener('load', handleImageLoad);
      }
    }
  }, [originalUrl, compressedUrl]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadCompressedImage(image);
  };

  const showComparison = !!compressedUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* 顶部标题栏 */}
      <div className="absolute top-0 inset-x-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="min-w-0 flex items-center gap-3">
          <div className="hidden sm:flex w-9 h-9 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            <CompareIcon className="w-4 h-4 text-primary-light" />
          </div>
          <h3 className="text-white text-sm font-medium truncate" title={title}>
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          autoFocus
          aria-label={t('closePreview')}
          className="shrink-0 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/10 hover:border-primary"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 中央图片区 */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-24">
        {showComparison ? (
          <div
            ref={containerRef}
            className="relative max-w-full max-h-full flex items-center justify-center rounded-2xl shadow-2xl animate-scale-in border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: isDragging ? 'col-resize' : 'default' }}
          >
            {/* 图片容器 - 确保两张图片尺寸一致 */}
            <div className="relative flex items-center justify-center">
              {/* 原图（完整显示，作为背景） */}
              <img
                src={originalUrl}
                alt={`${title} - ${t('previewOriginal')}`}
                className="max-w-full max-h-[calc(90vh-7rem)] w-auto h-auto object-contain block"
                ref={imageRef}
              />

              {/* 压缩图（左侧裁剪显示，覆盖在原图上） */}
              <img
                src={compressedUrl}
                alt={`${title} - ${t('previewCompressed')}`}
                className="absolute top-0 left-0 max-w-full max-h-[calc(90vh-7rem)] w-auto h-auto object-contain block"
                style={{
                  clipPath: `inset(0 ${100 - splitPosition}% 0 0)`,
                  pointerEvents: 'none',
                  width: imageSize?.width || imageRef.current?.width || 'auto',
                  height: imageSize?.height || imageRef.current?.height || 'auto'
                }}
              />
            </div>

            {/* 分割线 */}
            <div
              role="slider"
              tabIndex={0}
              aria-label={t('compareSliderLabel')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(splitPosition)}
              onKeyDown={handleSliderKeyDown}
              className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 focus:outline-none focus-visible:bg-primary-light"
              style={{
                left: `${splitPosition}%`,
                cursor: 'col-resize',
                transform: 'translateX(-50%)',
                height: imageSize?.height || imageRef.current?.height || '100%'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* 拖拽手柄 */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-110"
                style={{ cursor: 'col-resize' }}
              >
                <CompareIcon className="w-5 h-5 text-zinc-700" />
              </div>
            </div>

            {/* 对比标签 */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 z-30">
              {t('previewCompressed')}
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 z-30">
              {t('previewOriginal')}
            </div>
          </div>
        ) : (
          <img
            src={originalUrl}
            alt={title}
            className="max-w-full max-h-[calc(90vh-7rem)] object-contain rounded-2xl shadow-2xl animate-scale-in border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      {/* 底部信息操作栏 */}
      <div
        className="absolute bottom-0 inset-x-0 z-40 flex items-center justify-center px-4 pb-5 pt-8 bg-gradient-to-t from-black/60 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
            <span className="text-zinc-300">{formatFileSize(originalFile.size)}</span>
            <span className="text-zinc-500">→</span>
            {compressedBlob ? (
              <span className="font-semibold text-primary-light">{formatFileSize(compressedBlob.size)}</span>
            ) : (
              <span className="text-zinc-500 animate-pulse">...</span>
            )}
          </div>

          {image.status === 'done' && !image.keptOriginal && (
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30 whitespace-nowrap">
              -{image.compressionRatio}%
            </span>
          )}
          {image.status === 'done' && image.keptOriginal && (
            <span
              className="px-2 py-1 bg-sky-500/20 text-sky-300 text-xs font-medium rounded-lg border border-sky-500/30 whitespace-nowrap"
              title={t('keptOriginalDesc')}
            >
              {t('keptOriginal')}
            </span>
          )}

          {compressedUrl && (
            <button
              onClick={handleDownload}
              title={t('downloadBtn')}
              aria-label={t('downloadBtn')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 whitespace-nowrap"
            >
              <DownloadIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t('downloadBtn')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
