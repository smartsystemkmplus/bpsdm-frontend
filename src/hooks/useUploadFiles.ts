import {
  BASE_PROXY,
  REPOSITORY_ENDPOINT,
} from '@services/api/endpoint';
import showErrorDialog from '@utils/showErrorDialog';

import useNetworks, { GenericQueryResponse } from './useNetworks';

export interface UploadedFile {
  status: string;
  file_id: number;
  size: number;
  file_url: string;
}
export type UploadedFileResponse = GenericQueryResponse<UploadedFile>;

export default function useUploadFiles() {
  const { mutation } = useNetworks(BASE_PROXY.repository);
  const { mutateAsync: uploadFile, isPending } =
    mutation<UploadedFileResponse>('post');

  const uploadFiles = async (files: File[]) => {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      return uploadFile({
        endpoint: REPOSITORY_ENDPOINT.POST.file,
        data: formData,
      })
        .then((res) => res.data)
        .catch((err) => showErrorDialog(err));
    });
    return Promise.all(promises).then((res) => res);
  };

  return { isPending, uploadFiles };
}
