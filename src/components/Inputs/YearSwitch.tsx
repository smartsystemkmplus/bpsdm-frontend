import { Icon } from '@iconify/react';
import { ActionIcon, Text } from '@mantine/core';

interface YearSwitchProps {
  value: number;
  onChange: (newValue: number) => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

function YearSwitch({
  value,
  onChange,
  disableNext,
  disablePrev,
}: YearSwitchProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <ActionIcon
        variant="transparent"
        onClick={() => {
          onChange(value - 1);
        }}
        disabled={disablePrev}
      >
        <Icon
          icon="ic:round-chevron-left"
          width={20}
          className={!disablePrev ? 'text-primary-main' : ''}
        />
      </ActionIcon>
      <Text className="mt-0.5 text-sm font-semibold text-primary-main">
        {value}
      </Text>
      <ActionIcon
        variant="transparent"
        onClick={() => {
          onChange(value + 1);
        }}
        disabled={disableNext}
      >
        <Icon
          icon="ic:round-chevron-right"
          width={20}
          className={!disableNext ? 'text-primary-main' : ''}
        />
      </ActionIcon>
    </div>
  );
}

export default YearSwitch;
