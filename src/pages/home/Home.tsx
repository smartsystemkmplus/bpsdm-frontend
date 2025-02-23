import BlogCard from '@components/Cards/BlogCard';
import HomeLayout from '@components/Layouts/HomeLayout';
import NoData from '@components/NoData';
import ProfilePicture from '@components/ProfilePicture';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  ActionIcon,
  Button,
  Grid,
  Loader,
  Skeleton,
  Stack,
} from '@mantine/core';
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
  STRAPI_ENDPOINT,
} from '@services/api/endpoint';
import cn from '@utils/cn';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

import {
  BlogAttribute,
  BlogListData,
  CarouselAttribute,
  CarouselListData,
  LandingAttribute,
  OtherLinkAttribute,
  OtherLinkListData,
} from './index.types';

// interface HighlightBlogProps {
//   slug?: string;
//   title?: string;
//   category?: string;
//   content?: BlocksContent;
//   thumbnailUrl?: string;
// }
// function HighlightBlog({
//   slug,
//   title,
//   category,
//   content,
//   thumbnailUrl,
// }: HighlightBlogProps) {
//   return (
//     <a
//       href={
//         category === 'Berita KM'
//           ? `/km-news/${slug}`
//           : `/knowledge-center/${slug}`
//       }
//       className="relative flex h-[480px] items-end rounded-md"
//     >
//       <img
//         alt="highlight"
//         src={thumbnailUrl}
//         className="absolute z-[1] h-[480px] w-full rounded-md object-cover"
//       />
//       <div className="z-[2] flex w-full flex-col gap-2 rounded-b-md bg-base-black/60 p-6 text-base-white">
//         <h3 className="line-clamp-1 break-all text-2xl font-semibold">
//           {title}
//         </h3>
//         <p className="line-clamp-1 break-all text-sm">
//           {!!content && (
//             <BlocksRenderer
//               content={shortenStrapiRTEContent(content)}
//             />
//           )}
//         </p>
//       </div>
//     </a>
//   );
// }

interface ProgramItemProps {
  id: number;
  title: string;
  imageUrl?: string;
  loading?: boolean;
}
function ProgramItem({
  id,
  title,
  imageUrl,
  loading,
}: ProgramItemProps) {
  const href = `/km-news?pod=${id}`;
  return (
    <Stack align="center">
      {loading ? (
        <Skeleton w={200} h={200} radius={100} />
      ) : (
        <Link to={href}>
          <ProfilePicture
            alt={title}
            imageUrl={imageUrl}
            name={title}
            size={200}
          />
        </Link>
      )}
      {loading ? (
        <Skeleton w={200} h={16} mb={9} />
      ) : (
        <Link to={href}>
          <p className="font-bold hover:text-primary-main hover:underline">
            {title}
          </p>
        </Link>
      )}
    </Stack>
  );
}

const PAGE_SIZE = 6;

export default function Home() {
  const navigate = useNavigate();

  const { query } = useNetworks(BASE_PROXY.strapi);
  const { query: seQuery } = useNetworks(BASE_PROXY.searchEngine);

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

  const { data: dataOtherLinks, isLoading: isLoadingOtherLinks } =
    query<
      GenericQueryResponse<StrapiData<OtherLinkAttribute>[]>,
      OtherLinkListData
    >(
      STRAPI_ENDPOINT.GET.otherLinks,
      {
        queryKey: ['otherLinks'],
        select: (res) => ({
          items: res?.data?.map((d) => d?.attributes),
          pagination: res!.meta!.pagination!,
        }),
      },
      {
        params: {
          populate: 'deep',
        },
      }
    );

  const { data: dataCarousel, isLoading: isLoadingCarousel } = query<
    GenericQueryResponse<StrapiData<CarouselAttribute>[]>,
    CarouselListData
  >(
    STRAPI_ENDPOINT.GET.carousel,
    {
      queryKey: ['carousel'],
      select: (res) => ({
        items: res?.data?.map((d) => d?.attributes),
        pagination: res!.meta!.pagination!,
      }),
    },
    {
      params: {
        populate: 'deep',
      },
    }
  );

  // const dataHighlightedBlog = useMemo(() => {
  //   if (dataLanding) {
  //     return dataLanding?.highlightedBlog?.data?.attributes;
  //   }
  //   return null;
  // }, [dataLanding]);

  const dataBanner = useMemo(() => {
    if (dataLanding) {
      return dataLanding?.banner?.data?.attributes;
    }
    return null;
  }, [dataLanding]);

  const dataHighlightedPodcast = useMemo(() => {
    if (dataLanding) {
      return dataLanding?.highlightedPodcasts?.data?.map(
        (podcast) => ({
          id: podcast.id,
          ...podcast.attributes,
        })
      );
    }
    return null;
  }, [dataLanding]);

  const {
    data: blogData,
    isLoading,
    isFetching,
  } = seQuery<
    GenericQueryResponse<StrapiData<BlogAttribute>[]>,
    BlogListData
  >(
    SEARCH_ENGINE_ENDPOINT.GET.blogs,
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
        sort: 'publishedAt:desc',
        page: 1,
        pageSize: PAGE_SIZE,
      },
    }
  );

  const gridSpan = useMemo(() => {
    if (!blogData) return 12;
    if (blogData.blogs.length === 1) return 12;
    if (blogData.blogs.length === 2) return 6;
    return 4;
  }, [blogData]);

  const podcastGridSpan = useMemo(() => {
    if (!dataHighlightedPodcast) return 5;
    return 1;
  }, [dataHighlightedPodcast]);

  return (
    <HomeLayout className="px-0">
      <div className="flex flex-col gap-12">
        <section className="px-16">
          {isLoadingLanding ? (
            <Skeleton h={152} />
          ) : (
            <img
              alt="hero-banner"
              src={dataBanner?.url}
              className="aspect-[16/2] w-full rounded-md border"
            />
          )}
        </section>

        <section className="px-16">
          {isLoadingCarousel ? (
            <Skeleton h={480} />
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={
                (dataCarousel?.items?.length || 0) > 4
                  ? 4
                  : dataCarousel?.items?.length
              }
              loop
              pagination={{ clickable: true }}
              navigation
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
            >
              {dataCarousel?.items?.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <SwiperSlide key={`carousel-${i}`}>
                  <a
                    href={item?.url}
                    className="flex aspect-[3/1] items-end rounded-md"
                  >
                    <img
                      alt="thumbnail"
                      src={
                        item?.image?.data?.attributes?.previewUrl ||
                        item?.image?.data?.attributes?.url
                      }
                      className="aspect-[3/1] w-full rounded-md object-cover"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            // <HighlightBlog
            //   slug={dataHighlightedBlog?.slug}
            //   title={dataHighlightedBlog?.title}
            //   category={
            //     dataHighlightedBlog?.category?.data?.attributes?.name
            //   }
            //   content={dataHighlightedBlog?.content}
            //   thumbnailUrl={
            //     dataHighlightedBlog?.thumbnail_large?.data?.attributes
            //       ?.url ||
            //     dataHighlightedBlog?.thumbnail?.data?.attributes?.url
            //   }
            // />
          )}
        </section>

        <section className="grid grid-cols-3 items-center">
          <div className="h-4 bg-primary-main" />
          <h2 className="text-center text-2xl font-bold text-primary-main">
            Berita dan Asset Pengetahuan
          </h2>
          <div className="h-4 bg-primary-main" />
        </section>

        <section className="flex flex-col gap-6 px-16">
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
              ((blogData?.blogs || []) as BlogAttribute[]).map(
                (blog) => (
                  <Grid.Col key={blog.slug} span={gridSpan}>
                    <BlogCard
                      slug={blog.slug}
                      category={
                        blog?.category?.data?.attributes?.name || '-'
                      }
                      title={blog.title}
                      content={blog.content}
                      createdAt={blog.createdAt}
                      thumbnailUrl={
                        blog.thumbnail.data.attributes.url
                      }
                      viewCount={blog?.view_count || 0}
                    />
                  </Grid.Col>
                )
              )
            )}
          </Grid>

          {(blogData?.pagination?.total || 0) > PAGE_SIZE && (
            <Button
              className="w-full"
              loading={isFetching}
              onClick={() => navigate('/news-and-assets')}
            >
              Lihat Semua
            </Button>
          )}
        </section>

        <section className="grid grid-cols-3 items-center">
          <div className="h-4 bg-primary-main" />
          <h2 className="text-center text-2xl font-bold text-primary-main">
            Pembelajaran Mandiri
          </h2>
          <div className="h-4 bg-primary-main" />
        </section>

        <section className="mt-[72px] flex flex-col gap-[72px] px-16">
          <Grid gutter={24} columns={5} className="mx-auto">
            {(() => {
              if (isLoadingLanding) {
                return <Loader className="mx-auto" />;
              }

              if (dataHighlightedPodcast?.length) {
                return dataHighlightedPodcast?.map((p) => (
                  <Grid.Col span={podcastGridSpan}>
                    <ProgramItem
                      id={p.id}
                      title={p.name}
                      imageUrl={p.thumbnail.data.attributes.url}
                    />
                  </Grid.Col>
                ));
              }

              return <NoData label="Tidak ditemukan" />;
            })()}
          </Grid>
        </section>

        <section className="grid grid-cols-3 items-center">
          <div className="h-4 bg-primary-main" />
          <h2 className="text-center text-2xl font-bold text-primary-main">
            Link Terkait
          </h2>
          <div className="h-4 bg-primary-main" />
        </section>

        <section className="relative px-28">
          {isLoadingOtherLinks ? (
            <Skeleton h={480} />
          ) : (
            <>
              <ActionIcon
                id="other-link-swiper-prev"
                radius="xl"
                size="lg"
                className="absolute inset-y-1/2 left-12 z-10"
              >
                <Icon
                  icon="material-symbols:chevron-left"
                  width={30}
                />
              </ActionIcon>

              <Swiper
                modules={[Navigation, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={4}
                navigation={{
                  prevEl: '#other-link-swiper-prev',
                  nextEl: '#other-link-swiper-next',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                wrapperClass={cn(
                  'items-center',
                  (dataOtherLinks?.items?.length || 0) < 4
                    ? 'flex justify-center gap-[50px]'
                    : ''
                )}
              >
                {dataOtherLinks?.items?.map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SwiperSlide key={`carousel-links-${i}`}>
                    <a
                      href={item?.url}
                      className="flex aspect-[3/1] items-end justify-center rounded-md"
                    >
                      <img
                        alt="thumbnail"
                        src={
                          item?.thumbnail?.data?.attributes
                            ?.previewUrl ??
                          item?.thumbnail?.data?.attributes?.url
                        }
                        className="w-[220px] rounded-md object-contain"
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>

              <ActionIcon
                id="other-link-swiper-next"
                radius="xl"
                size="lg"
                className="absolute inset-y-1/2 right-12 z-10"
              >
                <Icon
                  icon="material-symbols:chevron-right"
                  width={30}
                />
              </ActionIcon>
            </>
          )}
        </section>
      </div>
    </HomeLayout>
  );
}
