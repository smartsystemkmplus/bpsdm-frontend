import { Icon, IconProps } from '@iconify/react/dist/iconify.js';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface NoDataProps {
  label?: string;
  classNames?: {
    wrapper?: string;
    label?: string;
  };
  /** Override the default icon */
  icon?: ReactNode;

  /** Will be ignored if icon prop exist. */
  iconProps?: IconProps;
}

export default function NoData({
  classNames,
  iconProps,
  icon,
  label = 'Data tidak ditemukan',
}: NoDataProps) {
  return (
    <div
      className={twMerge(
        'text-base-gray font-medium m-auto flex flex-col items-center justify-center gap-3',
        classNames?.wrapper
      )}
    >
      {icon || (
        <Icon
          icon="fluent:target-edit-16-regular"
          width={96}
          {...iconProps}
        />
      )}

      <p className={twMerge('text-sm', classNames?.label)}>{label}</p>
    </div>
  );
}
