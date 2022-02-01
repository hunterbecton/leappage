import { BiImageAdd } from 'react-icons/bi';

import { Input, Dropdown } from 'components/form';
import { Button } from 'components/button';

const roleOptions = [
  {
    value: 'loading',
    name: 'Loading',
  },
];

export const SkeletonTeammateForm = () => {
  return (
    <>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9 select-none'>
        <form>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Update teammate
                </h3>
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

                <div className='col-span-3'>
                  <Dropdown options={roleOptions} disabled />
                </div>

                <div className='col-span-3'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Profile image
                  </label>
                  <div className='border-gray-300 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md focus:outline-none'>
                    <div className='space-y-1 text-center'>
                      <BiImageAdd className='mx-auto h-12 w-12 text-gray-300' />
                      <div className='flex text-sm text-gray-600'>
                        <p className='relative bg-white rounded-md font-medium text-blue-600'>
                          Upload file
                        </p>
                        <p className='pl-1 '>or drag and drop</p>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                          readOnly={true}
                        />
                      </div>
                      <p className='text-xs text-gray-500'>
                        PNG or JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right space-x-4 sm:px-6'>
              <Button
                type='button'
                variant='ghost'
                disabled={true}
                onClick={() => null}
                text='Delete'
              />
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
    </>
  );
};
