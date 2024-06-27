import MODAL_IDS from '@constants/modalIds';
import NiceModal from '@ebay/nice-modal-react';
import { GenericAPIError } from '@hooks/useNetworks';
import { AxiosError } from 'axios';

export default function showErrorDialog(
  error: string | GenericAPIError | AxiosError,
  duration: number = 3000
) {
  NiceModal.show(MODAL_IDS.GENERAL.ERROR, { error });
  setTimeout(() => {
    NiceModal.hide(MODAL_IDS.GENERAL.ERROR);
    setTimeout(() => {
      NiceModal.remove(MODAL_IDS.GENERAL.ERROR);
    }, 500);
  }, duration || 3000);
}
