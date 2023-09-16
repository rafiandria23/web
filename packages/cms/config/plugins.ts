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
      provider: 'cloudinary',
      providerOptions: {
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        cloud_name: env('CLOUDINARY_CLOUD', 'rafiandria23'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER', 'cms'),
        },
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER', 'cms'),
        },
        delete: {},
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
});
