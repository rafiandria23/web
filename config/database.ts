export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DB_HOST', '127.0.0.1'),
      port: env.int('DB_PORT', 5432),
      database: env('DB_NAME', 'cms'),
      user: env('DB_USER', 'rafiandria23'),
      password: env('DB_PASS'),
      ssl: {
        rejectUnauthorized: env.bool('DB_SSL_REJECT_UNAUTHORIZED', false),
      },
      schema: env('DB_SCHEMA', 'public'),
    },
    pool: { min: env.int('DB_POOL_MIN', 5), max: env.int('DB_POOL_MAX', 10) },
    acquireConnectionTimeout: env.int('DB_CONNECTION_TIMEOUT', 60000),
  },
});
