import { Brand } from '@lendi/lala-react';

export const getBrandFromHostname = (): Brand => {
  const hostname = window.location.hostname;

  // lendi customer
  if (hostname === 'www.lendi.com.au' || hostname === 'www.lendi-stg.net' || hostname === 'www.lendi-dev.net') {
    return Brand.Lendi;
  }

  // lendi team
  if (hostname === 'team.lendi.com.au' || hostname === 'team.lendi-stg.net' || hostname === 'team.lendi-dev.net') {
    return Brand.Lendi;
  }

  // domain customer
  if (
    hostname === 'www.domain.com.au' ||
    hostname === 'stage.domain.com.au' ||
    hostname === 'dlf.lendi-paas.net' ||
    hostname === 'dlf.lendi-paas-dev.net' ||
    hostname === 'dlf.lendi-paas-stg.net'
  ) {
    return Brand.Domain;
  }

  // domain team
  if (
    hostname === 'team-dlf.lendi.com.au' ||
    hostname === 'team-dlf.lendi-paas-stg.net' ||
    hostname === 'team-dlf.lendi-paas-dev.net' ||
    hostname === 'team-dlf.lendi-dev.net' ||
    hostname === 'team-dlf.lendi-stg.net' ||
    hostname === 'team-dlf.lendi.com.au.local'
  ) {
    return Brand.Domain;
  }

  // default to Lendi
  return Brand.Lendi;
};
