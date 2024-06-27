import Bp from '@components/svg/Bp';
import Doc from '@components/svg/Doc';
import Gif from '@components/svg/Gif';
import Jpeg from '@components/svg/Jpeg';
import Jpg from '@components/svg/Jpg';
import Kd from '@components/svg/Kd';
import Ll from '@components/svg/Ll';
import Mov from '@components/svg/Mov';
import Mp4 from '@components/svg/Mp4';
import Pdf from '@components/svg/Pdf';
import Png from '@components/svg/Png';
import Ppt from '@components/svg/Ppt';
import Xls from '@components/svg/Xls';
import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MIME_TYPES } from '@mantine/dropzone';
import { ReactNode } from 'react';

// {size} is the size of the icon
// - minus to reduce icon size
// - plus to increase icon size
// {type} is the type of the icon
// ! see the icon component for base size

interface FileTypeIconProps {
  type: string;
  size?: number;
}

export default function FileTypeIcon({
  type,
  size,
}: FileTypeIconProps) {
  const convertedType: string = (() => {
    switch (type?.toLowerCase()) {
      case MIME_TYPES.doc.split('/')[1]:
        return 'doc';
      case MIME_TYPES.docx.split('/')[1]:
        return 'docx';
      case MIME_TYPES.xls.split('/')[1]:
        return 'xls';
      case 'csv':
        return 'xls';
      case MIME_TYPES.xlsx.split('/')[1]:
        return 'xlsx';
      case MIME_TYPES.csv.split('/')[1]:
        return 'xlsx';
      case MIME_TYPES.pdf.split('/')[1]:
        return 'pdf';
      case MIME_TYPES.ppt.split('/')[1]:
        return 'ppt';
      case MIME_TYPES.pptx.split('/')[1]:
        return 'pptx';
      case 'jpg':
        return 'jpg';
      case 'jpeg':
        return 'jpeg';
      case 'jfif':
        return 'jpeg';
      case 'pjp':
        return 'jpeg';
      case 'pjpeg':
        return 'jpeg';
      case 'heic':
        return 'png';
      case 'mp4':
        return 'mp4';
      case 'm4v':
        return 'mp4';
      default:
        return type?.toLowerCase();
    }
  })();

  const comp: Record<string, ReactNode> = {
    ppt: <Ppt size={size} />,
    pptx: <Ppt size={size} />,
    doc: <Doc size={size} />,
    docx: <Doc size={size} />,
    xls: <Xls size={size} />,
    xlsx: <Xls size={size} />,
    pdf: <Pdf size={size} />,
    png: <Png size={size} />,
    jpg: <Jpg size={size} />,
    jpeg: <Jpeg size={size} />,
    gif: <Gif size={size} />,
    mp4: <Mp4 size={size} />,
    mov: <Mov size={size} />,

    // for documentation_category_id
    1: <Kd size={size} />,
    2: <Bp size={size} />,
    3: <Ll size={size} />,
  };

  if (!Object.keys(comp).includes(convertedType)) {
    return (
      <Icon
        icon="pepicons-pencil:file"
        width={93}
        color={color.base.lightGray}
      />
    );
  }

  return comp[convertedType];
}
