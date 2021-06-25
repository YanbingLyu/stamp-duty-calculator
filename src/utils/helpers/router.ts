/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import NextRouter from 'next/router';
import URL from 'url';
import { getProcessEnvs } from './getProcessEnvs';

const addPrefixToPath = (url: URL.UrlObject | string, as?: string | URL.UrlObject) => {
  const { PATH_PREFIX } = getProcessEnvs();
  return `${PATH_PREFIX}${URL.format(as ? as : url)}`;
};

export const Router = {
  push: (url: URL.UrlObject | string, as?: string | URL.UrlObject, options?: Record<string, unknown>) => {
    NextRouter.push(url, addPrefixToPath(url, as), options);
  },
  replace: (url: URL.UrlObject | string, as?: string | URL.UrlObject, options?: Record<string, unknown>) => {
    NextRouter.replace(url, addPrefixToPath(url, as), options);
  },
  query: () => NextRouter.query,
  pathname: () => NextRouter.pathname,
};
