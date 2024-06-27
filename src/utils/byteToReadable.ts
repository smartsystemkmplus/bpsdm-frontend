/**
 * A utility function to convert bytes into a human readable string
 */

export default function byteToReadable(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
}
