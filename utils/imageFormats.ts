const formats = [
  { label: 'PNG', type: 'image/png', extensions: ['png'] },
  { label: 'JPG', type: 'image/jpeg', extensions: ['jpg', 'jpeg'] },
  { label: 'WebP', type: 'image/webp', extensions: ['webp'] },
  { label: 'AVIF', type: 'image/avif', extensions: ['avif'] },
  { label: 'SVG', type: 'image/svg+xml', extensions: ['svg'] },
  { label: 'GIF', type: 'image/gif', extensions: ['gif'] },
  { label: 'APNG', type: 'image/apng', extensions: ['apng'] },
];

export const imageFormatLabels = formats.map(({ label }) => label);
export const imageAccept = formats.flatMap(({ type, extensions }) => [
  type, ...extensions.map(extension => `.${extension}`),
]).join(',');

export const normalizeImageFile = (file: File): File | null => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const format = formats.find(({ type }) => type === file.type)
    ?? formats.find(({ extensions }) => extension && extensions.includes(extension));
  if (!format) return file.type.startsWith('image/') ? file : null;
  return file.type === format.type
    ? file
    : new File([file], file.name, { type: format.type, lastModified: file.lastModified });
};

export const imageExtension = (type: string): string =>
  type === 'image/svg+xml' ? 'svg' : type.split('/')[1] || 'jpg';

export const hasApngFrames = (data: ArrayBuffer): boolean => {
  const view = new DataView(data);
  if (view.byteLength < 8 || view.getBigUint64(0) !== 0x89504e470d0a1a0an) return false;
  // acTL must appear before the first IDAT. Walk chunks to avoid matching text or pixel data.
  for (let offset = 8; offset + 12 <= view.byteLength;) {
    const length = view.getUint32(offset);
    const type = view.getUint32(offset + 4);
    if (offset + 12 + length > view.byteLength || type === 0x49444154) return false;
    if (type === 0x6163544c && length === 8) return true;
    offset += length + 12;
  }
  return false;
};

export const isAnimatedWebpOrAvif = async (file: File): Promise<boolean> => {
  const header = new DataView(await file.slice(0, 21).arrayBuffer());
  if (file.type === 'image/webp') {
    // The VP8X flags byte marks animation in an extended WebP file.
    return header.byteLength >= 21 && header.getUint32(12) === 0x56503858
      && (header.getUint8(20) & 0x02) !== 0;
  }
  if (header.byteLength < 16 || header.getUint32(4) !== 0x66747970) return false;
  const size = header.getUint32(0);
  if (size < 16 || size > file.size) return false;
  const brands = new DataView(await file.slice(0, size).arrayBuffer());
  if (brands.getUint32(8) === 0x61766973) return true;
  for (let offset = 16; offset + 4 <= brands.byteLength; offset += 4) {
    if (brands.getUint32(offset) === 0x61766973) return true;
  }
  return false;
};
