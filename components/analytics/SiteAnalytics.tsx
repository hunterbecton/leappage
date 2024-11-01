import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import { FathomAllSiteData, SiteAnalyticsProps } from './_models';
import {
  AnalyticsSimpleCard,
  SkeletonAnalyticsSimpleCard,
} from 'components/analytics';

export const SiteAnalytics: FC<SiteAnalyticsProps> = ({ title }) => {
  const [last, setLast] = useState<number>(30);

  const fetchSiteAnalytics = async ({ queryKey }) => {
    const res = await fetch(`/api/analytics/site?last=${queryKey[1]}`, {
      method: 'GET',
      credentials: 'include',
    });

    const { success, data } = await res.json();

    if (!success) {
      const newError = new Error(data.message);
      throw newError;
    }

    return data[0];
  };

  const {
    data: siteAnalytics,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<FathomAllSiteData, Error>(
    ['siteAnalytics', last],
    fetchSiteAnalytics,
    {
      onError: (error) => toast.error(error.message),
    }
  );

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {isLoading && (
          <>
            <SkeletonAnalyticsSimpleCard name='Visitors' />
            <SkeletonAnalyticsSimpleCard name='Views' />
            <SkeletonAnalyticsSimpleCard name='Avg time on page' />
          </>
        )}
        {isSuccess && (
          <>
            <AnalyticsSimpleCard
              name='Visitors'
              type='visitors'
              value={siteAnalytics.visits}
            />
            <AnalyticsSimpleCard
              name='Views'
              type='views'
              value={siteAnalytics.pageviews}
            />
            <AnalyticsSimpleCard
              name='Avg time on page'
              type='duration'
              value={siteAnalytics.avg_duration}
            />
          </>
        )}
      </dl>
    </div>
  );
};

SiteAnalytics.defaultProps = {
  title: 'Last 30 days',
};
