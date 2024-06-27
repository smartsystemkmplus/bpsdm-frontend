import UploadIcon from '@components/svg/UploadIcon';
import { Text } from '@mantine/core';

interface DescriptionProps {
  description?: string;
  subDescription?: string;
}

export default function Description({
  description,
  subDescription,
}: DescriptionProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <UploadIcon />
      <Text
        size="xl"
        inline
        className="mt-4 text-center font-semibold"
      >
        {description || (
          <>
            Letakkan file di sini atau{' '}
            <span className="text-primary-main">Cari File</span>
          </>
        )}
      </Text>
      <Text
        inline
        className="m-2 text-center font-light text-base-darkGray"
      >
        {subDescription}
      </Text>
    </div>
  );
}
