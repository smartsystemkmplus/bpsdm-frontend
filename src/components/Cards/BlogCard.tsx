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
  thumbnailUrl: string;
}
export default function BlogCard({
  slug,
  category,
  title,
  content,
  createdAt,
  thumbnailUrl,
}: BlogCardProps) {
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
      <p className="text-sm font-semibold text-primary-main">
        {category}
      </p>
      <p className="line-clamp-2 font-bold">{title}</p>
      <div className="line-clamp-2 [&>*]:!text-sm [&>*]:!font-normal">
        <BlocksRenderer content={shortenStrapiRTEContent(content)} />
      </div>
      <p className="text-sm text-base-darkGray">
        {dayjs(createdAt).format('D MMMM YYYY')}
      </p>
    </a>
  );
}
