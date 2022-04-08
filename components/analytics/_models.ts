export interface AnalyticProps {
  name: string;
  value: any;
}

export interface FathomAllSiteData {
  avg_duration: string | null;
  pageviews: string | null;
  visits: string | null;
  uniques: string | null;
  date?: string | null;
}

export interface FathomPathnameData {
  avg_duration: string | null;
  pageviews: string | null;
  visits: string | null;
  uniques: string | null;
  pathname: string;
  date?: string | null;
}

export interface AnalyticsSimpleCardProps {
  name: string;
  type: string;
  value: any;
}

export interface SkeletonAnalyticsSimpleCardProps {
  name: string;
}

export interface SiteAnalyticsProps {
  title: string;
}

export interface PageAnalyticsProps {
  title: string;
}
