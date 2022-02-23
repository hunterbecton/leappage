import { useQuery } from 'react-query';

import { useEditorStore } from 'store';

export const TestimonialOneCard = ({ testimonial }) => {
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
        <div className='col-span-12 animate-pulse select-none md:col-span-6 lg:col-span-4'>
          <div className='h-full text-center'>
            <div className='mb-6 inline-block h-20 w-20 rounded-full border-2 border-gray-100 bg-gray-100 object-cover object-center' />
            <p className='bg-gray-100 leading-relaxed text-gray-100'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <span className='mt-6 mb-4 inline-block h-1 w-10 rounded bg-gray-100'></span>
            <h2 className='title-font bg-gray-100 text-sm font-medium uppercase tracking-wider text-gray-100'>
              Tempor Incididunt
            </h2>
            <p className='bg-gray-100 text-sm text-gray-100'>
              Excepteur Sint Occaecat Cupidatat
            </p>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>
          <div className='h-full text-center'>
            <img
              alt={content.title}
              src={content.profileImage}
              className='mb-6 inline-block h-20 w-20 rounded-full border-2 border-gray-200 bg-gray-100 object-cover object-center'
            />
            <p className='leading-relaxed text-gray-900'>{content.quote}</p>
            <span className='bg-primary mt-6 mb-4 inline-block h-1 w-10 rounded'></span>
            <h2 className='title-font text-sm font-medium uppercase tracking-wider text-gray-900'>
              {content.name}
            </h2>
            <p className='text-sm text-gray-500'>
              {content.position} at {content.company}
            </p>
          </div>
        </div>
      )}
      {isError && isEnabled ? (
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>
          <div className='h-full text-center'>
            <img
              alt='Image not found'
              src='/images/not-found.png'
              className='mb-6 inline-block h-20 w-20 rounded-full border-2 border-gray-200 bg-gray-100 object-cover object-center'
            />
            <p className='leading-relaxed text-gray-900'>Quote not found.</p>
            <span className='bg-primary mt-6 mb-4 inline-block h-1 w-10 rounded'></span>
            <h2 className='title-font text-sm font-medium uppercase tracking-wider text-gray-900'>
              Not Found
            </h2>
            <p className='text-sm text-gray-500'>Not Found</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
