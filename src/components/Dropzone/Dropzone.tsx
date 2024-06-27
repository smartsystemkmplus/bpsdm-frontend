/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Icon } from '@iconify/react/dist/iconify.js';
import { Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRef } from 'react';

export function DropzoneButton() {
  const openRef = useRef<() => void>(null);

  return (
    <div className="relative mb-8">
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
        className="rounded-md border-2 border-dashed border-primary-main p-6 pb-8"
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <div>image</div>
              {/* <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              /> */}
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Icon icon="bi:file-earmark-arrow-up-fill" />
              {/* <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              /> */}
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Icon
                icon="bi:file-earmark-arrow-up-fill"
                height={67}
                width={54}
              />
              {/* <IconCloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
              /> */}
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>
              Letakkan File di sini atau{' '}
              <span
                onClick={() => openRef.current?.()}
                onKeyDown={() => openRef.current?.()}
                className="text-primary-main"
              >
                Cari File
              </span>
            </Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Kapasitas maksimal file 100MB
          </Text>
        </div>
      </Dropzone>
      <p className="mt-3 text-sm text-base-text">No file uploaded.</p>
    </div>
  );
}
