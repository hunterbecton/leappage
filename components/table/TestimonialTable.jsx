import Link from 'next/link';

import { Container } from 'components/container';
import { formatDate } from 'utils';
import { Badge } from 'components/badge';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';

export const TestimonialTable = ({ testimonials }) => {
  const { user } = useAuth();

  return (
    <Container size='0'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Updated
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Status
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {testimonials.map((item) => (
                    <tr key={item.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {item.title}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
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
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <Badge text={item.status} type={item.status} />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <Link href={`/testimonials/edit/${item.id}`}>
                          <a className='text-blue-600 hover:text-blue-900'>
                            {restrict(['admin', 'editor'], user)
                              ? 'Edit'
                              : 'View'}
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
