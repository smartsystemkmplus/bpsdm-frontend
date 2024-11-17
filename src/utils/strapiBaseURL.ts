import { BASE_PROXY } from '@services/api/endpoint';

import baseURL from './baseURL';

export default function strapiBaseURL(path?: string) {
  const url = baseURL(BASE_PROXY.strapi);
  return `${url}${path}`;
}
