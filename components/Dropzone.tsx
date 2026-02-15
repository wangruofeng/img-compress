import React, { useCallback, useState, useRef } from 'react';
import { UploadIcon } from './Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFilesSelected }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = (Array.from(e.dataTransfer.files) as File[]).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = (Array.from(e.target.files) as File[]).filter(file =>
        file.type.startsWith('image/')
      );
      if (files.length > 0) {
        onFilesSelected(files);
      }
    }
  }, [onFilesSelected]);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative group cursor-pointer
        border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500
        ${isDragging
          ? 'border-primary bg-primary/10 scale-[1.01] shadow-2xl shadow-primary/20'
          : 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 hover:border-primary dark:hover:border-zinc-600 hover:bg-primary/5 dark:hover:bg-zinc-800/50'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center gap-5 pointer-events-none">
        <div className={`
          p-5 rounded-2xl transition-all duration-500 relative
          ${isDragging ? 'bg-primary/20 scale-110' : 'bg-zinc-200 dark:bg-zinc-800 group-hover:bg-primary/10 dark:group-hover:bg-zinc-700'}
        `}>
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
          <UploadIcon className={`w-10 h-10 relative z-10 transition-colors duration-300 ${isDragging ? 'text-primary-light' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-primary-light'}`} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-zinc-800 dark:text-white">
            {t('dropzoneTitle')}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            {t('dropzoneSub')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-600">
          <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">PNG</span>
          <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">JPG</span>
          <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">WebP</span>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
