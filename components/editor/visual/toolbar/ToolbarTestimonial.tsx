import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useEditorStore } from 'store';
import { Button } from 'components/button';
import Image from 'next/image';
import { FallbackImage } from 'components/image';
import { ToolbarTestimonialProps } from './_models';

export const ToolbarTestimonial: FC<ToolbarTestimonialProps> = ({
  id,
  isGroup: defaultIsGroup,
  groupName,
  groupIndex,
  testimonial,
}) => {
  const setIsTestimonialModalOpen = useEditorStore(
    (state) => state.setIsTestimonialModalOpen
  );
  const setActiveFieldId = useEditorStore((state) => state.setActiveFieldId);

  const isGroup = useEditorStore((state) => state.isGroup);
  const setIsGroup = useEditorStore((state) => state.setIsGroup);

  const setGroupName = useEditorStore((state) => state.setGroupName);
  const setGroupIndex = useEditorStore((state) => state.setGroupIndex);

  useEffect(() => {
    setIsGroup(defaultIsGroup);
  }, []);

  const handleSelect = () => {
    if (isGroup) {
      setGroupName(groupName);
      setGroupIndex(groupIndex);
    }
    setActiveFieldId(id);
    setIsTestimonialModalOpen(true);
  };

  const fetchTestimonial = async () => {
    const res = await fetch(
      `/api/testimonial/${testimonial.id}?status=published`,
      {
        method: 'GET',
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
  };

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(testimonial.id, fetchTestimonial, {
    retry: 1,
  });

  return (
    <>
      {isLoading && (
        <div>
          <div className='border-1 flex animate-pulse select-none flex-col overflow-hidden rounded border-gray-100 shadow'>
            <div className='flex-shrink-0'>
              <div className='relative h-48 w-full overflow-hidden bg-gray-100' />
            </div>
            <div className='flex flex-1 flex-col justify-between bg-white p-4'>
              <div className='flex-1'>
                <p className='max-w-fit bg-gray-100 text-xs font-bold uppercase text-gray-100'>
                  Lorem Ipsum
                </p>
                <p className='mt-2 block max-w-fit bg-gray-100 text-sm font-medium text-gray-100'>
                  Duis aute irure dolor in reprehenderit in voluptate
                </p>
              </div>
            </div>
          </div>
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2'
            text='Change'
            title='Change testimonial'
            onClick={() => null}
            disabled={true}
          />
        </div>
      )}
      {isSuccess && (
        <div>
          <div className='border-1 flex flex-col overflow-hidden rounded border-gray-300 shadow'>
            <div className='flex-shrink-0'>
              <div className='relative h-48 w-full overflow-hidden'>
                <FallbackImage
                  src={content.profileImage}
                  alt={content.name}
                  layout='fill'
                  objectFit='cover'
                  fallbackSrc='/images/not-found.png'
                />
              </div>
            </div>
            <div className='flex flex-1 flex-col justify-between bg-white p-4'>
              <div className='flex-1'>
                <p className='text-xs font-bold uppercase text-gray-400'>
                  {content.categoryInfo && content.categoryInfo.length > 0
                    ? content.categoryInfo[0].title
                    : 'Uncategorized'}
                </p>
                <p className='mt-2 block text-sm font-medium text-gray-700'>
                  {content.title}
                </p>
              </div>
            </div>
          </div>
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2'
            text='Change'
            title='Change testimonial'
            onClick={() => handleSelect()}
          />
        </div>
      )}
      {isError && (
        <div>
          <div className='border-1 flex flex-col overflow-hidden rounded border-gray-100 shadow'>
            <div className='flex-shrink-0'>
              <div className='relative h-48 w-full overflow-hidden'>
                <Image
                  src='/images/not-found.png'
                  alt='Image not found'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            </div>
            <div className='flex flex-1 flex-col justify-between bg-white p-4'>
              <div className='flex-1'>
                <p className='text-xs font-bold uppercase text-gray-400'>
                  Content Not Found
                </p>
                <p className='mt-2 block text-sm font-medium text-gray-700'>
                  Content descrition unavailable.
                </p>
              </div>
            </div>
          </div>
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2'
            text='Change'
            title='Change testimonial'
            onClick={() => handleSelect()}
          />
        </div>
      )}
    </>
  );
};
