import { useQuery } from 'react-query';

import { useEditorStore } from 'store';

export const ContentTwoPost = ({ post }) => {
  const isEnabled = useEditorStore((state) => state.isEnabled);

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

  const {
    data: content,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(post.id, fetchPost, {
    retry: 1,
    refetchOnWindowFocus: isEnabled,
    initialData: {
      arrayId: post.arrayId,
      id: post.id,
      title: post.title,
      description: post.description,
      categoryInfo: [
        {
          title:
            post.categoryInfo && post.categoryInfo.length > 0
              ? post.categoryInfo[0].title
              : 'Uncategorized',
        },
      ],
      feature: post.feature,
      url: post.url,
    },
  });

  return (
    <>
      {isLoading && (
        <div className='-my-8 divide-y-2 divide-gray-100 animate-pulse select-none'>
          <div className='py-8 flex flex-wrap md:flex-nowrap'>
            <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
              <span className='text-sm font-bold text-gray-200 bg-gray-200 uppercase max-w-fit'>
                Lorem Ipsum
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='text-2xl mb-2 font-medium leading-tight text-gray-200 bg-gray-200'>
                Duis aute irure dolor in reprehenderit in voluptate
              </h2>
              <p className='leading-relaxed text-gray-200 bg-gray-200'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className='inline-flex items-center mt-4 text-gray-200 bg-gray-200 group'>
                Read More
                <svg
                  className='w-4 h-4 mt-0.5 ml-1'
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
          <div className='py-8 flex flex-wrap md:flex-nowrap'>
            <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
              <span className='text-sm font-bold text-gray-400 uppercase'>
                {content.categoryInfo && content.categoryInfo.length > 0
                  ? content.categoryInfo[0].title
                  : 'Uncategorized'}
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='text-2xl mb-2 font-medium leading-tight text-gray-800'>
                {content.title}
              </h2>
              <p className='leading-relaxed text-gray-500'>
                {content.description}
              </p>
              <a
                href={content.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center mt-4 text-blue-500 transition hover:text-blue-600 group'
              >
                Read More
                <svg
                  className='w-4 h-4 mt-0.5 ml-1'
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
      {isError && (
        <div className='-my-8 divide-y-2 divide-gray-100'>
          <div className='py-8 flex flex-wrap md:flex-nowrap'>
            <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
              <span className='text-sm font-bold text-gray-400 uppercase'>
                Not Found
              </span>
            </div>
            <div className='md:flex-grow'>
              <h2 className='text-2xl mb-2 font-medium leading-tight text-gray-800'>
                Content Not Found
              </h2>
              <p className='leading-relaxed text-gray-500'>
                Content descrition unavailable.
              </p>
              <p className='inline-flex items-center mt-4 text-blue-500 transition hover:text-blue-600 group'>
                Not Found
                <svg
                  className='w-4 h-4 mt-0.5 ml-1'
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
    </>
  );
};
