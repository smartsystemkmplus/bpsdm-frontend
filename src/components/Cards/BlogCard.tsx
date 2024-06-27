import removeHTMLTags from '@utils/removeHTMLTags';
import dayjs from 'dayjs';

interface BlogCardProps {
  slug: string;
  category: string;
  title: string;
  content: string;
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
      href={`/km-news/${slug}`}
      className="relative flex h-[376px] flex-col gap-3"
    >
      <img
        alt={slug}
        src={thumbnailUrl}
        className="z-[2] h-[200px] w-full object-cover"
        loading="lazy"
      />
      <img
        alt={slug}
        src="/placeholder.png"
        className="absolute z-[1] h-[200px] w-full object-cover"
        loading="lazy"
      />
      <p className="text-sm font-semibold text-primary-main">
        {category}
      </p>
      <p className="line-clamp-2 font-bold">{title}</p>
      <p className="line-clamp-2 text-sm">
        {removeHTMLTags(content)}
      </p>
      <p className="text-sm text-base-darkGray">
        {dayjs(createdAt).format('D MMMM YYYY')}
      </p>
    </a>
  );
}
