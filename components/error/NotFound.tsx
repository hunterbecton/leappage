import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const NotFound: FC = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white pt-16 pb-12'>
      <main className='mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-shrink-0 justify-center'>
          <Link href='/'>
            <a className='inline-flex'>
              <span className='sr-only'>LeapPage</span>
              <div className='relative mx-auto h-12 w-auto overflow-hidden'>
                <Image
                  src='/brand/logo-light-on-color.svg'
                  alt='LeapPage logo'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            </a>
          </Link>
        </div>
        <div className='py-16'>
          <div className='text-center'>
            <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>
              404 Error
            </p>
            <h1 className='mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
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
      <footer className='mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8'>
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
