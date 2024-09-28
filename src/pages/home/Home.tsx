import BlogCard from '@components/Cards/BlogCard';
import HomeLayout from '@components/Layouts/HomeLayout';
import NoData from '@components/NoData';
import ProfilePicture from '@components/ProfilePicture';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Button, Grid, Loader, Skeleton, Stack } from '@mantine/core';
import { BASE_PROXY, STRAPI_ENDPOINT } from '@services/api/endpoint';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  SimdiklatAttribute,
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

  const { data: dataSimdiklat, isLoading: isLoadingSimdiklat } =
    query<
      GenericQueryResponse<StrapiData<SimdiklatAttribute>>,
      SimdiklatAttribute
    >(
      STRAPI_ENDPOINT.GET.simdiklat,
      {
        queryKey: ['simdiklat'],
        select: (res) => res?.data?.attributes,
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
              className="aspect-[16/2] rounded-md border"
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
              slidesPerView={1}
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
                    className="flex h-[480px] items-end rounded-md"
                  >
                    <img
                      alt="thumbnail"
                      src={
                        item?.image?.data?.attributes?.previewUrl ||
                        item?.image?.data?.attributes?.url
                      }
                      className="h-[480px] w-full rounded-md object-cover"
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
              data?.blogs.map((blog) => (
                <Grid.Col key={blog.slug} span={gridSpan}>
                  <BlogCard
                    slug={blog.slug}
                    category={blog.category.data.attributes.name}
                    title={blog.title}
                    content={blog.content}
                    createdAt={blog.createdAt}
                    thumbnailUrl={blog.thumbnail.data.attributes.url}
                  />
                </Grid.Col>
              ))
            )}
          </Grid>

          {(data?.pagination?.total || 0) > PAGE_SIZE && (
            <Link to="/km-news" className="text-center">
              <Button className="w-full">Lihat Semua</Button>
            </Link>
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
            SIMDIKLAT
          </h2>
          <div className="h-4 bg-primary-main" />
        </section>

        <section className="flex items-center justify-center gap-[72px] px-16">
          {isLoadingSimdiklat ? (
            <Skeleton w={200} h={120} />
          ) : (
            <a href={dataSimdiklat?.url}>
              <img
                alt="simdiklat"
                src={
                  dataSimdiklat?.thumbnail?.data?.attributes
                    ?.previewUrl ||
                  dataSimdiklat?.thumbnail?.data?.attributes?.url
                }
                className="h-[120px]"
              />
            </a>
          )}
        </section>
      </div>
    </HomeLayout>
  );
}
