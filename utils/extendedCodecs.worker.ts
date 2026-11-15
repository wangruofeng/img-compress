import type { ExtendedCodecRequest } from './extendedCodecs';

self.onmessage = async ({ data }: MessageEvent<ExtendedCodecRequest>) => {
  try {
    if (data.format === 'image/avif') {
      const [{ default: createEncoder }, { defaultOptions }, { default: wasmUrl }] = await Promise.all([
        import('@jsquash/avif/codec/enc/avif_enc.js'),
        import('@jsquash/avif/meta.js'),
        import('@jsquash/avif/codec/enc/avif_enc.wasm?url'),
      ]);
      const encoder = await createEncoder({ locateFile: () => wasmUrl });
      const { image, quality } = data;
      const output = encoder.encode(image.data, image.width, image.height, {
        ...defaultOptions,
        quality: Math.round(quality * 100),
        qualityAlpha: 100,
      });
      if (!output?.length) throw new Error('AVIF encoding failed');
      self.postMessage(new Blob([new Uint8Array(output)], { type: data.format }));
    } else {
      const [{ default: init, optimise }, { default: wasmUrl }] = await Promise.all([
        import('@jsquash/oxipng/codec/pkg/squoosh_oxipng.js'),
        import('@jsquash/oxipng/codec/pkg/squoosh_oxipng_bg.wasm?url'),
      ]);
      await init(wasmUrl);
      const output = optimise(new Uint8Array(data.bytes), 2, false, false);
      self.postMessage(new Blob([new Uint8Array(output)], { type: data.format }));
    }
  } catch (error) {
    self.postMessage(error instanceof Error ? error : new Error(String(error)));
  }
};
