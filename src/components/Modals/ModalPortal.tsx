import ErrorToast from '@components/Toasts/ErrorToast';
import SuccessToast from '@components/Toasts/SuccessToast';
import MODAL_IDS from '@constants/modalIds';
import { ModalDef } from '@ebay/nice-modal-react';

import Confirmations from './Confirmations';

export default function ModalPortal() {
  return (
    <>
      {/* GENERAL */}
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />
      <ModalDef id={MODAL_IDS.GENERAL.ERROR} component={ErrorToast} />
      <ModalDef
        id={MODAL_IDS.GENERAL.SUCCESS}
        component={SuccessToast}
      />
    </>
  );
}
