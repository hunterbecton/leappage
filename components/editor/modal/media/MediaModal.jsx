import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { MediaListModal } from 'components/editor/modal/media/MediaListModal';
import { SkeletonMediaListModal } from 'components/editor/modal/media/SkeletonMediaListModal';
import { Alert } from 'components/alert';
import { Empty } from 'components/empty';
import { Pagination } from 'components/pagination';
import { useEditorStore } from 'store';

export const MediaModal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(24); // eslint-disable-line
  const [totalPages, setTotalPages] = useState(1);
  const [quantity, setQuantity] = useState(null);

  const isMediaModalOpen = useEditorStore((state) => state.isMediaModalOpen);
  const setIsMediaModalOpen = useEditorStore(
    (state) => state.setIsMediaModalOpen
  );

  const cancelButtonRef = useRef(null);

  const fetchMediaModal = async ({ queryKey }) => {
    const res = await fetch(
      `/api/media?page=${queryKey[1]}&limit=${queryKey[2]}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const { success, data } = await res.json();

    if (!success) {
      const newError = new Error(data.message);
      throw newError;
    }

    setTotalPages(Math.ceil(data.totalMedia / queryKey[2]));
    setQuantity(data.totalMedia);

    return data.media;
  };

  const {
    data: medias,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(['mediaModal', currentPage, limit], fetchMediaModal, {
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <Transition.Root show={isMediaModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-50 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setIsMediaModalOpen}
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
              <div className='inline-block align-bottom w-full max-w-lg bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 lg:max-w-xl'>
                {isLoading && <SkeletonMediaListModal />}
                {isSuccess && (
                  <>
                    {medias?.length === 0 && (
                      <Empty
                        title='No Media'
                        subtitle='Get started by uploading a file'
                        withCta={false}
                      />
                    )}
                    {medias?.length > 0 && (
                      <>
                        <MediaListModal items={medias} />
                        <Pagination
                          currentPage={currentPage}
                          limit={limit}
                          quantity={quantity}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                        />
                      </>
                    )}
                  </>
                )}
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:text-sm'
                    onClick={() => setIsMediaModalOpen(false)}
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
    </>
  );
};

MediaModal.defaultProps = {
  isMediaModalOpen: false,
  setIsMediaModalOpen: () => console.log('Handle open'),
};
