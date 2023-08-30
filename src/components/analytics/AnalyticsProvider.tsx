'use client';

import type { FC, ReactNode } from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';

// Constants
import { AppConfig } from '@/constants/app';

export interface IAnalyticsProviderProps {
  children: ReactNode;
}

const AnalyticsProvider: FC<IAnalyticsProviderProps> = ({ children }) => {
  return (
    <>
      <GoogleAnalytics
        gaMeasurementId={AppConfig.GA_MEASUREMENT_ID}
        strategy='worker'
        trackPageViews
      />

      {children}
    </>
  );
};

export default AnalyticsProvider;
