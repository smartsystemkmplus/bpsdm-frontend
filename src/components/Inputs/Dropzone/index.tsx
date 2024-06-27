import { Icon } from '@iconify/react';
import { Group, Notification, Overlay } from '@mantine/core';
import {
  Dropzone as MantineDropzone,
  FileWithPath,
} from '@mantine/dropzone';
import byteToReadable from '@utils/byteToReadable';
import convertFilesToHEIC from '@utils/convertFilesToHEIC';
import getFileExtension from '@utils/getFileExtension';
import mimeTypeToReadable from '@utils/mimeTypeToReadable';
import { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Description from './Description';
import { FileWithURL } from './index.types';
import MultipleDocumentZone from './MultipleDocumentZone';
import SingleDocumentZone from './SingleDocumentZone';

interface DropzoneProps {
  value: FileWithURL[] | null;
  onChange: (newValue: File[]) => void;
  acceptType: string[];

  /** Max file size in bytes. */
  maxSize?: number;
  description?: string;
  subDescription?: string;
  disabled?: boolean;
  disabledDefaultCursor?: boolean;
  typeComponent?: 'single' | 'multiple';

  /** Ignored if typeComponent is 'single'. */
  maxFiles?: number;
}

export default function Dropzone({
  value,
  onChange,
  acceptType,
  maxSize = 10 * 1024 ** 2, // Default to 10MB
  description,
  subDescription,
  disabled = false,
  disabledDefaultCursor = false,
  typeComponent = 'single',
  maxFiles = 1,
}: DropzoneProps) {
  const [notificationStatement, setNotificationStatement] = useState<{
    heading?: string;
    message?: string;
    isOpen?: boolean;
  }>({
    heading: '',
    message: '',
    isOpen: false,
  });

  const objAcceptType = useMemo(() => {
    const obj: Record<string, string[]> = {};
    acceptType.forEach((mime: string) => {
      switch (mime) {
        case 'image/jpeg':
          obj[mime] = ['.jpeg', '.jpg'];
          break;
        case 'video/mp4':
          obj[mime] = ['.mp4'];
          break;
        default:
          obj[mime] = [];
      }
    });
    return obj;
  }, [acceptType]);

  const isValidFiles = useCallback(
    (newFiles: FileWithPath[]) => {
      const valid = newFiles.every((newFile) => {
        const supportedExtensions: string[] = [];
        acceptType.forEach((mime: string) => {
          const mimeExts = objAcceptType[mime];
          if (mimeExts.length) {
            supportedExtensions.push(
              ...mimeExts.map((ext) => ext.replace('.', ''))
            );
          } else {
            supportedExtensions.push(
              mimeTypeToReadable(mime) as string
            );
          }
        });
        const stringSupportedExtensions =
          supportedExtensions.join(', ');

        const fileExt = getFileExtension(newFile?.name);
        const isSupportedFile = supportedExtensions.includes(fileExt);

        if (!isSupportedFile) {
          setNotificationStatement({
            isOpen: true,
            message: `Tipe file yang didukung adalah ${stringSupportedExtensions}`,
            heading: 'Tipe file tidak didukung',
          });
          return false;
        }

        if (newFile.size > maxSize) {
          setNotificationStatement({
            isOpen: true,
            message: `Ukuran file terlalu besar, ukuran maksimum file adalah ${byteToReadable(
              maxSize
            )}`,
            heading: 'Ukuran file terlalu besar',
          });
          return false;
        }

        return true;
      });
      return valid;
    },
    [objAcceptType, maxSize, acceptType]
  );

  return (
    <>
      {notificationStatement.isOpen && (
        <Notification
          title={notificationStatement.heading}
          className="my-4 p-4"
          icon={<Icon icon="bi:x" width={30} />}
          color="red"
          onClose={() => setNotificationStatement({ isOpen: false })}
        >
          {notificationStatement.message}
        </Notification>
      )}
      {value?.length ? (
        <>
          {(() => {
            switch (typeComponent) {
              case 'single':
                return (
                  <SingleDocumentZone
                    disabled={disabled}
                    files={value}
                    onChange={onChange}
                  />
                );

              case 'multiple':
                return (
                  <MultipleDocumentZone
                    files={value}
                    onChange={onChange}
                    subDescription={subDescription}
                    mimeTypes={objAcceptType}
                    maxFiles={maxFiles}
                    disabled={disabled}
                  />
                );

              default:
                return null;
            }
          })()}
        </>
      ) : (
        <MantineDropzone
          multiple={maxFiles > 1}
          onDrop={async (files) => {
            if (
              (files?.length ?? 0) + (value?.length ?? 0) >
              maxFiles
            ) {
              return;
            }

            if (isValidFiles(files)) {
              const newFiles = await convertFilesToHEIC(files);
              if (typeComponent === 'multiple') {
                onChange([...(value || []), ...newFiles]);
              } else {
                onChange(newFiles);
              }
              setNotificationStatement({ isOpen: false });
            }
          }}
          accept={objAcceptType}
          onReject={(files) => {
            isValidFiles(files.map((item) => item.file));
          }}
          maxFiles={maxFiles}
          maxSize={maxSize}
          classNames={{
            root: twMerge(
              'border-2 border-primary-main',
              disabled &&
                'hover:bg-white pointer-events-none cursor-not-allowed',
              disabled && disabledDefaultCursor && 'cursor-pointer',
              !!value?.length &&
                typeComponent === 'single' &&
                'hover:bg-white h-fit border-0 p-0'
            ),
            inner: 'pointer-events-auto',
          }}
          activateOnClick={(() => {
            if (
              typeComponent === 'multiple' &&
              value &&
              value.length < maxFiles
            ) {
              return true;
            }

            if (
              value?.length === 0 ||
              value === null ||
              value === undefined
            ) {
              return true;
            }

            return false;
          })()}
          disabled={disabled}
        >
          <Group
            className={twMerge(
              !!value?.length && typeComponent === 'single'
                ? 'h-fit'
                : 'min-h-[220px]'
            )}
          >
            {disabled && (
              <Overlay color="gray" opacity={0.075} zIndex={0} />
            )}
            <Description
              description={description}
              subDescription={subDescription}
            />
          </Group>
        </MantineDropzone>
      )}
    </>
  );
}
