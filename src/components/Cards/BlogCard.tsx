import {
  BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer';
import shortenStrapiRTEContent from '@utils/shortenStrapiRTEContent';
import dayjs from 'dayjs';

interface BlogCardProps {
  slug: string;
  category: string;
  title: string;
  content: BlocksContent;
  /** Date formatted in ISO String. */
  createdAt: string;
  viewCount: number;
  thumbnailUrl: string;
  folder?: string;
  subFolder?: string;
  subFolderIds?: number[];
}
export default function BlogCard({
  slug,
  category,
  title,
  content,
  createdAt,
  viewCount,
  thumbnailUrl,
  folder,
  subFolder,
  subFolderIds,
}: BlogCardProps) {
  const categoryLabel = (() => {
    if (folder || subFolder) {
      return `${folder || ''} - ${subFolder || ''}`;
    }
    return category;
  })();

  const categoryHref = (() => {
    if (!folder && !subFolder && !subFolderIds?.length) {
      if (category === 'Knowledge Center') {
        return '/knowledge-center';
      }
      return '/km-news';
    }

    const idCount = subFolderIds?.length || 0;
    if (idCount === 1) {
      return `/knowledge-center?f=${subFolderIds![0]}`;
    }
    if (idCount > 1) {
      return `/knowledge-center?f=parent-${subFolderIds!.join(',')}`;
    }
    return undefined;
  })();

  return (
    <a
      href={
        category === 'Berita KM'
          ? `/km-news/${slug}`
          : `/knowledge-center/${slug}`
      }
      className="relative flex h-fit min-h-[376px] flex-col gap-3"
    >
      <img
        alt={slug}
        src={thumbnailUrl}
        className="z-[2] aspect-[10/5] w-full object-cover"
        loading="lazy"
      />
      <img
        alt={slug}
        src="/placeholder.png"
        className="absolute z-[1] aspect-[10/5] w-full object-cover"
        loading="lazy"
      />

      <a
        href={categoryHref}
        className="text-sm font-semibold text-primary-main"
      >
        {categoryLabel}
      </a>

      <p className="line-clamp-2 font-bold">{title}</p>
      <div className="line-clamp-2 [&>*]:!text-sm [&>*]:!font-normal">
        <BlocksRenderer content={shortenStrapiRTEContent(content)} />
      </div>
      <p className="text-sm text-base-darkGray">
        {dayjs(createdAt).format('D MMMM YYYY')} | Dilihat {viewCount}{' '}
        kali
      </p>
    </a>
  );
}
