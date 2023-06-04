// Config
import { AppConfig } from '@/constants';

// Types
import type { IGTagEventParams } from '@/types/google';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', AppConfig.GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: IGTagEventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
