import { FC, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiError } from 'react-icons/bi';
import { ConfirmTeammateModalProps } from './_models';

export const ConfirmTeammateModal: FC<ConfirmTeammateModalProps> = ({
  isConfirmTeammateModalOpen,
  setIsConfirmTeammateModalOpen,
  isConfirming,
  title,
  text,
  handleConfirmTeammate,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isConfirmTeammateModalOpen} as={Fragment}>
      <Dialog
        as='div'
        auto-reopen='true'
        className='fixed inset-0 z-50 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setIsConfirmTeammateModalOpen}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
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
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
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
            <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <BiError
                    className='h-6 w-6 text-blue-600'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{text}</p>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  disabled={isConfirming}
                  className='inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={handleConfirmTeammate}
                >
                  Send
                </button>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
                  onClick={() => setIsConfirmTeammateModalOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ConfirmTeammateModal.defaultProps = {
  isConfirmTeammateModalOpen: false,
  setIsConfirmTeammateModalOpen: () => console.log('Handle open'),
  isConfirming: false,
  title: 'Confirm Invite',
  text: 'Are you sure you want to send invite? Inviting a new teammate with automatically add a new seat to your subscription.',
  handleConfirmTeammate: () => console.log('Handle delete'),
};
