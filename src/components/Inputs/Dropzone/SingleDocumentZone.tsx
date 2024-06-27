import FileTypeIcon from '@components/FileTypeIcon';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ActionIcon, Card, Text } from '@mantine/core';

import { FileWithURL } from './index.types';

interface SingleDocumentZoneProps {
  disabled?: boolean;
  files: FileWithURL[];
  onChange: (newValue: File[]) => void;
}

export default function SingleDocumentZone({
  disabled,
  files,
  onChange,
}: SingleDocumentZoneProps) {
  const fileType =
    files[0]?.type?.split('/')[1] || files[0]?.type?.split('/')[0];
  const imageUrl = (() => {
    if (['jpg', 'jpeg', 'png'].includes(fileType)) {
      if (files[0] instanceof File) {
        return URL.createObjectURL(files[0]);
      }
      return (files[0] as FileWithURL)?.url;
    }
    return null;
  })();

  return (
    <div className="flex w-full justify-center rounded-lg border-2 border-dashed border-primary-main p-6">
      <Card
        shadow="sm"
        radius="md"
        withBorder
        className="flex items-center justify-center overflow-visible"
      >
        {!disabled && (
          <ActionIcon
            className="absolute -right-4 -top-4 rounded-3xl border-[.4px]"
            variant="outline"
            onClick={
              disabled
                ? () => {}
                : (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange([]);
                  }
            }
          >
            <Icon
              icon="material-symbols:close"
              color="gray"
              width="20"
              height="20"
            />
          </ActionIcon>
        )}
        <Card.Section className="px-4 py-2 ">
          {!!imageUrl && ['jpg', 'jpeg', 'png'].includes(fileType) ? (
            <img
              alt={files[0]?.name}
              src={imageUrl}
              className="w-full rounded-lg object-cover"
              loading="lazy"
            />
          ) : (
            <a href={files[0]?.url} target="_blank" rel="noreferrer">
              <FileTypeIcon type={fileType} />{' '}
            </a>
          )}
          <Text className="line-clamp-1 break-all">
            {files[0]?.name}
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}
