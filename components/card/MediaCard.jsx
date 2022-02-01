import Link from 'next/link';

export const MediaCard = ({ item, href }) => {
  return (
    <li className='relative'>
      <Link href={`${href}${item._id}`}>
        <a className='focus:outline-none'>
          <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-blue-500 overflow-hidden'>
            <img
              src={item.url}
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
          </div>
        </a>
      </Link>
      <p className='mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none lg:text-xs'>
        {item.title}
      </p>
    </li>
  );
};
