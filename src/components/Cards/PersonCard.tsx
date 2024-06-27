import ProfilePicture from '@components/ProfilePicture';
import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  ActionIcon,
  Anchor,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { MouseEventHandler, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PersonCardProps {
  imageUrl?: string | null;
  name: string;
  positionName?: string;
  groupName?: string;
  email?: string;
  badgeIcon?: ReactNode;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  withRemoveButton?: boolean;
  className?: string;
  classNames?: { wrapper?: string; textWrapper?: string };
}

export default function PersonCard({
  imageUrl,
  name,
  positionName,
  groupName,
  email,
  badgeIcon,
  onRemove,
  loading,
  withRemoveButton = false,
  className = '',
  classNames = { wrapper: '', textWrapper: '' },
}: PersonCardProps) {
  return (
    <Card
      withBorder
      className={twMerge('w-fit rounded-md', className)}
    >
      <Group
        align="start"
        wrap="nowrap"
        className={classNames?.wrapper}
      >
        {loading ? (
          <Skeleton
            w={48}
            h={48}
            radius="100%"
            className="shrink-0"
          />
        ) : (
          <ProfilePicture
            alt="avatar"
            imageUrl={imageUrl}
            name={name}
            withBadge={!!badgeIcon}
            badgeIcon={badgeIcon}
            size={48}
          />
        )}

        <Stack gap={4} className={classNames?.textWrapper}>
          {loading ? (
            <>
              <Skeleton w={80} h={14} my={3} />
              <Skeleton w={100} h={14} my={3} />
              <Skeleton w={70} h={14} my={3} />
              <Skeleton w={100} h={14} my={3} />
            </>
          ) : (
            <>
              <Tooltip label={name} disabled={!name}>
                <Text className="line-clamp-1 shrink-0 text-sm font-semibold">
                  {name}
                </Text>
              </Tooltip>

              {positionName && (
                <Tooltip label={positionName}>
                  <Text className="line-clamp-1 shrink-0 text-sm text-base-darkGray">
                    {positionName}
                  </Text>
                </Tooltip>
              )}
              {groupName && (
                <Tooltip label={groupName}>
                  <Text className="line-clamp-1 shrink-0 text-sm">
                    {groupName}
                  </Text>
                </Tooltip>
              )}
              {email && (
                <Tooltip label={email}>
                  <Anchor
                    href={`mailto:${email}`}
                    className="line-clamp-1 shrink-0 break-all text-sm text-primary-main"
                  >
                    {email}
                  </Anchor>
                </Tooltip>
              )}
            </>
          )}
        </Stack>

        {withRemoveButton && (
          <ActionIcon
            size="sm"
            variant="transparent"
            color={color.base.darkGray}
            onClick={onRemove}
          >
            <Icon icon="ic:round-close" width={24} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
}
