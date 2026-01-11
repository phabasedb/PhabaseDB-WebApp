export function formatFileSize(sizeKB) {
  if (!sizeKB && sizeKB !== 0) return "-";

  if (sizeKB >= 1024 * 1024) {
    return `${(sizeKB / (1024 * 1024)).toFixed(2)} GB`;
  }

  if (sizeKB >= 1024) {
    return `${(sizeKB / 1024).toFixed(2)} MB`;
  }

  return `${sizeKB} KB`;
}
