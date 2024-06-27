import { Icon } from '@iconify/react';
import { ActionIcon, Modal, Title } from '@mantine/core';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionModalTemplateProps {
  isOpen: boolean;
  handleClose: () => void;
  withCloseButton?: boolean;
  withFooter?: boolean;
  title: string;
  footerElement?: ReactNode;
  children: ReactNode;
  height?: number | string;
  width?: number | string;
  classNames?: {
    modal?: string;
    body?: string;
  };
}

export default function SectionModalTemplate({
  isOpen,
  handleClose,
  withCloseButton = true,
  withFooter = true,
  title,
  footerElement,
  children,
  height = '30vh',
  width = '40vw',
  classNames = {
    modal: '',
    body: '',
  },
}: SectionModalTemplateProps) {
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
      classNames={{ header: 'hidden', content: classNames.modal }}
      zIndex={50}
      closeOnClickOutside={false}
    >
      <div className="flex items-center justify-between border-b px-5 py-3">
        <Title order={6} ff="text">
          {title}
        </Title>
        {withCloseButton && (
          <ActionIcon onClick={handleClose} variant="transparent">
            <Icon
              icon="bi:x"
              className="text-base-darkGray"
              width={30}
            />
          </ActionIcon>
        )}
      </div>

      <div
        style={{ maxHeight: height }}
        className={clsx(
          'overflow-y-auto scroll-smooth',
          classNames.body
        )}
      >
        {children}
      </div>
      {withFooter && (
        <div className="flex w-full justify-end gap-3 rounded-b-md border-t bg-base-highlight p-5">
          {footerElement}
        </div>
      )}
    </Modal>
  );
}
