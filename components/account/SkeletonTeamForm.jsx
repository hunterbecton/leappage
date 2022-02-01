import { Input } from 'components/form';
import { Button } from 'components/button';
import { Badge } from 'components/badge';

export const SkeletonTeamForm = () => {
  return (
    <div className='space-y-6 lg:px-0 lg:col-span-9'>
      <div className='shadow sm:rounded-md sm:overflow-hidden'>
        <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Manage team
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Managing teammates is restricted to team admins.
            </p>
          </div>

          <div className='grid grid-cols-3 gap-6 select-none'>
            <div className='col-span-3'>
              <ul className='-my-5 divide-y divide-gray-200'>
                <li className='py-4 animate-pulse'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <span className='inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100'>
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium bg-gray-200 text-gray-200 max-w-max truncate'>
                        email@example.com
                      </p>
                      <div className='flex space-x-2 mt-1'>
                        <Badge type='loading' text='Loading...' />
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
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Add teammate
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Adding teammates is restricted to team admins.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <Input
                  placeholder='Loading...'
                  readOnly={true}
                  variant='loader'
                  disabled={true}
                />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <Input
                  placeholder='Loading...'
                  readOnly={true}
                  variant='loader'
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
            <Button
              type='button'
              disabled={true}
              onClick={() => null}
              text='Update'
            />
          </div>
        </div>
      </form>
    </div>
  );
};
