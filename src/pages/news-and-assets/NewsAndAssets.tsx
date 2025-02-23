import BlogCard from '@components/Cards/BlogCard';
import HomeLayout from '@components/Layouts/HomeLayout';
import NoData from '@components/NoData';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Grid, Pagination, Skeleton, Stack } from '@mantine/core';
import { BlogAttribute, BlogListData } from '@pages/home/index.types';
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
} from '@services/api/endpoint';
import { useEffect, useState } from 'react';

function BlogsSkeleton() {
  return (
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
  );
}

const PAGE_SIZE = 30;

export default function NewsAndAssets() {
  const [page, setPage] = useState(1);
  const { query } = useNetworks(BASE_PROXY.searchEngine);
  const { data, isLoading } = query<
    GenericQueryResponse<StrapiData<BlogAttribute>[]>,
    BlogListData
  >(
    SEARCH_ENGINE_ENDPOINT.GET.blogs,
    {
      queryKey: ['blogs-news-and-assets', PAGE_SIZE, page],

      select: (res) => ({
        blogs: res?.data?.map((d) => d?.attributes),
        pagination: res!.meta!.pagination!,
      }),
    },
    {
      params: {
        populate: 'deep',
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
      },
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        <Stack gap={24}>
          <h1 className="text-4xl font-bold">
            Berita & Asset Pengetahuan
          </h1>

          <p>
            Menampilkan{' '}
            <span className="font-bold text-primary-main">
              {data?.blogs?.length || 0}
            </span>{' '}
            berita & asset pengetahuan
          </p>
        </Stack>

        {(() => {
          if (isLoading) {
            return (
              <Grid gutter={24}>
                <BlogsSkeleton />
              </Grid>
            );
          }
          if (data?.blogs?.length) {
            return (
              <Grid gutter={24}>
                {data?.blogs?.map((blog) => (
                  <Grid.Col key={blog.slug} span={4}>
                    <BlogCard
                      slug={blog.slug}
                      category={
                        blog?.category?.data?.attributes?.name || '-'
                      }
                      title={blog.title}
                      content={blog.content}
                      createdAt={blog.createdAt}
                      thumbnailUrl={
                        blog.thumbnail?.data?.attributes?.url
                      }
                      folder={
                        blog?.subFolder?.data?.attributes?.folder
                          ?.data?.attributes?.name
                      }
                      subFolder={
                        blog?.subFolder?.data?.attributes?.name
                      }
                      subFolderIds={[blog?.subFolder?.data?.id]}
                      viewCount={blog?.view_count || 0}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            );
          }
          return <NoData label="Data tidak ditemukan" />;
        })()}

        <Pagination
          value={page}
          onChange={setPage}
          total={data?.pagination?.pageCount || 0}
          className="mx-auto"
        />
      </div>
    </HomeLayout>
  );
}
