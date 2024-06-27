import { FileWithPath } from '@mantine/dropzone';

export interface Accept {
  [key: string]: string[];
}

export interface FileWithURL extends FileWithPath {
  id?: number;
  url?: string;
}

export interface FileFromServer {
  file_id: number;
  name?: string;
  size?: number | null;
  url?: string;
  createdAt?: Date | string;
  /** A three or four-letter code that appears at the end of a filename and indicates the type of file it is. */
  extension?: string;
  type?: string;
}
