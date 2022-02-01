import { useQuery } from 'react-query';

export const TestimonialOneCard = ({ testimonial }) => {
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
    initialData: {
      title: testimonial.title,
      quote: testimonial.quote,
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.position,
      profileImage: testimonial.profileImage,
    },
  });

  return (
    <>
      {isLoading && (
        <div className='col-span-12 md:col-span-6 lg:col-span-4 animate-pulse select-none'>
          <div className='h-full text-center'>
            <div className='w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-200' />
            <p className='leading-relaxed text-gray-200 bg-gray-200'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <span className='inline-block h-1 w-10 rounded bg-gray-200 mt-6 mb-4'></span>
            <h2 className='text-gray-200 bg-gray-200 font-medium title-font tracking-wider text-sm uppercase'>
              Tempor Incididunt
            </h2>
            <p className='text-gray-200 bg-gray-200 text-sm'>
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
              className='w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
            />
            <p className='leading-relaxed text-gray-900'>{content.quote}</p>
            <span className='inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4'></span>
            <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm uppercase'>
              {content.name}
            </h2>
            <p className='text-gray-500 text-sm'>
              {content.position} at {content.company}
            </p>
          </div>
        </div>
      )}
      {isError && (
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>
          <div className='h-full text-center'>
            <img
              alt='Image not found'
              src='/images/not-found.png'
              className='w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
            />
            <p className='leading-relaxed text-gray-900'>Quote not found.</p>
            <span className='inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4'></span>
            <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm uppercase'>
              Not Found
            </h2>
            <p className='text-gray-500 text-sm'>Not Found</p>
          </div>
        </div>
      )}
    </>
  );
};
