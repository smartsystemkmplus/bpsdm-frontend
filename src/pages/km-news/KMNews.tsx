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
import { Grid, Group, Loader, Skeleton, Stack } from '@mantine/core';
import {
  BlogAttribute,
  BlogListData,
  PodcastAttribute,
  PodcastDetailData,
} from '@pages/home/index.types';
import { BASE_PROXY, STRAPI_ENDPOINT } from '@services/api/endpoint';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
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
  const podcastId = searchParams.get('pod');
  const [activeFolder, setActiveFolder] = useState(
    paramFolderId || 'all'
  );
  const [activeFolderLabel, setActiveFolderLabel] = useState('');

  console.log({ activeFolder });
  const [totalData, setTotalData] = useState(0);

  // * Update URL Search Param on folder change
  useEffect(() => {
    if (!podcastId) {
      searchParams.set('f', activeFolder as string);
      setSearchParams([...searchParams.entries()], { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFolder, podcastId]);

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
          enabled: !podcastId,
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

  const { data: dataPodcast, isLoading: isLoadingPodcast } = query<
    GenericQueryResponse<StrapiData<PodcastAttribute>[]>,
    PodcastDetailData
  >(
    STRAPI_ENDPOINT.GET.podcasts,
    {
      queryKey: ['podcast', podcastId],
      enabled: !!podcastId,
      select: (res) => ({
        ...res.data?.[0].attributes,
        podcast_episodes:
          res?.data?.[0]?.attributes?.podcast_episodes?.data?.map(
            (item) => item.attributes
          ),
      }),
    },
    {
      params: {
        populate: 'deep',
        'filters[id][$eq]': podcastId,
      },
    }
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

  const renderKMNews = () => {
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
                category={blog.category?.data?.attributes?.name}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                thumbnailUrl={blog.thumbnail?.data?.attributes?.url}
              />
            </Grid.Col>
          ))}
        </Grid>
      );
    }
    return <NoData label="Data tidak ditemukan" />;
  };

  const renderPodcast = () => {
    return (
      <Stack gap="xl">
        <Group gap="md" wrap="nowrap" align="start">
          {isLoadingPodcast ? (
            <Skeleton w={140} h={80} />
          ) : (
            <img
              alt="logo"
              src={dataPodcast?.thumbnail?.data?.attributes?.url}
              className="w-[140px]"
            />
          )}

          {isLoadingPodcast ? (
            <Stack gap="xs" className="w-full">
              <Skeleton h={40} w={300} />
              <Skeleton h={150} w="100%" />
            </Stack>
          ) : (
            <Stack gap="xs">
              <p className="text-4xl font-bold">
                {dataPodcast?.name}
              </p>
              <p>{dataPodcast?.description}</p>
            </Stack>
          )}
        </Group>
        <DataTable
          records={dataPodcast?.podcast_episodes || []}
          idAccessor="id"
          columns={[
            {
              accessor: 'episode',
              title: 'Episode',
            },
            {
              accessor: 'date',
              title: 'Tanggal',
              render: (item) =>
                dayjs(item.date).format('DD MMMM YYYY'),
            },
            {
              accessor: 'title',
              title: 'Judul',
            },
            {
              accessor: 'url',
              title: 'Link',
              render: (item) => (
                <a
                  href={item?.url}
                  className="text-primary-main hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item?.url?.includes('youtube')
                    ? 'Watch on YouTube'
                    : item?.url}
                </a>
              ),
            },
          ]}
          totalRecords={dataPodcast?.podcast_episodes?.length}
          recordsPerPage={dataPodcast?.podcast_episodes?.length || 10}
          page={1}
          onPageChange={() => {}}
          minHeight={225}
          noRecordsIcon={<NoData label="Episode tidak ditemukan" />}
          noRecordsText=""
          fetching={isLoading}
        />
      </Stack>
    );
  };

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        <Stack gap={24}>
          <h1 className="text-4xl font-bold">
            {podcastId ? dataPodcast?.name : 'Knowledge Center'}
          </h1>
          {!podcastId && (
            <p>
              Menampilkan{' '}
              <span className="font-bold text-primary-main">
                {data?.blogs?.length || 0}
              </span>{' '}
              artikel {activeFolderLabel.replace(/\(\d*\)/g, '')}
            </p>
          )}
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
                  onChange={(v, label) => {
                    if (podcastId) {
                      searchParams.delete('pod');
                    }
                    setActiveFolder(v);
                    setActiveFolderLabel(
                      label === 'all' ? '' : label
                    );
                  }}
                />
              </Stack>
            )
          }
        >
          {podcastId ? renderPodcast() : renderKMNews()}

          {isFetchingNextPage && (
            <Loader className="mx-auto" type="dots" />
          )}
        </AsideContentLayout>
      </div>
    </HomeLayout>
  );
}
