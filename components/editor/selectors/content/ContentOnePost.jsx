import { useQuery } from 'react-query';

import { useEditorStore } from 'store';

export const ContentOnePost = ({ post }) => {
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
        <div className='relative col-span-12 mb-10 space-y-4 md:col-span-6 lg:col-span-4 animate-pulse select-none'>
          <div className='relative block w-full h-64 overflow-hidden rounded bg-gray-200'></div>
          <p className='text-xs font-bold text-gray-200 bg-gray-200 max-w-fit uppercase'>
            Lorem Ipsum
          </p>
          <p className='block text-2xl font-medium leading-tight text-gray-200 bg-gray-200'>
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
            className='relative block w-full h-64 overflow-hidden rounded'
          >
            <img
              alt={content.title}
              className='object-cover object-center w-full h-full transition duration-500 ease-out transform scale-100 hover:scale-105'
              src={content.feature}
            />
          </a>
          <p className='text-xs font-bold text-gray-400 uppercase'>
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
      {isError && (
        <div className='relative col-span-12 mb-10 space-y-4 md:col-span-6 lg:col-span-4'>
          <div className='relative block w-full h-64 overflow-hidden rounded'>
            <img
              alt='Image not found'
              className='object-cover object-center w-full h-full transition duration-500 ease-out transform scale-100 hover:scale-105'
              src='/images/not-found.png'
            />
          </div>
          <p className='text-xs font-bold text-gray-400 uppercase'>Not Found</p>
          <p className='block text-2xl font-medium leading-tight text-gray-700 transition hover:text-gray-900'>
            Content Not Found
          </p>
        </div>
      )}
    </>
  );
};
