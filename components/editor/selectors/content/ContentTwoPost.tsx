import { FC } from 'react';
import { useQuery } from 'react-query';

import { useEditorStore } from 'store';
import { ContentPostProps } from './_models';

export const ContentTwoPost: FC<ContentPostProps> = ({ post }) => {
  const isPublic = useEditorStore((state) => state.isPublic);

  const fetchPost = async () => {
    if (isPublic) {
      // Fetch public content for live pages
      const res = await fetch(`/api/content/public/${post.id}`);

      const { success, data } = await res.json();

      if (!success) {
        throw Error(data.message);
      }

      if (success && !data.content) {
        throw Error('Content not found.');
      }

      return data.content;
    } else {
      // Fetch only published content when not in edit mode
      const res = await fetch(`/api/content/${post.id}?status=published`, {
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        throw Error(data.message);
      }

      if (success && !data.content) {
        throw Error('Content not found.');
      }

      return data.content;
    }
  };

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(post.id, fetchPost, {
    retry: 1,
    refetchOnWindowFocus: !isPublic,
  });

  return (
    <>
      {isLoading && (
        <div className='-my-8 animate-pulse select-none divide-y-2 divide-gray-100'>
          <div className='flex flex-wrap py-8 md:flex-nowrap'>
            <div className='mb-6 flex w-full flex-shrink-0 flex-col md:mb-0 md:w-64'>
              <span className='max-w-fit bg-gray-100 text-sm font-bold uppercase text-gray-100'>
                Lorem Ipsum
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='mb-2 bg-gray-100 text-2xl font-medium leading-tight text-gray-100'>
                Duis aute irure dolor in reprehenderit in voluptate
              </h2>
              <p className='bg-gray-100 leading-relaxed text-gray-100'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className='group mt-4 inline-flex items-center bg-gray-100 text-gray-100'>
                Read More
                <svg
                  className='mt-0.5 ml-1 h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 5l7 7-7 7'
                  ></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='-my-8 divide-y-2 divide-gray-100'>
          <div className='flex flex-wrap py-8 md:flex-nowrap'>
            <div className='mb-6 flex w-full flex-shrink-0 flex-col md:mb-0 md:w-64'>
              <span className='text-sm font-bold uppercase text-gray-400'>
                {content.categoryInfo && content.categoryInfo.length > 0
                  ? content.categoryInfo.title
                  : 'Uncategorized'}
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='mb-2 text-2xl font-medium leading-tight text-gray-800'>
                {content.title}
              </h2>
              <p className='leading-relaxed text-gray-500'>
                {content.description}
              </p>
              <a
                href={content.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group text-primary hover:text-primary-hover mt-4 inline-flex items-center transition'
              >
                Read More
                <svg
                  className='mt-0.5 ml-1 h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 5l7 7-7 7'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
      {isError && !isPublic ? (
        <div className='-my-8 divide-y-2 divide-gray-100'>
          <div className='flex flex-wrap py-8 md:flex-nowrap'>
            <div className='mb-6 flex w-full flex-shrink-0 flex-col md:mb-0 md:w-64'>
              <span className='text-sm font-bold uppercase text-gray-400'>
                Not Found
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='mb-2 text-2xl font-medium leading-tight text-gray-800'>
                Content Not Found
              </h2>
              <p className='leading-relaxed text-gray-500'>
                Content descrition unavailable.
              </p>
              <p className='group text-primary hover:text-primary-hover mt-4 inline-flex items-center transition'>
                Not Found
                <svg
                  className='mt-0.5 ml-1 h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 5l7 7-7 7'
                  ></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
