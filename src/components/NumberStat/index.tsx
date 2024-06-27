import TextTooltip from '@components/TextTooltip';
import { Loader, Text } from '@mantine/core';

interface NumberStatProps {
  value?: number | string;
  title?: string;
  tooltipLabel?: string;
  justifyBetweenTitle?: boolean;
  loading?: boolean;
}

export default function NumberStat({
  value,
  title,
  tooltipLabel,
  justifyBetweenTitle = false,
  loading,
}: NumberStatProps) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TextTooltip
        label={tooltipLabel}
        justifyBetween={justifyBetweenTitle}
        classNames={{ text: 'text-base-darkGray' }}
      >
        {title}
      </TextTooltip>
      {loading ? (
        <Loader size={24} />
      ) : (
        <Text className="text-2xl" fw="bold">
          {typeof value === 'number' || typeof value === 'string'
            ? value
            : '-'}
        </Text>
      )}
    </div>
  );
}
