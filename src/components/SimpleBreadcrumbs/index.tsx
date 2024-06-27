import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import getPathWithSearchParams from '@utils/getPathWithSearchParams';

export type Crumb = {
  title: string;
  href: string;
};

interface SimpleBreadcrumbsProps {
  crumbs: Crumb[];
}

export default function SimpleBreadcrumbs({
  crumbs,
}: SimpleBreadcrumbsProps) {
  return (
    <Breadcrumbs
      classNames={{
        root: 'p-3',
        breadcrumb: 'font-medium',
      }}
      separatorMargin="xs"
      separator={
        <Icon
          icon="ic:round-chevron-right"
          width={24}
          color={color.base.gray}
        />
      }
    >
      {crumbs.map((item) => {
        if (getPathWithSearchParams() !== item.href) {
          return (
            <Anchor
              href={item.href}
              key={item.href}
              className="text-base-darkGray hover:text-primary-hover hover:no-underline"
            >
              {item.title}
            </Anchor>
          );
        }
        return (
          <Text key={item.href} className="text-primary-main">
            {item.title}
          </Text>
        );
      })}
    </Breadcrumbs>
  );
}
