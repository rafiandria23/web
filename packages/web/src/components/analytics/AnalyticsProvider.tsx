'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import Script from 'next/script';
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

      {/* Microsoft Clarity */}
      <Script
        id='ms-clarity'
        type='text/javascript'
        strategy='afterInteractive'
      >
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MC_MEASUREMENT_ID}");
        `}
      </Script>

      {children}
    </>
  );
};

export default memo(AnalyticsProvider);
