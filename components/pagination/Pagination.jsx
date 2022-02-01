import { useRouter } from 'next/router';

import { Container } from 'components/container';

export const Pagination = ({
  currentPage,
  limit,
  quantity,
  totalPages,
  href,
}) => {
  const router = useRouter();

  return (
    <Container size='sm'>
      <nav
        className='mt-5 bg-white py-3 flex items-center justify-between border-t border-gray-200'
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
        <div className='flex-1 flex justify-between sm:justify-end'>
          <button
            type='button'
            disabled={currentPage === 1}
            onClick={() => router.push(`${href}${currentPage - 1}`)}
            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Previous
          </button>
          <button
            type='button'
            disabled={totalPages === currentPage}
            onClick={() => router.push(`${href}${currentPage + 1}`)}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
};
