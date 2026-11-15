import ExtendedCodecWorker from './extendedCodecs.worker?worker';

export type ExtendedCodecRequest =
  | { format: 'image/avif'; image: ImageData; quality: number }
  | { format: 'image/apng'; bytes: ArrayBuffer };

const encodeInWorker = (request: ExtendedCodecRequest): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const worker = new ExtendedCodecWorker();
    worker.onmessage = ({ data }: MessageEvent<Blob | Error>) => {
      worker.terminate();
      if (data instanceof Blob && data.size > 0) resolve(data);
      else reject(data instanceof Error ? data : new Error('The image encoder returned no data'));
    };
    worker.onerror = (event) => {
      worker.terminate();
      reject(new Error(event.message || 'Image encoder worker failed'));
    };
    const buffer = request.format === 'image/avif' ? request.image.data.buffer : request.bytes;
    worker.postMessage(request, [buffer]);
  });

// Batch processing can enqueue many large images at once. Run one WASM job at a time.
let codecQueue = Promise.resolve();

export const runExtendedCodec = (request: ExtendedCodecRequest): Promise<Blob> => {
  const result = codecQueue.then(() => encodeInWorker(request));
  codecQueue = result.then(() => undefined, () => undefined);
  return result;
};
