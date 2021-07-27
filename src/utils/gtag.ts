// Config
import { GOOGLE_ANALYTICS_TRACKING_ID } from '@/config';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GOOGLE_ANALYTICS_TRACKING_ID, {
    page_path: url,
  });
};

interface GtagEventParams {
  action: Gtag.EventNames;
  category: Gtag.EventParams['event_category'];
  label: Gtag.EventParams['event_label'];
  value: Gtag.EventParams['value'];
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GtagEventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
