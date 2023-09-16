'use client';

import type { FC, ReactNode } from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export interface IAnalyticsProviderProps {
  children: ReactNode;
}

const AnalyticsProvider: FC<IAnalyticsProviderProps> = ({ children }) => {
  return (
    <>
      <GoogleAnalytics
        gaMeasurementId={process.env.NEXT_APP_GA_MEASUREMENT_ID}
        trackPageViews
      />

      {children}
    </>
  );
};

export default AnalyticsProvider;
