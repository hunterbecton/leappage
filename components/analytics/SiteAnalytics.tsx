import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import { AnalyticsSimpleCard } from '.';
import { FathomAllSiteData, SiteAnalyticsProps } from './_models';
import { Container } from 'components/container';

export const SiteAnalytics: FC<SiteAnalyticsProps> = ({ title, analytics }) => {
  const [last, setLast] = useState<number>(30);

  const fetchSiteAnalytics = async ({ queryKey }) => {
    const res = await fetch(`/api/analytics/site/all?last=${queryKey[1]}`, {
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
    <Container size='none'>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        <AnalyticsSimpleCard name='Visitors' value={siteAnalytics.visits} />
        <AnalyticsSimpleCard name='Views' value={siteAnalytics.pageviews} />
        <AnalyticsSimpleCard
          name='Avg time on page'
          value={siteAnalytics.avg_duration}
        />
      </dl>
    </Container>
  );
};

SiteAnalytics.defaultProps = {
  title: 'Last 30 days',
  analytics: [
    {
      name: 'Visitors',
      value: '162',
    },
    {
      name: 'Views',
      value: '690',
    },
    {
      name: 'Avg time on site',
      value: '01:06',
    },
  ],
};
