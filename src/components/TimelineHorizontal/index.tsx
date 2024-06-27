import { Icon } from '@iconify/react/dist/iconify.js';
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TimelineHorizontalItem {
  label: string;
  dates?: (string | Date)[];
}

interface TimelineItemProps extends TimelineHorizontalItem {
  isActive?: boolean;
}

function TimelineItem({
  label,
  dates,
  isActive = false,
}: TimelineItemProps) {
  return (
    <Stack
      align="center"
      gap={2}
      className="z-[2] w-[185px] text-center text-sm"
    >
      <Group
        justify="center"
        className={twMerge(
          'size-[28px] rounded-full',
          isActive ? 'bg-primary-surface' : 'bg-base-background'
        )}
      >
        <Box
          className={twMerge(
            'size-[14px] rounded-full',
            isActive ? 'bg-primary-main' : 'bg-base-gray'
          )}
        />
      </Group>
      <Text
        className={twMerge(
          isActive ? 'font-medium' : 'text-base-darkGray'
        )}
      >
        {label}
      </Text>
      {isActive &&
        dates?.map((date) => (
          <Text
            key={`timeline-horizontal-item-date-${dayjs(date).toISOString()}`}
            className="font-medium text-primary-main"
          >
            ({dayjs(date).format('DD-MM-YYYY, HH:mm:ss')})
          </Text>
        ))}
    </Stack>
  );
}

interface TimelineHorizontalProps {
  title?: string;
  currentPosition?: number;
  items: TimelineHorizontalItem[];
  loading?: boolean;
}

export default function TimelineHorizontal({
  title,
  currentPosition = -1,
  items = [],
  loading = false,
}: TimelineHorizontalProps) {
  const [activeLineWidth, setActiveLineWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  /**
   * * Create ref for timeline item container and calculate blue line's width
   */
  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      const children = node?.children;
      if (children) {
        const lastActiveElm = children[
          currentPosition
        ] as HTMLDivElement;

        if (items.length === currentPosition + 1) {
          setActiveLineWidth(node.offsetWidth);
        } else {
          const lastActivePosition = lastActiveElm.offsetLeft;
          setActiveLineWidth(lastActivePosition + 176 / 2);
        }
      }
      return node;
    },
    [currentPosition, items.length]
  );

  const timelineWidth = useMemo(
    () => items.length * (185 + 16), // * 185 is timeline item width, 16 is gap between items
    [items]
  );

  const handleSlideLeft = () => {
    sliderRef.current!.scrollLeft -= 300;
  };

  const handleSlideRight = () => {
    sliderRef.current!.scrollLeft += 300;
  };

  return (
    <Card withBorder radius="md" className="overflow-hidden">
      <Group justify="space-between">
        <Title order={6}>{title}</Title>
        <Group gap="xs">
          <ActionIcon
            size="sm"
            variant="light"
            radius="xl"
            color="gray"
            onClick={handleSlideLeft}
          >
            <Icon icon="ic:round-chevron-left" width={24} />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="light"
            radius="xl"
            color="gray"
            onClick={handleSlideRight}
          >
            <Icon icon="ic:round-chevron-right" width={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Card.Section>
        <Divider my="md" />
      </Card.Section>

      {loading ? (
        <Loader size="sm" m="auto" />
      ) : (
        <Box
          ref={sliderRef}
          className="hide-scrollbar overflow-x-scroll scroll-smooth pb-4"
        >
          <div className="relative">
            {/* Grey Dashed Line */}
            <div
              className="absolute top-3 z-[1] w-full border-spacing-10 border-2 border-dashed border-base-lightGray"
              style={{ minWidth: timelineWidth }}
            />

            {/* Blue Dashed Line */}
            <div
              className="absolute top-3 z-[2] w-full border-spacing-10 border-2 border-dashed border-primary-main"
              style={{
                width: activeLineWidth,
              }}
            />
          </div>

          <Group
            ref={containerRef}
            justify="space-evenly"
            align="start"
            className="w-full"
            gap={16}
            style={{ minWidth: timelineWidth }}
          >
            {items.map((item, i) => (
              <TimelineItem
                key={`timeline-horizontal-item-${item.label}`}
                label={item.label}
                dates={item.dates}
                isActive={i <= currentPosition}
              />
            ))}
          </Group>
        </Box>
      )}
    </Card>
  );
}
