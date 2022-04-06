export interface AnalyticProps {
  name: string;
  value: any;
}

export interface FathomAllSiteData {
  avg_duration: string;
  pageviews: string;
  visits: string;
  uniques: string;
}

export interface AnalyticsSimpleCardProps {
  name: string;
  value: any;
}

export interface SiteAnalyticsProps {
  title: string;
  analytics: AnalyticProps[];
}
