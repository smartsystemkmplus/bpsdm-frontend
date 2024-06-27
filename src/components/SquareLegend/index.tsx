import { Loader, Text } from '@mantine/core';

interface SquareLegendProps {
  label?: string;
  value?: number | string;
  withValue?: boolean;
  color?: string;
  loading?: boolean;
}

export default function SquareLegend({
  label,
  value,
  loading,
  withValue = true,
  color = '#444',
}: SquareLegendProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="size-4 shrink-0 rounded-[5px]"
          style={{ backgroundColor: color }}
        />
        <Text className="font-medium">{label}</Text>
      </div>
      {loading && <Loader size={16} />}
      {!loading && withValue && (
        <Text fw="bold" className="text-primary-main">
          {typeof value === 'number' || typeof value === 'string'
            ? value
            : '-'}
        </Text>
      )}
    </div>
  );
}
