import BlogCard from '@components/Cards/BlogCard';
import HomeLayout from '@components/Layouts/HomeLayout';
import ProfilePicture from '@components/ProfilePicture';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Grid, Group, Skeleton, Stack } from '@mantine/core';
import { BASE_PROXY, STRAPI_ENDPOINT } from '@services/api/endpoint';
import {
  BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer';
import shortenStrapiRTEContent from '@utils/shortenStrapiRTEContent';
import strapiBaseURL from '@utils/strapiBaseURL';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  BlogAttribute,
  BlogListData,
  LandingAttribute,
} from './index.types';

interface HighlightBlogProps {
  slug?: string;
  title?: string;
  content?: BlocksContent;
  thumbnailUrl?: string;
}
function HighlightBlog({
  slug,
  title,
  content,
  thumbnailUrl,
}: HighlightBlogProps) {
  return (
    <a
      href={`/km-news/${slug}`}
      className="relative flex h-[480px] items-end rounded-md"
    >
      <img
        alt="highlight"
        src={thumbnailUrl}
        className="absolute z-[1] h-[480px] w-full rounded-md object-cover"
      />
      <div className="z-[2] flex w-full flex-col gap-2 rounded-b-md bg-base-black/60 p-6 text-base-white">
        <h3 className="line-clamp-1 break-all text-2xl font-semibold">
          {title}
        </h3>
        <p className="line-clamp-1 break-all text-sm">
          {!!content && (
            <BlocksRenderer
              content={shortenStrapiRTEContent(content)}
            />
          )}
        </p>
      </div>
    </a>
  );
}

interface ProgramItemProps {
  title: string;
  imageUrl?: string;
}
function ProgramItem({ title, imageUrl }: ProgramItemProps) {
  return (
    <Stack align="center">
      <ProfilePicture
        alt="title"
        imageUrl={imageUrl}
        name={title}
        size={200}
      />
      <p className="font-bold">{title}</p>
    </Stack>
  );
}

const PAGE_SIZE = 6;

export default function Home() {
  const { query } = useNetworks(BASE_PROXY.strapi);

  const { data: dataLanding, isLoading: isLoadingLanding } = query<
    GenericQueryResponse<StrapiData<LandingAttribute>>,
    LandingAttribute
  >(
    STRAPI_ENDPOINT.GET.landingPage,
    {
      queryKey: ['landingPage'],
      select: (res) => res?.data?.attributes,
    },
    {
      params: {
        populate: 'deep',
      },
    }
  );

  const dataHighlightedBlog = useMemo(() => {
    if (dataLanding) {
      return dataLanding.highlightedBlog.data.attributes;
    }
    return null;
  }, [dataLanding]);

  const dataBanner = useMemo(() => {
    if (dataLanding) {
      return dataLanding.banner.data.attributes;
    }
    return null;
  }, [dataLanding]);

  const { data, isLoading } = query<
    GenericQueryResponse<StrapiData<BlogAttribute>[]>,
    BlogListData
  >(
    STRAPI_ENDPOINT.GET.blogs,
    {
      queryKey: ['blogs-home'],
      select: (res) => ({
        blogs: res?.data?.map((d) => d?.attributes),
        pagination: res!.meta!.pagination!,
      }),
    },
    {
      params: {
        populate: 'deep',
        'pagination[page]': 1,
        'pagination[pageSize]': PAGE_SIZE,
      },
    }
  );

  const gridSpan = useMemo(() => {
    if (!data) return 12;
    if (data.blogs.length === 1) return 12;
    if (data.blogs.length === 2) return 6;
    return 4;
  }, [data]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        {isLoadingLanding ? (
          <Skeleton h={152} />
        ) : (
          <img
            alt="hero-banner"
            src={strapiBaseURL(dataBanner?.url)}
            className="h-[152px] rounded-md border"
          />
        )}

        {isLoadingLanding ? (
          <Skeleton h={480} />
        ) : (
          <HighlightBlog
            slug={dataHighlightedBlog?.slug}
            title={dataHighlightedBlog?.title}
            content={dataHighlightedBlog?.content}
            thumbnailUrl={strapiBaseURL(
              dataHighlightedBlog?.thumbnail?.data?.attributes?.url
            )}
          />
        )}

        <section className="flex flex-col gap-6">
          <Grid gutter={24}>
            {isLoading ? (
              <>
                <Grid.Col span={4}>
                  <Skeleton h={376} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Skeleton h={376} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Skeleton h={376} />
                </Grid.Col>
              </>
            ) : (
              data?.blogs.map((blog) => (
                <Grid.Col key={blog.slug} span={gridSpan}>
                  <BlogCard
                    slug={blog.slug}
                    category={blog.category.data.attributes.name}
                    title={blog.title}
                    content={blog.content}
                    createdAt={blog.createdAt}
                    thumbnailUrl={strapiBaseURL(
                      blog.thumbnail.data.attributes.url
                    )}
                  />
                </Grid.Col>
              ))
            )}
          </Grid>

          {(data?.pagination?.total || 0) > PAGE_SIZE && (
            <Link
              to="/km-news"
              className="text-center text-primary-main"
            >
              Lihat Semua
            </Link>
          )}
        </section>

        <section className="mt-[72px] flex flex-col gap-[72px]">
          <h2 className="text-center text-2xl font-bold">
            Program Knowledge Sharing
          </h2>
          <Group justify="space-evenly">
            <ProgramItem title="Podcast Rabu Belajar" />
            <ProgramItem title="Kopi Sedap BPKD" />
            <ProgramItem title="Webinar Series" />
          </Group>
        </section>
      </div>
    </HomeLayout>
  );
}
