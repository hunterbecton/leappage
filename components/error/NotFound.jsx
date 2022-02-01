import Link from 'next/link';

export const NotFound = () => {
  return (
    <div className='min-h-screen pt-16 pb-12 flex flex-col bg-white'>
      <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex-shrink-0 flex justify-center'>
          <Link href='/'>
            <a className='inline-flex'>
              <span className='sr-only'>Mattermix</span>
              <img
                className='mx-auto h-12 w-auto'
                src='/brand/logo-light-on-color.svg'
                alt='Mattermix logo'
              />
            </a>
          </Link>
        </div>
        <div className='py-16'>
          <div className='text-center'>
            <p className='text-sm font-semibold text-blue-600 uppercase tracking-wide'>
              404 Error
            </p>
            <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
              Page Not Found.
            </h1>
            <p className='mt-2 text-base text-gray-500'>
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-6'>
              <Link href='/'>
                <a className='text-base font-medium text-blue-600 hover:text-blue-500'>
                  Go Back Home<span aria-hidden='true'> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className='flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex justify-center space-x-4'>
          <a
            href='https://twitter.com/mattermixcom'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-gray-500 hover:text-gray-600'
          >
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  );
};
