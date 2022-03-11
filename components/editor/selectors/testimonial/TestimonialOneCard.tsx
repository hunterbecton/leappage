import { FallbackImage } from 'components/image';
import Image from 'next/image';
import { FC } from 'react';
import { useQuery } from 'react-query';

import { useEditorStore } from 'store';
import { TestimonialCardProps } from './_models';

export const TestimonialOneCard: FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  const isPublic = useEditorStore((state) => state.isPublic);

  const fetchTestimonial = async () => {
    if (isPublic) {
      // Fetch only published content when not in edit mode
      const res = await fetch(`/api/testimonial/public/${testimonial.id}`);

      const { success, data } = await res.json();

      if (!success) {
        throw Error(data.message);
      }

      if (success && !data.testimonial) {
        throw Error('Testimonial not found.');
      }

      return data.testimonial;
    } else {
      // Fetch only published content when not in edit mode
      const res = await fetch(
        `/api/testimonial/${testimonial.id}?status=published`,
        {
          credentials: 'include',
        }
      );

      const { success, data } = await res.json();

      if (!success) {
        throw Error(data.message);
      }

      if (success && !data.testimonial) {
        throw Error('Testimonial not found.');
      }

      return data.testimonial;
    }
  };

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(testimonial.id, fetchTestimonial, {
    retry: 1,
    refetchOnWindowFocus: !isPublic,
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
            <div className='relative mb-6 inline-block h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100'>
              <FallbackImage
                alt={content.title}
                src={content.profileImage}
                layout='fill'
                objectFit='cover'
                fallbackSrc='/images/not-found.png'
              />
            </div>
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
      {isError && !isPublic ? (
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>
          <div className='h-full text-center'>
            <div className='relative mb-6 inline-block h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100'>
              <Image
                alt='Image not found'
                src='/images/not-found.png'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <p className='leading-relaxed text-gray-900'>
              Testimonial not found.
            </p>
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
