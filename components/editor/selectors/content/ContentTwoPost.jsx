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
    // initialData: {
    //   arrayId: post.arrayId,
    //   id: post.id,
    //   title: post.title,
    //   description: post.description,
    //   categoryInfo: [
    //     {
    //       title:
    //         post.categoryInfo && post.categoryInfo.length > 0
    //           ? post.categoryInfo[0].title
    //           : "Uncategorized",
    //     },
    //   ],
    //   feature: post.feature,
    //   url: post.url,
    // },
  });

  return (
    <>
      {isLoading && (
        <div className='-my-8 animate-pulse select-none divide-y-2 divide-gray-100'>
          <div className='flex flex-wrap py-8 md:flex-nowrap'>
            <div className='mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64'>
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
            <div className='mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64'>
              <span className='text-sm font-bold uppercase text-gray-400'>
                {content.categoryInfo && content.categoryInfo.length > 0
                  ? content.categoryInfo[0].title
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
                className='group mt-4 inline-flex items-center text-blue-500 transition hover:text-blue-600'
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
      {isError && isEnabled ? (
        <div className='-my-8 divide-y-2 divide-gray-100'>
          <div className='flex flex-wrap py-8 md:flex-nowrap'>
            <div className='mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64'>
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
              <p className='group mt-4 inline-flex items-center text-blue-500 transition hover:text-blue-600'>
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
