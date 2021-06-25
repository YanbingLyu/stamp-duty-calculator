enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export const getEnv: () => Environment = () => {
  const env = process.env.ENVIRONMENT || 'development';
  switch (env) {
    case Environment.Development:
    case Environment.Staging:
    case Environment.Production:
      return env;
    default:
      throw new Error(`Invalid environment ${env}`);
  }
};
