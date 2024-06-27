import FileTypeIcon from '@components/FileTypeIcon';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  ActionIcon,
  Card,
  Group,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import convertFilesToHEIC from '@utils/convertFilesToHEIC';
import openInNewTab from '@utils/openInNewTab';

import Description from './Description';
import { Accept, FileWithURL } from './index.types';

interface MultipleDocumentZoneProps {
  files: FileWithURL[];
  onChange: (newValue: File[]) => void;
  subDescription?: string;
  maxFiles?: number;
  mimeTypes: string[] | Accept | undefined;
  maxSize?: number;
  disabled?: boolean;
}

export default function MultipleDocumentZone({
  files,
  onChange,
  subDescription,
  maxFiles = 3,
  mimeTypes,
  maxSize = 10 * 1024 * 1024,
  disabled,
}: MultipleDocumentZoneProps) {
  const previews = files?.map((file, index) => {
    const newFile = Object.assign(file, { id: index });
    const fileType =
      newFile?.type?.split('/')[1] || newFile?.type?.split('/')[0];
    const imageUrl = (() => {
      if (['jpg', 'jpeg', 'png'].includes(fileType)) {
        if (file instanceof File) return URL.createObjectURL(newFile);
        return newFile?.url;
      }
      return null;
    })();

    return (
      <Card
        key={newFile?.id}
        shadow="sm"
        className="h-[256px] cursor-pointer overflow-visible"
        radius="md"
        withBorder
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (file?.url) openInNewTab(file.url);
        }}
      >
        {!disabled && (
          <ActionIcon
            id={`${index}`}
            className="absolute -right-2 -top-2 rounded-3xl border-[.4px]"
            variant="outline"
            disabled={disabled}
          >
            <Icon
              icon="material-symbols:close"
              color="gray"
              width="20"
              height="20"
              id={`${index}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const newFiles = files.filter(
                  ({ id }) => (id || 0) !== +(file?.id || 0)
                );
                if (newFiles?.length === 0) {
                  onChange([]);
                  return;
                }
                onChange(newFiles);
              }}
            />
          </ActionIcon>
        )}
        <Card.Section className="overflow-x-hidden px-4 py-2">
          {['jpg', 'jpeg', 'png'].includes(fileType) ? (
            <img
              alt={newFile?.name}
              src={imageUrl as string}
              className="max-h-[210px] w-[300px] object-cover"
              loading="lazy"
            />
          ) : (
            <FileTypeIcon type={fileType} />
          )}
          <Text className="mt-2 truncate break-all text-sm">
            {newFile?.name}
          </Text>
        </Card.Section>
      </Card>
    );
  });

  const cols = 4;
  const filledCols = files.length % cols;
  const dropzoneColSpan = cols - filledCols;

  return (
    <SimpleGrid
      cols={{ base: 1, sm: cols }}
      mt={previews?.length > 0 ? 'xl' : 0}
      className="w-full rounded-lg border-2 border-dashed border-primary-main p-6"
    >
      {previews}
      {files?.length <= maxFiles - 1 && (
        <Dropzone
          onDrop={async (item) => {
            if ((files?.length || 0) + (item?.length || 0) > maxFiles)
              return;
            const newItem = await convertFilesToHEIC(item);
            const addNewItem = [...files, ...newItem];
            onChange(addNewItem);
          }}
          onReject={() => {
            onChange([]);
          }}
          multiple={maxFiles > 1}
          maxFiles={maxFiles}
          maxSize={maxSize || 10 * 1024 ** 2}
          accept={mimeTypes}
          styles={{
            root: {
              gridColumn: `span ${dropzoneColSpan} / span ${dropzoneColSpan}`,
            },
          }}
          classNames={{
            root: 'border-2',
            inner: 'pointer-events-auto',
          }}
        >
          <Group
            style={{
              minHeight: 220,
            }}
          >
            <Description subDescription={subDescription} />
          </Group>
        </Dropzone>
      )}
    </SimpleGrid>
  );
}
