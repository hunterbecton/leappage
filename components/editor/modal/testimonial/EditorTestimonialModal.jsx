import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from 'react-query';

import { EditorTestimonialListModal } from './EditorTestimonialListModal';
import { EditorSkeletonTestimonialListModal } from './EditorSkeletonTestimonialListModal';
import { Empty } from 'components/empty';
import { Pagination } from 'components/pagination';
import { useEditorStore } from 'store';
import { toast } from 'react-toastify';

export const EditorTestimonialModal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(24); // eslint-disable-line
  const [totalPages, setTotalPages] = useState(1);
  const [quantity, setQuantity] = useState(null);

  const isTestimonialModalOpen = useEditorStore(
    (state) => state.isTestimonialModalOpen
  );
  const setIsTestimonialModalOpen = useEditorStore(
    (state) => state.setIsTestimonialModalOpen
  );

  const cancelButtonRef = useRef(null);

  const fetchTestimonialModal = async ({ queryKey }) => {
    const res = await fetch(
      `/api/testimonial/published?page=${queryKey[1]}&limit=${queryKey[2]}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const { success, data } = await res.json();

    if (!success) {
      setIsTestimonialModalOpen(false);
      const newError = new Error('Error fetching testimonial');
      throw newError;
    }

    setTotalPages(Math.ceil(data.totalTestimonials / queryKey[2]));
    setQuantity(data.totalTestimonials);

    return data.testimonials;
  };

  const {
    data: testimonials,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ['testimonialModal', currentPage, limit],
    fetchTestimonialModal,
    {
      onError: (error) => toast.error(error.message),
    }
  );

  return (
    <>
      <Transition.Root show={isTestimonialModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setIsTestimonialModalOpen}
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
              <div className='inline-block w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle lg:max-w-xl'>
                {isLoading && <EditorSkeletonTestimonialListModal />}
                {isSuccess && (
                  <>
                    {testimonials?.length === 0 && (
                      <Empty
                        title='No Testimonial'
                        subtitle='Get started by creating a testimonial'
                        withCta={false}
                      />
                    )}
                    {testimonials?.length > 0 && (
                      <>
                        <EditorTestimonialListModal items={testimonials} />
                        <Pagination
                          currentPage={currentPage}
                          limit={limit}
                          quantity={quantity}
                          totalPages={totalPages}
                          isAsnyc={true}
                          setCurrentPage={setCurrentPage}
                        />
                      </>
                    )}
                  </>
                )}
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:text-sm'
                    onClick={() => setIsTestimonialModalOpen(false)}
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

EditorTestimonialModal.defaultProps = {
  isTestimonialModalOpen: false,
  setIsTestimonialModalOpen: () => console.log('Handle open'),
};
