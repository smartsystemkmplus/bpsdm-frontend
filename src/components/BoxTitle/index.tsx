import { Box, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface BoxTitleProps {
  title: string;
  children: ReactNode;
}

export default function BoxTitle({ title, children }: BoxTitleProps) {
  return (
    <Box className="flex flex-col gap-1 text-sm">
      <Text className="text-base-darkGray">{title}</Text>
      {children}
    </Box>
  );
}
