import { ComboboxItem } from '@mantine/core';

import color from '../constants/color';

export const innovationStatus: Record<
  string,
  Record<string, string>
> = {
  submission: {
    label: 'Penyampaian Ide',
    color: color.info.main,
  },
  'waiting-approval': {
    label: 'Menunggu Persetujuan',
    color: color.warning.main,
  },
  declined: { label: 'Ide Ditolak', color: color.danger.main },
  accepted: { label: 'Ide Diterima', color: color.success.main },
  'mentoring-period': {
    label: 'Periode Mentoring',
    color: color.info.main,
  },
};

/**
 * A utility function to get innovation status items for Mantine's Select component
 *
 * @param excludes - List of keys to be excluded in returned value
 */

export const getInnovationStatusSelectData = (excludes: string[]) => {
  const result: ComboboxItem[] = [];
  Object.keys(innovationStatus).forEach((key) => {
    if (!excludes.includes(key)) {
      result.push({ value: key, label: innovationStatus[key].label });
    }
  });
  return result;
};
