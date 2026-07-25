import React, { useState, useEffect, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { ProcessedImage, CompressionSettings } from './types';
import { downloadCompressedImage, generateId } from './utils/helpers';
import { compressImage } from './utils/compressor';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import SettingsPanel from './components/SettingsPanel';
import ImageCard from './components/ImageCard';
import PreviewModal from './components/PreviewModal';
import Onboarding from './components/Onboarding';
import { DownloadIcon, LoadingIcon, DeleteIcon, ShieldIcon, BatchIcon, PasteIcon } from './components/Icon';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

const STORAGE_KEY = 'img_compress_settings';
const ONBOARDED_KEY = 'img_compress_onboarded';
const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 0.95,
  format: 'auto',
  maxWidth: 1920,
  lossless: false
};

const loadSettings = (): CompressionSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
  }
  return DEFAULT_SETTINGS;
};

const saveSettings = (settings: CompressionSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
  }
};

// Compress a single image; if the result is larger than the original, keep the original file.
const compressOne = async (img: ProcessedImage, currentSettings: CompressionSettings): Promise<ProcessedImage> => {
  try {
    const compressedBlob = await compressImage(img.originalFile, currentSettings);
    const originalSize = img.originalFile.size;
    const keptOriginal = compressedBlob.size >= originalSize;
    const finalBlob = keptOriginal ? img.originalFile : compressedBlob;
    const ratio = keptOriginal
      ? 0
      : Math.round(((originalSize - compressedBlob.size) / originalSize) * 100);

    if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);

    return {
      ...img,
      compressedBlob: finalBlob,
      compressedUrl: URL.createObjectURL(finalBlob),
      status: 'done',
      compressionRatio: ratio,
      keptOriginal
    };
  } catch (error) {
    console.error('Compression failed:', error);
    return { ...img, status: 'error', keptOriginal: false };
  }
};

function AppContent() {
  const { t } = useLanguage();
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [previewImage, setPreviewImage] = useState<ProcessedImage | null>(null);
  const [settings, setSettings] = useState<CompressionSettings>(loadSettings);
  const [isProcessingGlobal, setIsProcessingGlobal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [zipProgress, setZipProgress] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      return !localStorage.getItem(ONBOARDED_KEY);
    } catch {
      return false;
    }
  });
  const deleteConfirmRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  // Guards against stale results when settings change while a re-process is in flight
  const settingsRunIdRef = useRef(0);

  const handleSettingsChange = (newSettings: CompressionSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Process a set of images in parallel, merging results back into state by id.
  // When shouldApply returns false (a newer run superseded this one), results are discarded.
  const processImages = useCallback(async (
    targets: ProcessedImage[],
    currentSettings: CompressionSettings,
    shouldApply?: () => boolean
  ) => {
    if (targets.length === 0) return;
    setIsProcessingGlobal(true);
    const ids = new Set(targets.map(img => img.id));
    setImages(prev => prev.map(img => ids.has(img.id) ? { ...img, status: 'processing' } : img));

    const results = await Promise.all(targets.map(img => compressOne(img, currentSettings)));

    if (shouldApply && !shouldApply()) {
      // Stale run: release the blob URLs we just created and leave state to the newer run
      results.forEach(r => {
        if (r.compressedUrl) URL.revokeObjectURL(r.compressedUrl);
      });
      return;
    }

    const resultMap = new Map(results.map(r => [r.id, r]));
    setImages(prev => prev.map(img => resultMap.get(img.id) ?? img));
    setIsProcessingGlobal(false);
  }, []);

  // Debounced re-processing when settings change
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setTimeout(() => {
      const runId = ++settingsRunIdRef.current;
      processImages(images, settings, () => settingsRunIdRef.current === runId);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleFilesSelected = useCallback((files: File[]) => {
    const newImages: ProcessedImage[] = files.map(file => ({
      id: generateId(),
      originalFile: file,
      originalPreviewUrl: URL.createObjectURL(file),
      compressedBlob: null,
      compressedUrl: null,
      status: 'pending',
      compressionRatio: 0,
      keptOriginal: false
    }));

    setImages(prev => [...prev, ...newImages]);
    processImages(newImages, settings);
  }, [processImages, settings]);

  // Paste images from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            const extension = item.type.split('/')[1] || 'png';
            files.push(new File([file], `pasted_${Date.now()}_${i}.${extension}`, { type: file.type }));
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        handleFilesSelected(files);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFilesSelected]);

  const handleRemoveImage = (id: string) => {
    setImages(prev => {
      const target = prev.find(img => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalPreviewUrl);
        if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const handleRetry = (id: string) => {
    const target = images.find(img => img.id === id);
    if (target) {
      processImages([target], settings);
    }
  };

  const confirmClearAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.originalPreviewUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
    setShowDeleteConfirm(false);
    setIsProcessingGlobal(false);
    clearButtonRef.current?.focus();
  };

  const handleClearAll = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    clearButtonRef.current?.focus();
  };

  // Focus the confirm button when the delete modal opens
  useEffect(() => {
    if (showDeleteConfirm) {
      deleteConfirmRef.current?.focus();
    }
  }, [showDeleteConfirm]);

  // Keyboard: Enter confirms, ESC cancels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDeleteConfirm) return;

      if (e.key === 'Enter') {
        confirmClearAll();
      } else if (e.key === 'Escape') {
        cancelDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDeleteConfirm, images]);

  const handleDownloadAll = async () => {
    const completedImages = images.filter(img => img.status === 'done' && img.compressedBlob);

    if (completedImages.length === 0 || zipProgress !== null) return;

    if (completedImages.length === 1) {
      const img = completedImages[0];
      downloadCompressedImage(img);
      return;
    }

    try {
      setZipProgress(0);
      const zip = new JSZip();
      const usedNames = new Set<string>();
      completedImages.forEach(img => {
        const extension = img.compressedBlob?.type.split('/')[1] || 'jpg';
        const originalName = img.originalFile.name.substring(0, img.originalFile.name.lastIndexOf('.'));
        let fileName = `${originalName}_compressed.${extension}`;
        let counter = 1;
        while (usedNames.has(fileName)) {
          fileName = `${originalName}_compressed_${counter}.${extension}`;
          counter++;
        }
        usedNames.add(fileName);
        zip.file(fileName, img.compressedBlob!);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setZipProgress(Math.round(metadata.percent));
      });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed_images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to create zip archive:', error);
    } finally {
      setZipProgress(null);
    }
  };

  const isBusy = isProcessingGlobal || zipProgress !== null;

  const closeOnboarding = () => {
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch (e) {
      console.warn('Failed to save onboarding state:', e);
    }
    setShowOnboarding(false);
  };

  const features = [
    { icon: ShieldIcon, title: t('featurePrivacyTitle'), desc: t('featurePrivacyDesc') },
    { icon: BatchIcon, title: t('featureBatchTitle'), desc: t('featureBatchDesc') },
    { icon: PasteIcon, title: t('featurePasteTitle'), desc: t('featurePasteDesc') }
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 noise-bg">
      <Header onShowOnboarding={() => setShowOnboarding(true)} />

      {showOnboarding && <Onboarding onClose={closeOnboarding} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <section className="max-w-4xl mx-auto space-y-4">
            <div className="text-center space-y-2 animate-fade-in px-4 pt-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">{t('heroTitle')}</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">{t('heroSubtitle')}</p>
            </div>

            <Dropzone onFilesSelected={handleFilesSelected} />

            {images.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="glass rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800 text-center space-y-1 animate-slide-up hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 mx-auto bg-primary/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <feature.icon className="w-4 h-4 text-primary-light" />
                    </div>
                    <h3 className="font-display font-semibold text-zinc-800 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
        </section>

        {images.length > 0 && (
          <div className="animate-slide-up space-y-6">
            {/* Settings and Stats combined */}
            <div className="max-w-4xl mx-auto">
                <SettingsPanel
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    stats={(() => {
                        // Keep stats stable during re-processing: any image that still holds a
                        // compressed blob contributes, even while its status is 'processing'
                        const completedImages = images.filter(img => img.compressedBlob);

                        if (completedImages.length === 0) return null;

                        let totalOriginal = 0;
                        let totalCompressed = 0;

                        for (const img of completedImages) {
                            const originalSize = Number(img.originalFile?.size);
                            const compressedSize = img.compressedBlob?.size;

                            if (!isNaN(originalSize) && originalSize > 0) {
                                totalOriginal += originalSize;
                            }
                            if (!isNaN(compressedSize) && compressedSize > 0) {
                                totalCompressed += compressedSize;
                            }
                        }

                        if (totalOriginal === 0) return null;

                        const savedBytes = totalOriginal - totalCompressed;
                        const savedPercent = Math.round((savedBytes / totalOriginal) * 100);

                        return {
                            totalOriginal,
                            totalCompressed,
                            savedBytes: Math.max(0, savedBytes),
                            savedPercent: isNaN(savedPercent) ? 0 : Math.max(0, savedPercent)
                        };
                    })()}
                />
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-300 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        {t('queueTitle')} <span className="text-zinc-500">({images.length})</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                    {images.map((image, index) => (
                        <div key={image.id} className="animate-scale-in h-full" style={{ animationDelay: `${index * 50}ms` }}>
                            <ImageCard
                                image={image}
                                onRemove={handleRemoveImage}
                                onPreview={setPreviewImage}
                                onRetry={handleRetry}
                            />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}
      </main>

      {previewImage && (
        <PreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}

      {/* Action buttons — desktop: floating side column */}
      {images.length > 0 && !showDeleteConfirm && (
        <div className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
          <button
            onClick={(e) => { clearButtonRef.current = e.currentTarget; handleClearAll(); }}
            className="flex items-center justify-center gap-2 px-5 py-3 text-sm text-zinc-500 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-zinc-300 dark:border-zinc-700 hover:border-red-500/50 glass-elevated shadow-lg"
            title={t('clearAll')}
            aria-label={t('clearAll')}
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownloadAll}
            disabled={isBusy}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            title={t('downloadAll')}
            aria-label={t('downloadAll')}
          >
            {isBusy ? (
              <LoadingIcon className="w-5 h-5 animate-spin" />
            ) : (
              <DownloadIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      )}

      {/* Action buttons — mobile: bottom bar */}
      {images.length > 0 && !showDeleteConfirm && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex gap-3">
          <button
            onClick={(e) => { clearButtonRef.current = e.currentTarget; handleClearAll(); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all duration-300 border border-zinc-300 dark:border-zinc-700 hover:border-red-500/50"
            aria-label={t('clearAll')}
          >
            <DeleteIcon className="w-4 h-4" />
            <span>{t('clearAll')}</span>
          </button>
          <button
            onClick={handleDownloadAll}
            disabled={isBusy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBusy ? (
              <>
                <LoadingIcon className="w-4 h-4 animate-spin" />
                {zipProgress !== null ? `${t('packaging')} ${zipProgress}%` : t('statusCompressing')}
              </>
            ) : (
              <>
                <DownloadIcon className="w-4 h-4" />
                {t('downloadAll')}
              </>
            )}
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={cancelDelete}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            className="glass-elevated rounded-2xl p-8 max-w-sm w-full mx-4 border border-red-500/30 shadow-2xl shadow-red-500/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-5">
              <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <DeleteIcon className="w-8 h-8 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 id="delete-confirm-title" className="text-xl font-display font-bold text-zinc-900 dark:text-white">{t('confirmClearTitle')}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t('confirmClearDesc')}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-5 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-xl transition-all duration-300 border border-zinc-300 dark:border-zinc-700"
                >
                  {t('confirmClearCancel')}
                </button>
                <button
                  ref={deleteConfirmRef}
                  onClick={confirmClearAll}
                  className="flex-1 px-5 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25"
                >
                  {t('confirmClearConfirm')}
                </button>
              </div>
              <p className="text-xs text-zinc-500">{t('confirmClearHint')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
