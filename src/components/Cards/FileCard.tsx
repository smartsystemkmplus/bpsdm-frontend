import FileTypeIcon from '@components/FileTypeIcon';
import { Stack, Text, Tooltip } from '@mantine/core';
import byteToReadable from '@utils/byteToReadable';
import downloadFile from '@utils/downloadFile';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

interface FileCardProps {
  name?: string;
  url?: string;
  type?: string;

  /** File size in bytes. */
  size?: number | null;
  createdAt?: Date | string;
}

export default function FileCard({
  name,
  url,
  type,
  size,
  createdAt,
}: FileCardProps) {
  return (
    <div
      className={twMerge(
        'relative max-h-[300px] w-[184px] rounded-md border bg-base-white',
        url ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <button
        type="button"
        onClick={() => {
          if (url) downloadFile(url, name);
        }}
        className="flex size-full flex-col items-center justify-between gap-5 px-3 py-4"
        disabled={!url}
      >
        <div className="mb-2 flex h-full items-center justify-center space-x-1">
          {(() => {
            if (
              type?.toLowerCase() === 'jpeg' ||
              type?.toLowerCase() === 'png' ||
              type?.toLowerCase() === 'jpg'
            ) {
              return (
                <a
                  target="_blank"
                  href={url}
                  rel="noopener noreferrer"
                >
                  <img
                    className="aspect-[71/45] max-h-[180px] w-full max-w-[284px] cursor-pointer"
                    src={url}
                    alt={name}
                    loading="lazy"
                  />
                </a>
              );
            }
            return <FileTypeIcon type={type as string} />;
          })()}
        </div>

        <div className="flex w-full justify-between gap-2 self-start text-start">
          <Stack gap={2}>
            <Tooltip
              label={name}
              withArrow
              multiline
              classNames={{
                tooltip: 'whitespace-normal max-w-[400px]',
              }}
            >
              <Text fw={500} lineClamp={1} size="sm">
                {name}
              </Text>
            </Tooltip>
            <div className="flex gap-1 text-xs text-base-darkGray">
              {!!createdAt && (
                <Text size="xs">
                  {dayjs(createdAt).format('D MMMM YYYY')}
                </Text>
              )}
              {typeof size === 'number' && !!createdAt && (
                <Text size="xs">&bull;</Text>
              )}
              {typeof size === 'number' && (
                <Text size="xs">{byteToReadable(size || 0)}</Text>
              )}
            </div>
          </Stack>
        </div>
      </button>
    </div>
  );
}
