import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';

// Components
const AnalyticsProvider = dynamic(
  () => import('@/components/analytics').then((mod) => mod.AnalyticsProvider),
  {
    ssr: false,
  },
);
const GraphQLProvider = dynamic(
  () => import('@/components/graphql').then((mod) => mod.GraphQLProvider),
  {
    ssr: false,
  },
);
const ReduxProvider = dynamic(
  () => import('@/components/redux').then((mod) => mod.ReduxProvider),
  {
    ssr: false,
  },
);
const ThemeRegistry = dynamic(
  () => import('@/components/theme').then((mod) => mod.ThemeRegistry),
  {
    ssr: false,
  },
);
const Layout = dynamic(
  () => import('@/components/layout').then((mod) => mod.Layout),
  {
    ssr: false,
  },
);

const roboto = Roboto({
  adjustFontFallback: true,
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <AnalyticsProvider>
          <ReduxProvider>
            <GraphQLProvider>
              <ThemeRegistry options={{ key: 'mui' }}>
                <Layout>{children}</Layout>
              </ThemeRegistry>
            </GraphQLProvider>
          </ReduxProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  metadataBase: new URL('https://rafiandria23.tech'),
  title: {
    template: '%s | rafiandria23.tech',
    default: 'Welcome!',
  },
  description: 'My personal web.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon-96x96.png',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Welcome!',
    description: 'My personal web.',
    images: [
      {
        alt: 'rafiandria23.tech',
        url: '/favicon-96x96.png',
        secureUrl: '/favicon-96x96.png',
      },
    ],
  },
  twitter: {
    title: 'Welcome!',
    description: 'My personal web.',
    images: [
      {
        alt: 'rafiandria23.tech',
        url: '/favicon-96x96.png',
        secureUrl: '/favicon-96x96.png',
      },
    ],
  },
};
