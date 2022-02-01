import Link from 'next/link';

export const ProjectCard = ({ item, href, children }) => {
  return (
    <li className='relative'>
      <Link href={`${href}${item._id}`}>
        <a className='focus:outline-none'>
          <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-blue-500 overflow-hidden'>
            {item.featureImg && (
              <>
                <img
                  src={item.featureImg}
                  alt={item.title}
                  loading='lazy'
                  className='p-4 object-contain pointer-events-none group-hover:opacity-75'
                />
                <button
                  type='button'
                  className='absolute inset-0 focus:outline-none'
                >
                  <span className='sr-only'>View details for image</span>
                </button>
              </>
            )}
            {!item.featureImg && (
              <div className='w-full h-full flex items-center justify-center pointer-events-none group-hover:opacity-75'>
                <p className='text-sm text-gray-500 lg:text-md'>
                  Preview Unavailable
                </p>
                <button
                  type='button'
                  className='absolute inset-0 focus:outline-none'
                >
                  <span className='sr-only'>View details for image</span>
                </button>
              </div>
            )}
          </div>
        </a>
      </Link>
      <div className='flex items-center mt-2 '>
        <p className='block text-sm font-medium text-gray-900 truncate pointer-events-none'>
          {item.title}
        </p>
        {children}
      </div>
    </li>
  );
};
