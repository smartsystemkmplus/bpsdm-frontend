import HomeLayout from '@components/Layouts/HomeLayout';
import SimpleBreadcrumbs, {
  Crumb,
} from '@components/SimpleBreadcrumbs';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Loader, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BlogAttribute } from '@pages/home/index.types';
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
} from '@services/api/endpoint';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import getPathWithSearchParams from '@utils/getPathWithSearchParams';
import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Category } from '../index.types';

interface NewsDetailProps {
  category?: Category;
}
export default function NewsDetail({
  category = 'Knowledge Center',
}: NewsDetailProps) {
  const isMobileScreen = useMediaQuery('(max-width: 768px)');
  const { slug } = useParams();
  const { query } = useNetworks(BASE_PROXY.searchEngine);

  const { data, isLoading } = query<
    GenericQueryResponse<StrapiData<BlogAttribute>[]>,
    BlogAttribute
  >(
    SEARCH_ENGINE_ENDPOINT.GET.blogDetail,
    {
      queryKey: ['blog-detail', slug],
      select: (res) => res?.data?.[0]?.attributes,
    },
    {
      params: {
        slug,
        populate: 'deep',
      },
    }
  );

  const crumbs: Crumb[] = useMemo(
    () => [
      {
        title: category,
        href: '/km-news',
      },
      {
        title: data?.title || '...',
        href: getPathWithSearchParams(),
      },
    ],
    [data, category]
  );

  if (!isLoading && !data) {
    return <Navigate to="/404" replace />;
  }

  return (
    <HomeLayout withNavbar={!isMobileScreen} className="p-4 lg:p-16">
      {!isMobileScreen && <SimpleBreadcrumbs crumbs={crumbs} />}

      {isLoading ? (
        <Stack className="size-full h-[45vh]">
          <Loader className="m-auto" />
        </Stack>
      ) : (
        <Stack
          gap={24}
          px={isMobileScreen ? 8 : 120}
          py={isMobileScreen ? 8 : 72}
        >
          <h2 className="font-bold uppercase text-primary-main">
            {data?.category?.data?.attributes?.name}
          </h2>
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <img
            alt={`thumb-${slug}`}
            src={
              data?.thumbnail_large?.data?.attributes?.url ||
              data?.thumbnail?.data?.attributes?.url
            }
            className="z-[2] w-full object-cover"
            loading="lazy"
          />

          <div className="[&_a]:text-primary-main [&_a]:underline">
            <BlocksRenderer content={data?.content || []} />
          </div>
        </Stack>
      )}
    </HomeLayout>
  );
}
