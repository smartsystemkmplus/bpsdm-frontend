import { Modal } from '@mantine/core';
import { ReactNode } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  width?: number | string;
  title?: string;
  classNameBody?: string;
}

export default function BaseModalTemplate({
  isOpen,
  handleClose,
  children,
  width = '40vw',
  title,
  classNameBody,
}: BaseModalProps) {
  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size={width}
      centered
      padding={0}
      overlayProps={{ opacity: 0.1 }}
      transitionProps={{ duration: 300 }}
      radius="md"
      classNames={{
        body: classNameBody ?? 'p-6',
        title: 'ml-4 text-sm font-semibold',
      }}
      zIndex={50}
      title={title}
    >
      {children}
    </Modal>
  );
}
