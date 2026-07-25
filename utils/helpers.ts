export const formatFileSize = (bytes: number | undefined | null): string => {
  if (!bytes || bytes === 0) return '0 B';
  if (isNaN(bytes)) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i < 0 || i >= sizes.length) return '0 B';
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Trigger a browser download from the current compressed blob.
// Creating the URL at click time keeps the downloaded bytes in sync with the
// blob whose size is shown in the UI, even when compression runs overlap.
export const downloadCompressedImage = (image: {
  originalFile: File;
  compressedBlob: Blob | null;
}): void => {
  if (!image.compressedBlob) return;
  const url = URL.createObjectURL(image.compressedBlob);
  const link = document.createElement('a');
  link.href = url;
  const extension = image.compressedBlob.type.split('/')[1] || 'jpg';
  const originalName = image.originalFile.name.substring(0, image.originalFile.name.lastIndexOf('.'));
  link.download = `${originalName}_compressed.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
