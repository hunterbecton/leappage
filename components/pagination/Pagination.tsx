import { useRouter } from 'next/router';

import { Container } from 'components/container';
import { FC } from 'react';
import { PaginationProps } from './_models';

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  limit,
  quantity,
  totalPages,
  href,
  isAsnyc,
  setCurrentPage,
}) => {
  const router = useRouter();

  return (
    <Container size='sm' customClassName='w-full'>
      <nav
        className='mt-5 flex items-center justify-between border-t border-gray-200 bg-white py-3'
        aria-label='Pagination'
      >
        <div className='hidden sm:block'>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {currentPage === 1 ? 1 : currentPage * limit - (limit - 1)}
            </span>{' '}
            to <span className='font-medium'>{currentPage * limit}</span>
            {quantity ? (
              <span>
                {' '}
                of <span className='font-medium'>{quantity}</span> results
              </span>
            ) : null}
          </p>
        </div>
        <div className='flex flex-1 justify-between sm:justify-end'>
          <button
            type='button'
            disabled={currentPage === 1}
            onClick={() =>
              isAsnyc
                ? setCurrentPage(currentPage - 1)
                : router.push(`${href}${currentPage - 1}`)
            }
            className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400'
          >
            Previous
          </button>
          <button
            type='button'
            disabled={totalPages === currentPage}
            onClick={() =>
              isAsnyc
                ? setCurrentPage(currentPage + 1)
                : router.push(`${href}${currentPage + 1}`)
            }
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400'
          >
            Next
          </button>
        </div>
      </nav>
    </Container>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 24,
  quantity: 24,
  totalPages: 1,
  href: '/pages/',
  isAsnyc: false,
};
