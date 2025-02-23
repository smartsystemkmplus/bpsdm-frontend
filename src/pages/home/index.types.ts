import { StrapiData, StrapiPagination } from '@hooks/useNetworks';
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

export interface BlogFolderAttribute {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  subFolders: { data: BlogSubFolderAttribute[] };
}
export interface BlogFolder {
  data: StrapiData<BlogFolderAttribute>;
}
export interface BlogSubFolderAttribute {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  folder: BlogFolder;
}
export interface BlogSubFolder {
  data: StrapiData<BlogSubFolderAttribute>;
}

export interface BlogAttribute {
  view_count?: number;
  content: BlocksContent;
  category: BlogCategory;
  title: string;
  slug: string;
  thumbnail: Media;
  thumbnail_large: Media;
  subFolder: BlogSubFolder;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}
export interface Blog {
  id: number;
  data: StrapiData<BlogAttribute>;
}
export interface BlogListData {
  blogs: BlogAttribute[];
  pagination: StrapiPagination;
}

export interface PodcastEpisodeAttribute {
  id: number;
  episode: number;
  title: string;
  url: string;
  /** Date formatted in ISO String */
  date: string;
}

export interface PodcastEpisode {
  data: StrapiData<PodcastEpisodeAttribute>[];
}

export interface PodcastAttribute {
  name: string;
  description: string;
  thumbnail: Media;
  podcast_episodes: PodcastEpisode;
}
export interface Podcast {
  data: StrapiData<PodcastAttribute>[];
}

export interface PodcastDetailData
  extends Omit<PodcastAttribute, 'podcast_episodes'> {
  podcast_episodes: PodcastEpisodeAttribute[];
}

export interface LandingAttribute {
  banner: Media;
  highlightedBlog: Blog;
  highlightedPodcasts: Podcast;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}

export interface SimdiklatAttribute {
  thumbnail: Media;
  url: string;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}

export interface CarouselAttribute {
  image: Media;
  url: string;
}

export interface CarouselListData {
  items: CarouselAttribute[];
  pagination: StrapiPagination;
}

export interface OtherLinkAttribute {
  thumbnail: Media;
  url: string;
}

export interface OtherLinkListData {
  items: OtherLinkAttribute[];
  pagination: StrapiPagination;
}
