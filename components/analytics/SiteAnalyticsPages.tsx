import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Link from 'next/link';

import { FathomPathnameData } from './_models';

export const SiteAnalyticsPages: FC = () => {
  const [last, setLast] = useState<number>(30);

  const fetchPagesAnalytics = async ({ queryKey }) => {
    const res = await fetch(`/api/analytics/site/pages?last=${queryKey[1]}`, {
      method: 'GET',
      credentials: 'include',
    });

    const { success, data } = await res.json();

    if (!success) {
      const newError = new Error(data.message);
      throw newError;
    }

    return data;
  };

  const {
    data: sitePageAnalytics,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<FathomPathnameData[], Error>(
    ['sitePagesAnalytics', last],
    fetchPagesAnalytics,
    {
      onError: (error) => toast.error(error.message),
    }
  );

  const formatAvgDuration = (avgDuration: string) => {
    const seconds = parseInt(avgDuration);

    let convertedDuration = new Date(seconds * 1000).toLocaleTimeString(
      'en-US',
      {
        minute: '2-digit',
        second: '2-digit',
      }
    );

    if (convertedDuration === 'Invalid Date') {
      convertedDuration = '00:00';
    }

    return convertedDuration;
  };

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>Pages</h3>
      <div className='mt-5 flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Page
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Visitors
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Views
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Avg time on page
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <span className='sr-only'>Analytics</span>
                    </th>
                  </tr>
                </thead>
                {isLoading && (
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    <tr className='select-none'>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium'>
                        <span className='animate-pulse bg-gray-200 text-gray-200'>
                          Loading path
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm'>
                        <span className='animate-pulse bg-gray-200 text-gray-200'>
                          Loading visits
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm'>
                        <span className='animate-pulse bg-gray-200 text-gray-200'>
                          Loading views
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm'>
                        <span className='animate-pulse bg-gray-200 text-gray-200'>
                          Loading duration
                        </span>
                      </td>
                    </tr>
                  </tbody>
                )}
                {isSuccess && sitePageAnalytics.length > 0 && (
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {sitePageAnalytics.map((page) => (
                      <tr key={page.pathname}>
                        <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                          {page.pathname}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                          {page.visits}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                          {page.pageviews}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                          {formatAvgDuration(page.avg_duration)}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500'>
                          <Link href={`/analytics${page.pathname}`}>
                            <a className='text-blue-600 hover:text-blue-900'>
                              Analytics
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
                {isSuccess && sitePageAnalytics.length === 0 && (
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    <tr>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        –
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        –
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        –
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        –
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
