import Link from 'next/link';

import { Container } from 'components/container';
import { formatDate } from 'utils';
import { Badge } from 'components/badge';
import { FC } from 'react';
import { TestimonialTableProps } from './_models';

export const TestimonialTable: FC<TestimonialTableProps> = ({
  testimonials,
}) => {
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
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Status
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {testimonials.map((item) => (
                    <tr key={item.id}>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {item.title}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {item.category ? (
                          <Badge
                            text={
                              item.categoryInfo && item.categoryInfo.length > 0
                                ? item.categoryInfo[0].title
                                : 'Uncategorized'
                            }
                            type='categorized'
                          />
                        ) : (
                          <Badge text='Uncategorized' type='uncategorized' />
                        )}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        <Badge text={item.status} type={item.status} />
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        <Link href={`/testimonials/edit/${item.id}`}>
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
