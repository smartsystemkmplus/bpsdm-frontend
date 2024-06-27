import MODAL_IDS from '@constants/modalIds';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { GenericAPIError } from '@hooks/useNetworks';
import { Icon } from '@iconify/react';
import { Dialog } from '@mantine/core';
import { AxiosError } from 'axios';

interface ErrorToastProps {
  error: string | GenericAPIError | AxiosError;
}

const ErrorToast = NiceModal.create(({ error }: ErrorToastProps) => {
  const modal = useModal(MODAL_IDS.GENERAL.ERROR);

  return (
    <Dialog
      opened={modal.visible}
      withCloseButton
      onClose={modal.hide}
      position={{ bottom: 20, left: 75 }}
      transitionProps={{
        duration: 250,
        transition: 'slide-up',
      }}
      classNames={{
        root: 'flex items-center gap-4',
        closeButton: 'my-1',
      }}
    >
      <Icon
        icon="bx:error-circle"
        color="red"
        width={35}
        className="shrink-0"
      />
      <div className="flex flex-col">
        <span className="mr-5 text-sm text-danger-main">
          {(() => {
            if (typeof error === 'string') return error;
            if ((error as GenericAPIError)?.response?.data?.message) {
              return (
                error as GenericAPIError
              )?.response?.data?.message
                ?.split('\n')
                ?.map((e) => (
                  <>
                    {e}
                    <br />
                  </>
                ));
            }
            return (error as AxiosError)?.message
              ?.split('\n')
              ?.map((e) => (
                <>
                  {e}
                  <br />
                </>
              ));
          })()}
        </span>
      </div>
    </Dialog>
  );
});

export default ErrorToast;
