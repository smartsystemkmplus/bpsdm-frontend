import ProfilePicture from '@components/ProfilePicture';
import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Badge,
  Box,
  Card,
  Divider,
  Text,
  Tooltip,
} from '@mantine/core';
import { innovationStatus } from '@utils/innovationStatus';
import { Link } from 'react-router-dom';

export type InnovationStatus =
  | null
  | 'submission'
  | 'waiting-approval'
  | 'declined'
  | 'accepted'
  | 'mentoring-period';

interface InnovationCardProps {
  name?: string;
  description?: string;
  year?: string | number;
  entity?: string;
  category?: string;
  type?: string;
  status?: InnovationStatus;
  href?: string;
}

export function InnovationCard({
  name,
  description,
  year,
  entity,
  type,
  category,
  status,
  href,
}: InnovationCardProps) {
  return (
    <Link
      className={!href ? 'pointer-events-none cursor-default' : ''}
      to={href as string}
    >
      <Card
        padding="md"
        withBorder
        radius="md"
        h={252}
        className="flex flex-col gap-3 cursor-pointer card:hover"
      >
        <div className="flex gap-3">
          <Box className="size-fit shrink-0 rounded-md bg-base-background p-2">
            <Icon
              icon="material-symbols:more-up"
              width={32}
              color={color.primary.main}
            />
          </Box>
          <Tooltip label={name} disabled={!name}>
            <Text fw="bold" lineClamp={2}>
              {name}
            </Text>
          </Tooltip>
        </div>

        <Tooltip label={description} disabled={!description}>
          <Text size="xs" lineClamp={3}>
            {description}
          </Text>
        </Tooltip>

        <Text fw="bold" size="xs" className="text-primary-main">
          {type}
        </Text>

        <div className="flex items-center gap-1 text-base-darkGray">
          <Icon icon="mdi:date-range" width={16} />
          <Text size="xs">{year || '-'}</Text>
          <Divider orientation="vertical" mx={2} />
          <Icon
            icon="material-symbols:library-books-outline"
            width={16}
          />
          <Text size="xs">{category}</Text>
        </div>

        <div className="flex items-center gap-1">
          <ProfilePicture alt="entity" name={entity} />
          <Tooltip label={entity} disabled={!entity}>
            <Text
              size="sm"
              className="text-base-darkGray"
              lineClamp={1}
            >
              {entity}
            </Text>
          </Tooltip>
        </div>

        {status && (
          <Card.Section className="mt-4 border-t px-4 pt-3">
            <Badge
              variant="light-border"
              color={innovationStatus[status as string].color}
              size="lg"
              radius="sm"
              tt="none"
              className="font-medium"
            >
              <div className="flex items-center gap-1">
                {innovationStatus[status as string].label}
                {status === 'submission' && (
                  <Tooltip
                    label="Anda telah menyampaikan ide dan tersimpan di database Admin Inovasi"
                    classNames={{
                      tooltip:
                        'max-w-[260px] whitespace-pre-line text-center',
                    }}
                  >
                    <Icon
                      icon="material-symbols:info-outline"
                      width={16}
                    />
                  </Tooltip>
                )}
              </div>
            </Badge>
          </Card.Section>
        )}
      </Card>
    </Link>
  );
}
