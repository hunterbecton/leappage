import { BiKey } from 'react-icons/bi';

import { Badge } from 'components/badge';

export const SkeletonApiForm = () => {
  return (
    <div className='space-y-6 lg:col-span-9'>
      <form>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Manage API key
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Managing API keys is restricted to team admins.
              </p>
            </div>
            <div className='grid grid-cols-3 gap-6 select-none'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  <li className='animate-pulse py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <span className='mx-auto flex items-center justify-center h-8 w-8 rounded-full bg-gray-100'>
                          <BiKey className='h-4 w-4 text-gray-600' />
                        </span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium bg-gray-200 text-gray-200 max-w-max'>
                          1234...5678
                        </p>
                        <div className='flex space-x-2 mt-1'>
                          <Badge type='loading' text='Loading...' />
                        </div>
                      </div>
                      <div>
                        <button
                          type='button'
                          onClick={() => null()}
                          disabled={true}
                          className='cursor-default	inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white disabled:opacity-50'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
