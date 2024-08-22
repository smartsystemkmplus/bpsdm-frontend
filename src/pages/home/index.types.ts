import { StrapiData, StrapiPagination } from '@hooks/useNetworks';
import { Folder } from '@pages/km-news/index.types';
import { BlocksContent } from '@strapi/blocks-react-renderer';

type Format = string | 'large' | 'small' | 'medium' | 'thumbnail';
export interface MediaFormat {
  [key: Format]: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  };
}
export interface MediaAttribute {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: MediaFormat;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
export interface Media {
  data: StrapiData<MediaAttribute>;
}

export interface BlogCategoryAttribute {
  name: string;
  slug: string;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
export interface BlogCategory {
  data: StrapiData<BlogCategoryAttribute>;
}

export interface BlogAttribute {
  content: BlocksContent;
  category: BlogCategory;
  title: string;
  slug: string;
  thumbnail: Media;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
export interface Blog {
  data: StrapiData<BlogAttribute>;
}
export interface BlogListData {
  blogs: BlogAttribute[];
  pagination: StrapiPagination;
}

export interface LandingAttribute {
  banner: Media;
  highlightedBlog: Blog;
  highlightedFolder: Folder;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
