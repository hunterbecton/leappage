import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { BiChart } from 'react-icons/bi';

import { Empty } from 'components/empty';
import { FathomAllSiteData } from './_models';
import { classNames } from 'utils';

export const SiteAnalyticsGraphs: FC = () => {
  const [last, setLast] = useState<number>(30);

  const fetchSiteGraphAnalytics = async ({ queryKey }) => {
    const res = await fetch(`/api/analytics/site/graph?last=${queryKey[1]}`, {
      method: 'GET',
      credentials: 'include',
    });

    const { success, data } = await res.json();

    if (!success) {
      const newError = new Error(data.message);
      throw newError;
    }

    // Format data dates to be readable format
    const formattedData = data.map(
      ({ visits, uniques, pageviews, avg_duration, date }) => ({
        visits: visits ? parseInt(visits) : 0,
        uniques: uniques ? parseInt(uniques) : 0,
        pageviews: pageviews ? parseInt(pageviews) : 0,
        avg_duration: avg_duration ? parseInt(avg_duration) : 0,
        date,
      })
    );

    return formattedData;
  };

  const {
    data: siteGraphAnalytics,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<FathomAllSiteData[], Error>(
    ['siteGraphAnalytics', last],
    fetchSiteGraphAnalytics,
    {
      onError: (error) => toast.error(error.message),
    }
  );

  const formatTooltopName = (name: string) => {
    switch (name) {
      case 'pageviews':
        return 'Views';
      case 'visits':
        return 'Visitors';
      case 'avg_duration':
        return 'Avg time';
      default:
        return 'Views';
    }
  };

  return (
    <div>
      <div
        className={classNames(
          isSuccess && siteGraphAnalytics.length === 0 ? 'flex' : 'block',
          'h-96 w-full overflow-hidden rounded-lg bg-gray-50 py-5 pr-5 shadow'
        )}
      >
        {isLoading && (
          <div className='h-full w-full animate-pulse bg-gray-200'></div>
        )}
        {isSuccess && siteGraphAnalytics.length === 0 && (
          <Empty
            icon={<BiChart className='mx-auto h-12 w-12 text-gray-300' />}
            title='No site data'
            subtitle=''
            withCta={false}
          />
        )}
        {isSuccess && siteGraphAnalytics.length > 0 && (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={siteGraphAnalytics}>
              <Line type='linear' dataKey='pageviews' stroke='#db2777' />
              <Line type='linear' dataKey='visits' stroke='#2563eb' />
              <CartesianGrid stroke='#e5e7eb' strokeDasharray='5 5' />
              <XAxis dataKey='date' tickMargin={16} stroke='#6b7280' />
              <YAxis tickMargin={16} stroke='#6b7280' allowDecimals={false} />
              <Tooltip
                formatter={(value: any, name: string) => [
                  value,
                  formatTooltopName(name),
                ]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
