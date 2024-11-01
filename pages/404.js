import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function Custom404() {
  return (
    <>
      <NextSeo title='404' nofollow={true} noIndex={true} />
      <div className='h-screen'>
        <div className='min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
          <div className='mx-auto max-w-max'>
            <main className='sm:flex'>
              <p className='text-4xl font-extrabold text-blue-600 sm:text-5xl'>
                404
              </p>
              <div className='sm:ml-6'>
                <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                  <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
                    Page not found
                  </h1>
                  <p className='mt-1 text-base text-gray-500'>
                    Please check the URL in the address bar and try again.
                  </p>
                </div>
                <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                  <Link href='/'>
                    <a className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                      Go back home
                    </a>
                  </Link>
                  {/* <a
                  href='#'
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Contact support
                </a> */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
