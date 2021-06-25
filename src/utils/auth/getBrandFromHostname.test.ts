import { Brand } from '@lendi/lala-react';
import { getBrandFromHostname } from './getBrandFromHostname';

describe('getBrandFromHostname', () => {
  let previousWindowLocation: Location;
  beforeEach(() => {
    previousWindowLocation = window.location;
    // @ts-ignore: otherwise it shows The operand of a 'delete' operator must be optional error
    delete window.location;
    window.location = {} as any;
  });

  afterEach(() => {
    window.location = previousWindowLocation;
  });

  [
    'team-dlf.lendi.com.au.local',
    'team-dlf.lendi-dev.net',
    'team-dlf.lendi-paas-dev.net',
    'team-dlf.lendi-paas-stg.net',
    'team-dlf.lendi-stg.net',
    'team-dlf.lendi.com.au',
    'dlf.lendi-paas-dev.net',
    'dlf.lendi-paas-stg.net',
    'dlf.lendi-paas.net',
    'stage.domain.com.au',
    'www.domain.com.au',
  ].map((hostname) => {
    it(`hostname of ${hostname} should return Domain as the brand`, () => {
      window.location.hostname = hostname;
      expect(getBrandFromHostname()).toEqual(Brand.Domain);
    });
  });

  [
    'www.lendi.com.au',
    'www.lendi-stg.net',
    'www.lendi-dev.net',
    'team.lendi.com.au',
    'team.lendi-dev.net',
    'team.lendi-stg.net',
  ].map((hostname) => {
    it(`hostname of ${hostname} should return Lendi as the brand`, () => {
      window.location.hostname = hostname;
      expect(getBrandFromHostname()).toEqual(Brand.Lendi);
    });
  });

  it('Should return lendi as brand by default', () => {
    expect(getBrandFromHostname()).toEqual(Brand.Lendi);
  });
});
