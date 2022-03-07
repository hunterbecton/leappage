import { FallbackImage } from 'components/image';
import Image from 'next/image';
import { FC } from 'react';
import { useQuery } from 'react-query';

import { useEditorStore } from 'store';
import { ContentPostProps } from './_models';

export const ContentOnePost: FC<ContentPostProps> = ({ post }) => {
  const fetchPost = async () => {
    const res = await fetch(`/api/content/published/${post.id}`, {
      method: 'GET',
      credentials: 'include',
    });

    const { success, data } = await res.json();

    if (!success) {
      throw Error(data.message);
    }

    return data.content;
  };

  const isEnabled = useEditorStore((state) => state.isEnabled);

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(post.id, fetchPost, {
    retry: 1,
    refetchOnWindowFocus: isEnabled,
  });

  return (
    <>
      {isLoading && (
        <div className='selct-none relative col-span-12 mb-10 animate-pulse select-none space-y-4 md:col-span-6 lg:col-span-4'>
          <div className='relative block h-64 w-full overflow-hidden rounded bg-gray-100'></div>
          <p className='max-w-fit bg-gray-100 text-xs font-bold uppercase text-gray-100'>
            Lorem Ipsum
          </p>
          <p className='block bg-gray-100 text-2xl font-medium leading-tight text-gray-100'>
            Duis aute irure dolor in reprehenderit in voluptate
          </p>
        </div>
      )}
      {isSuccess && (
        <div className='relative col-span-12 mb-10 space-y-4 md:col-span-6 lg:col-span-4'>
          <a
            href={content.url}
            target='_blank'
            rel='noopener noreferrer'
            className='relative block h-64 w-full overflow-hidden rounded'
          >
            <div className='h-full w-full scale-100 transform transition duration-500 ease-out hover:scale-105'>
              <FallbackImage
                src={content.feature}
                alt={content.title}
                layout='fill'
                objectFit='cover'
                fallbackSrc='/images/not-found.png'
              />
            </div>
          </a>
          <p className='text-xs font-bold uppercase text-gray-400'>
            {content.categoryInfo && content.categoryInfo.length > 0
              ? content.categoryInfo[0].title
              : 'Uncategorized'}
          </p>
          <a
            href={content.url}
            target='_blank'
            rel='noopener noreferrer'
            className='block text-2xl font-medium leading-tight text-gray-700 transition hover:text-gray-900'
          >
            {content.title}
          </a>
        </div>
      )}
      {isError && isEnabled ? (
        <div className='relative col-span-12 mb-10 space-y-4 md:col-span-6 lg:col-span-4'>
          <div className='relative block h-64 w-full overflow-hidden rounded'>
            <div className='h-full w-full scale-100 transform transition duration-500 ease-out hover:scale-105'>
              <Image
                src='/images/not-found.png'
                alt='Image not found'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
          <p className='text-xs font-bold uppercase text-gray-400'>Not Found</p>
          <p className='block text-2xl font-medium leading-tight text-gray-700 transition hover:text-gray-900'>
            Content Not Found
          </p>
        </div>
      ) : null}
    </>
  );
};
