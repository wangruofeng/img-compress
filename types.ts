export interface ProcessedImage {
  id: string;
  originalFile: File;
  originalPreviewUrl: string;
  compressedBlob: Blob | null;
  compressedUrl: string | null;
  status: 'pending' | 'processing' | 'done' | 'error';
  compressionRatio: number; // Percentage saved
  keptOriginal: boolean; // True when the result uses the original file
}

export interface CompressionSettings {
  quality: number; // 0.1 to 1.0
  format: 'auto' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
  maxWidth: number;
  lossless: boolean; // Lossless WebP output, quality/format are ignored
}
