import getConfig from 'next/config';

export const getProcessEnvs = () => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig;
};
