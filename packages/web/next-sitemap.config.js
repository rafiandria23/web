/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rafiandria23.tech',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://rafiandria23/server-sitemap.xml'],
  },
};
