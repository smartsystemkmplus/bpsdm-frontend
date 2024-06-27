import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MantineSize, Text, Tooltip } from '@mantine/core';
import mantineSizeToPx from '@utils/mantineSizeToPx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextTooltipProps {
  justifyBetween?: boolean;
  label?: string;
  size?: MantineSize;
  children: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    text?: string;
  };
}

export default function TextTooltip({
  children,
  label,
  className,
  classNames,
  size = 'md',
  justifyBetween = false,
}: TextTooltipProps) {
  return (
    <div
      className={twMerge(
        'flex gap-2 items-center',
        justifyBetween && 'justify-between w-full',
        className,
        classNames?.root
      )}
    >
      <Text
        size={size}
        className={twMerge('font-medium', classNames?.text)}
      >
        {children}
      </Text>
      <Tooltip label={label}>
        <Icon
          icon="ph:question-bold"
          color={color.primary.main}
          width={mantineSizeToPx(size) + 2}
          className="shrink-0"
        />
      </Tooltip>
    </div>
  );
}
