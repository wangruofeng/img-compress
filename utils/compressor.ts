import { CompressionSettings } from '../types';
import encodeWebp, { init as initWebpEncoder } from '@jsquash/webp/encode';
import webpEncSimdUrl from '@jsquash/webp/codec/enc/webp_enc_simd.wasm?url';
import webpEncUrl from '@jsquash/webp/codec/enc/webp_enc.wasm?url';
import { simd } from 'wasm-feature-detect';

// Check if a format is supported by the browser
const isFormatSupported = (format: string): boolean => {
  try {
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 1;
    testCanvas.height = 1;
    const dataUrl = testCanvas.toDataURL(format);
    return dataUrl.startsWith(`data:${format}`);
  } catch {
    return false;
  }
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

const encodeCanvas = (canvas: HTMLCanvasElement, format: string, quality?: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob && typeof blob.size === 'number' && blob.size > 0) {
          resolve(blob);
        } else {
          reject(new Error('Compression failed: no valid blob'));
        }
      },
      format,
      quality
    );
  });
};

// Sample the alpha channel to detect meaningful transparency
const hasTransparency = (ctx: CanvasRenderingContext2D, width: number, height: number): boolean => {
  try {
    const data = ctx.getImageData(0, 0, width, height).data;
    // Sample every 16th pixel for performance on large images
    const step = 16 * 4;
    for (let i = 3; i < data.length; i += step) {
      if (data[i] < 255) return true;
    }
  } catch (e) {
    console.warn('Failed to inspect alpha channel:', e);
  }
  return false;
};

// Lazily initialize the WASM WebP encoder once (used by lossless mode).
// The module is pre-compiled from a `?url` asset so it works in bundled production builds.
let webpEncoderPromise: Promise<unknown> | null = null;

const ensureWebpEncoder = (): Promise<unknown> => {
  if (!webpEncoderPromise) {
    webpEncoderPromise = (async () => {
      const wasmUrl = (await simd()) ? webpEncSimdUrl : webpEncUrl;
      const bytes = await fetch(wasmUrl).then(res => res.arrayBuffer());
      const module = await WebAssembly.compile(bytes);
      // The type signature only documents option overrides, but the runtime
      // also accepts a pre-compiled WebAssembly.Module as the first argument.
      await initWebpEncoder(module as unknown as Parameters<typeof initWebpEncoder>[0]);
    })();
  }
  return webpEncoderPromise;
};

// Encode the canvas as lossless WebP (pixel-perfect); falls back to lossless PNG
const encodeLossless = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Promise<Blob> => {
  try {
    await ensureWebpEncoder();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buffer = await encodeWebp(imageData, { lossless: 1 });
    return new Blob([buffer], { type: 'image/webp' });
  } catch (e) {
    console.warn('Lossless WebP encoding failed, falling back to PNG:', e);
    return encodeCanvas(canvas, 'image/png');
  }
};

// Auto mode: pick the best output format per image, balancing quality and size.
// - WebP is preferred (best ratio, supports alpha)
// - For opaque JPEG inputs, JPEG is also encoded and the smaller result wins
// - PNG only as a last resort when nothing else is available
const compressAuto = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  file: File,
  quality: number
): Promise<Blob> => {
  const webpSupported = isFormatSupported('image/webp');
  const transparent = hasTransparency(ctx, canvas.width, canvas.height);

  const candidates: Blob[] = [];

  if (webpSupported) {
    try {
      candidates.push(await encodeCanvas(canvas, 'image/webp', quality));
    } catch (e) {
      console.warn('WebP encoding failed:', e);
    }
  }

  // JPEG is only worth comparing for photographic (JPEG) inputs without transparency
  if (!transparent && (file.type === 'image/jpeg' || !webpSupported)) {
    try {
      candidates.push(await encodeCanvas(canvas, 'image/jpeg', quality));
    } catch (e) {
      console.warn('JPEG encoding failed:', e);
    }
  }

  if (candidates.length === 0) {
    // PNG is lossless and universally supported
    return encodeCanvas(canvas, 'image/png');
  }

  return candidates.reduce((best, blob) => (blob.size < best.size ? blob : best));
};

export const compressImage = async (
  file: File,
  settings: CompressionSettings
): Promise<Blob> => {
  const img = await loadImage(file);

  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;

  // Resize logic if max width is set and image is larger
  if (settings.maxWidth > 0 && width > settings.maxWidth) {
    const ratio = settings.maxWidth / width;
    width = settings.maxWidth;
    height = height * ratio;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Lossless mode: pixel-perfect WebP output, quality/format settings are ignored
  if (settings.lossless) {
    ctx.drawImage(img, 0, 0, width, height);
    return encodeLossless(canvas, ctx);
  }

  // Auto mode decides the format per image after inspecting its content
  if (settings.format === 'auto') {
    ctx.drawImage(img, 0, 0, width, height);
    return compressAuto(canvas, ctx, file, settings.quality);
  }

  let format = settings.format;

  // Check if the requested format is supported, fallback to JPEG
  if (!isFormatSupported(format)) {
    format = 'image/jpeg';
  }

  // Fill background for non-transparent formats
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  // PNG is lossless, quality parameter is ignored
  const quality = format === 'image/png' ? undefined : settings.quality;

  try {
    return await encodeCanvas(canvas, format, quality);
  } catch {
    // Fallback to JPEG if compression fails
    return encodeCanvas(canvas, 'image/jpeg', settings.quality);
  }
};
