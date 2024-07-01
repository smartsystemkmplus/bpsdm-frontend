import { StrapiData } from '@hooks/useNetworks';
import { BlogAttribute } from '@pages/home/index.types';

export interface FolderAttribute {
  name: string;
  subFolders?: { data: StrapiData<FolderAttribute>[] };
  blogs?: { data: StrapiData<BlogAttribute>[] };
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
