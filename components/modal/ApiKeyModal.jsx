import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiCopy, BiKey } from 'react-icons/bi';
import { toast } from 'react-toastify';

export const ApiKeyModal = ({ isOpen, setIsOpen, apiKey }) => {
  const cancelButtonRef = useRef(null);

  const handleCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    toast.success('API key copied.');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                  <BiKey
                    className='h-6 w-6 text-green-600'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Copy your API key
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      For added security, this is the only time you can view it.
                    </p>
                    <div className='my-10 flex rounded-md shadow-sm'>
                      <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                        <input
                          type='text'
                          name='apiKey'
                          id='apiKey'
                          readOnly
                          className='focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300'
                          value={apiKey}
                        />
                      </div>
                      <button
                        type='button'
                        onClick={() => handleCopy(apiKey)}
                        className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <BiCopy
                          className='h-5 w-5 text-gray-300'
                          aria-hidden='true'
                        />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='button'
                  className='mt-3 col-start-1 col-span-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:text-sm'
                  onClick={() => setIsOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ApiKeyModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => null,
  apiKey: '',
};
