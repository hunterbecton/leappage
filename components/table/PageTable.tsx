import { FC } from 'react';
import Link from 'next/link';

import { Container } from 'components/container';
import { Badge } from 'components/badge';
import { formatDate } from 'utils';
import { PageTableProps } from './_models';

export const PageTable: FC<PageTableProps> = ({ pages }) => {
  return (
    <Container size='none'>
      <div className='flex flex-col'>
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
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Updated
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Created by
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <span className='sr-only'>Options</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {page.title}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {formatDate(page.updatedAt)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {page.userInfo[0]?.name || 'Unknown'}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        <Badge text={page.status} type={page.status} />
                      </td>
                      <td className='space-x-4 whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500'>
                        <Link
                          href={`/analytics/${page.slug ? page.slug : page.id}`}
                        >
                          <a className='text-blue-600 hover:text-blue-900'>
                            Analytics
                          </a>
                        </Link>
                        <Link href={`/pages/edit/${page.id}`}>
                          <a className='text-blue-600 hover:text-blue-900'>
                            Edit
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
