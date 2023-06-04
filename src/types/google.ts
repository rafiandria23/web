export interface IGTagEventParams {
  action: Gtag.EventNames;
  category: Gtag.EventParams['event_category'];
  label: Gtag.EventParams['event_label'];
  value: Gtag.EventParams['value'];
}
