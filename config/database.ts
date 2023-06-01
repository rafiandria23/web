export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DB_URL'),
      host: env('DB_HOST', 'localhost'),
      port: env.int('DB_PORT', 5432),
      database: env('DB_NAME', 'strapi'),
      user: env('DB_USERNAME', 'strapi'),
      password: env('DB_PASSWORD', 'strapi'),
      ssl: env.bool('DB_SSL', false) && {
        key: env('DB_SSL_KEY', undefined),
        cert: env('DB_SSL_CERT', undefined),
        ca: env('DB_SSL_CA', undefined),
        capath: env('DB_SSL_CAPATH', undefined),
        cipher: env('DB_SSL_CIPHER', undefined),
        rejectUnauthorized: env.bool('DB_SSL_REJECT_UNAUTHORIZED', true),
      },
      schema: env('DB_SCHEMA', 'public'),
    },
    pool: { min: env.int('DB_POOL_MIN', 2), max: env.int('DB_POOL_MAX', 10) },
    acquireConnectionTimeout: env.int('DB_CONNECTION_TIMEOUT', 60000),
  },
});
