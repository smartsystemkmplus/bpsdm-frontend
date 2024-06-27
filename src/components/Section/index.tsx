import { Divider, Group, Title } from '@mantine/core';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  rightSide?: ReactNode;
  footer?: ReactNode;
  title: string;
  classNames?: { root?: string; wrapper?: string; footer?: string };
  withBorder?: boolean;
  withHeader?: boolean;
  withFooter?: boolean;
}

export default function Section({
  title,
  children,
  footer,
  rightSide,
  className,
  classNames,
  withBorder = true,
  withHeader = true,
  withFooter = false,
  ...rest
}: SectionProps) {
  return (
    <section
      className={twMerge(
        'rounded-md',
        withBorder && 'border',
        className,
        classNames?.root
      )}
      {...rest}
    >
      {withHeader && (
        <div>
          <Group
            justify="space-between"
            align="center"
            className="px-5 py-3"
          >
            <Title order={6}>{title}</Title>
            {rightSide}
          </Group>
          <Divider />
        </div>
      )}
      <div className={twMerge('p-5', classNames?.wrapper)}>
        {children}
      </div>
      {withFooter && (
        <div
          className={twMerge(
            'min-h-14 border-t bg-base-highlight p-5',
            classNames?.footer
          )}
        >
          {footer}
        </div>
      )}
    </section>
  );
}
