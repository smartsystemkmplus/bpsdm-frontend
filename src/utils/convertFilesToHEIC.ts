import { FileWithPath } from '@mantine/dropzone';
import heic2any from 'heic2any';

import getFileExtension from './getFileExtension';

/**
 * A utility function to convert .heic file into .png file if any.
 * If .heic file doesn't exist on input parameter, then return the file without any conversion
 */

const convertFilesToHEIC = (files: FileList | FileWithPath[]) =>
  Promise.all(
    Object.keys(files).map(async (key) => {
      const numberKey = +key;
      const fileType =
        files[numberKey].type.split('/')[0] ||
        getFileExtension(files[numberKey].name);

      // Convert .HEIC file to .PNG
      let convertedFile = null;
      if (fileType === 'heic') {
        const convertedBlob = await heic2any({
          blob: files[numberKey],
        });
        convertedFile = new File(
          [convertedBlob] as BlobPart[],
          files[numberKey].name.replace('.heic', '.png'),
          { type: 'image/png' }
        );
      }

      const file = convertedFile || files[numberKey];
      return file;
    })
  );

export default convertFilesToHEIC;
