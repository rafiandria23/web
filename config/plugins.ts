import newrelic from '@newrelic/apollo-server-plugin';

export default ({ env }) => ({
  'open-ai': {
    enabled: true,
    config: {
      API_TOKEN: env('OPEN_AI_API_TOKEN'),
    },
  },
  seo: {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-minio-ce',
      providerOptions: {
        accessKey: env('MINIO_ACCESS_KEY'),
        secretKey: env('MINIO_SECRET_KEY'),
        bucket: env('MINIO_BUCKET', 'cms'),
        endPoint: env('MINIO_ENDPOINT', 'storage.rafiandria23.tech'),
        port: env('MINIO_PORT', '443'),
        useSSL: env('MINIO_USE_SSL', 'true'),
        host: env('MINIO_HOST', 'storage.rafiandria23.tech'),
        folder: env('MINIO_FOLDER', 'uploads')
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/gql',
      shadowCRUD: true,
      playgroundAlways: env('NODE_ENV') !== 'production',
      depthLimit: 100,
      amountLimit: 100,
      apolloServer: {
        tracing: env('NODE_ENV') !== 'production',
        plugins: [newrelic],
      },
    },
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
});
