import Image from 'next/image';
import { useQuery } from 'react-query';

import { useEditorStore } from 'store';

export const TestimonialTwoCard = ({ testimonial }) => {
  const isEnabled = useEditorStore((state) => state.isEnabled);

  const fetchTestimonial = async () => {
    const res = await fetch(`/api/testimonial/published/${testimonial.id}`, {
      method: 'GET',
      credentials: 'include',
    });

    const { success, data } = await res.json();

    if (!success) {
      throw Error(data.message);
    }

    return data.testimonial;
  };

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(testimonial.id, fetchTestimonial, {
    retry: 1,
    refetchOnWindowFocus: isEnabled,
    // initialData: {
    //   title: testimonial.title,
    //   quote: testimonial.quote,
    //   name: testimonial.name,
    //   position: testimonial.position,
    //   company: testimonial.position,
    //   profileImage: testimonial.profileImage,
    // },
  });

  return (
    <>
      {isLoading && (
        <div className='col-span-12 animate-pulse select-none lg:col-span-6'>
          <div className='h-full rounded bg-gray-100 p-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='mb-4 block h-5 w-5 text-gray-400'
              viewBox='0 0 975.036 975.036'
            >
              <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
            </svg>
            <p className='mb-6 bg-gray-200 leading-relaxed text-gray-200'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='inline-flex items-center'>
              <div className='h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 object-cover object-center' />
              <span className='flex flex-grow flex-col pl-4'>
                <span className='title-font bg-gray-200 text-sm font-medium uppercase tracking-wider text-gray-200'>
                  Tempor Incididunt
                </span>
                <span className='bg-gray-200 text-sm text-gray-200'>
                  Excepteur Sint Occaecat Cupidatat
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='col-span-12 lg:col-span-6'>
          <div className='h-full rounded bg-gray-100 p-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='mb-4 block h-5 w-5 text-gray-400'
              viewBox='0 0 975.036 975.036'
            >
              <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
            </svg>
            <p className='mb-6 leading-relaxed text-gray-900'>
              {content.quote}
            </p>
            <div className='inline-flex items-center'>
              <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200'>
                <Image
                  alt={content.title}
                  src={content.profileImage}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <span className='flex flex-grow flex-col pl-4'>
                <span className='title-font text-sm font-medium uppercase tracking-wider text-gray-900'>
                  {content.name}
                </span>
                <span className='text-sm text-gray-500'>
                  {content.position}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      {isError && isEnabled ? (
        <div className='col-span-12 lg:col-span-6'>
          <div className='h-full rounded bg-gray-100 p-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='mb-4 block h-5 w-5 text-gray-400'
              viewBox='0 0 975.036 975.036'
            >
              <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
            </svg>
            <p className='mb-6 leading-relaxed text-gray-900'>
              Quote not found.
            </p>
            <div className='inline-flex items-center'>
              <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200'>
                <Image
                  alt='Image not found'
                  src='/images/not-found.png'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <span className='flex flex-grow flex-col pl-4'>
                <span className='title-font text-sm font-medium uppercase tracking-wider text-gray-900'>
                  Not Found
                </span>
                <span className='text-sm text-gray-500'>Not Found </span>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
