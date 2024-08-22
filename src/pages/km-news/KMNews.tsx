import BlogCard from '@components/Cards/BlogCard';
import AsideContentLayout from '@components/Layouts/AsideContentLayout';
import HomeLayout from '@components/Layouts/HomeLayout';
import NestedFolder, {
  NestedFolderItem,
} from '@components/NestedFolder/NestedFolder';
import NoData from '@components/NoData';
import useInfiniteQueryWrapper from '@hooks/useInfiniteQueryWrapper';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Grid, Loader, Skeleton, Stack } from '@mantine/core';
import { BlogAttribute, BlogListData } from '@pages/home/index.types';
import { BASE_PROXY, STRAPI_ENDPOINT } from '@services/api/endpoint';
import strapiBaseURL from '@utils/strapiBaseURL';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FolderAttribute } from './index.types';

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

const PAGE_SIZE = 9;
export default function KMNews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramFolderId = searchParams.get('f');
  const [activeFolder, setActiveFolder] = useState(
    paramFolderId || 'all'
  );
  const [totalData, setTotalData] = useState(0);

  // * Update URL Search Param on folder change
  useEffect(() => {
    searchParams.set('f', activeFolder as string);
    setSearchParams([...searchParams.entries()], { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder]);

  const blogFilterParam = useMemo(() => {
    if (activeFolder === 'all') return {};
    const subFolderIds = activeFolder
      .replace('parent-', '')
      .split(',');
    const result: Record<string, string | null> = {};
    subFolderIds.forEach((subId, i) => {
      const key = `filters[subFolder][id][$in][${i}]`;
      result[key] = subId;
    });
    return result;
  }, [activeFolder]);

  const { query, infiniteQuery } = useNetworks(BASE_PROXY.strapi);
  const { data, isLoading, isFetchingNextPage } =
    useInfiniteQueryWrapper(
      infiniteQuery<
        GenericQueryResponse<StrapiData<BlogAttribute>[]>,
        BlogListData
      >(
        STRAPI_ENDPOINT.GET.blogs,
        {
          queryKey: ['blogs-news', PAGE_SIZE, blogFilterParam],
          initialPageParam: 1,
          getNextPageParam: (lastPage, allPages) => {
            const maxPages =
              lastPage.meta?.pagination?.pageCount || 1;
            const nextPage = allPages.length + 1;
            return nextPage <= Math.ceil(maxPages)
              ? nextPage
              : undefined;
          },
          select: (res) => ({
            blogs: res?.pages
              ?.map((page) => page?.data?.map((d) => d?.attributes))
              .flat(),
            pagination:
              res!.pages[res!.pages.length - 1].meta!.pagination!,
          }),
          onSuccess: (res) => {
            const typedRes = res as GenericQueryResponse<
              StrapiData<BlogAttribute>[]
            >;
            const total = typedRes.meta?.pagination?.total || 0;
            if (total && total >= totalData) {
              setTotalData(total);
            }
          },
        },
        {
          params: {
            populate: 'deep',
            'pagination[pageSize]': PAGE_SIZE,
            ...blogFilterParam,
          },
        }
      )
    );

  const { data: dataFolders, isLoading: isLoadingFolders } = query<
    GenericQueryResponse<StrapiData<FolderAttribute>[]>
  >(
    STRAPI_ENDPOINT.GET.folders,
    {
      queryKey: ['folders'],
    },
    {
      params: {
        populate: 'deep,3',
      },
    }
  );

  const folders: NestedFolderItem[] = useMemo(() => {
    if (!dataFolders) return [{ value: 'all', title: 'Semua' }];

    const mapped = dataFolders.data.map((item) => {
      let blogCount = 0;

      const child = item.attributes.subFolders?.data.map((sub) => {
        const subBlogCount = sub.attributes.blogs?.data.length || 0;
        blogCount += subBlogCount;
        return {
          value: `${sub.id}`,
          title: `${sub.attributes.name} (${subBlogCount})`,
        };
      });

      const value = item.attributes.subFolders?.data.length
        ? `parent-${item.attributes.subFolders?.data
            .map((s) => `${s.id}`)
            .join(',')}`
        : `empty-${item.id}`;

      return {
        value,
        title: `${item.attributes.name} (${blogCount})`,
        child,
      };
    });
    return [
      { value: 'all', title: `Semua (${totalData})` },
      ...mapped,
    ];
  }, [totalData, dataFolders]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        <Stack gap={24}>
          <h1 className="text-4xl font-bold">Berita KM BPSDM</h1>
          <p>
            Menampilkan{' '}
            <span className="font-bold text-primary-main">
              {data?.blogs?.length || 0}
            </span>{' '}
            Berita
          </p>
        </Stack>

        <AsideContentLayout
          aside={
            isLoadingFolders ? (
              <Skeleton h={300} />
            ) : (
              <Stack className="rounded-md border p-4">
                <NestedFolder
                  data={folders}
                  value={activeFolder}
                  onChange={setActiveFolder}
                />
              </Stack>
            )
          }
        >
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
                          blog.category?.data?.attributes?.name
                        }
                        title={blog.title}
                        content={blog.content}
                        createdAt={blog.createdAt}
                        thumbnailUrl={strapiBaseURL(
                          blog.thumbnail?.data?.attributes?.url
                        )}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              );
            }
            return <NoData label="Berita KM tidak ditemukan" />;
          })()}

          {isFetchingNextPage && (
            <Loader className="mx-auto" type="dots" />
          )}
        </AsideContentLayout>
      </div>
    </HomeLayout>
  );
}
