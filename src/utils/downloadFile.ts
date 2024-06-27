import { MIME_TYPES } from '@mantine/dropzone';
import axios, { AxiosRequestConfig } from 'axios';
import fileDownload from 'js-file-download';
import _ from 'lodash';

import getFileExtension from './getFileExtension';
import showErrorDialog from './showErrorDialog';

export default function downloadFile(
  url: string,
  filename?: string,
  axiosConfigs?: AxiosRequestConfig
) {
  axios
    .get(url, {
      responseType: 'blob',
      ...axiosConfigs,
    })
    .then((res) => {
      const contentType = res?.headers?.['content-type'];
      const fileExt = _.findKey(
        MIME_TYPES,
        (o: string) => o === contentType
      );

      const formattedFilename = filename?.replace(
        `.${getFileExtension(filename)}`,
        ''
      );

      fileDownload(
        res.data,
        !formattedFilename
          ? res.headers['content-disposition']
              .split(';')[1]
              .split('=')[1]
              .split(`"`)[1]
          : `${formattedFilename}.${fileExt}`
      );
    })
    .catch((err) => {
      showErrorDialog(err);
    });
}
