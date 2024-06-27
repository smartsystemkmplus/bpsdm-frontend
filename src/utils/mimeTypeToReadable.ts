import { MIME_TYPES } from '@mantine/dropzone';

const EXT_MIME_TYPES: Record<string, string> = {
  ...MIME_TYPES,
  heic: 'image/heic',
};

/**
 * A utility function to convert MIME types into a human readable file extension
 */

export default function mimeTypeToReadable(type: string) {
  return Object.keys(EXT_MIME_TYPES).find(
    (key) => EXT_MIME_TYPES[key] === type
  );
}
