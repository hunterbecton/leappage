import { convertTime, downloadFile } from 'utils';

export const ExportCard = ({ item, children }) => {
  const fileType = item.url.substring(item.url.lastIndexOf('.') + 1);

  return (
    <li className='relative'>
      <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'>
        <img
          src={item.url}
          alt={item.id}
          loading='lazy'
          className='p-4 object-contain pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          onClick={() => downloadFile(item.url, fileType)}
          className='absolute inset-0 focus:outline-none'
        >
          <span className='sr-only'>Download image</span>
        </button>
      </div>
      <div className='flex items-center mt-2 '>
        <p className='block text-sm font-medium text-gray-900 truncate pointer-events-none'>
          {convertTime(item.createdAt)}
        </p>
        {children}
      </div>
    </li>
  );
};
