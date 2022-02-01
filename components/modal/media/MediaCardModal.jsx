import { useFormContext } from 'react-hook-form';

import { useMediaModalStore } from 'store';

export const MediaCardModal = ({ item }) => {
  const setIsMediaModalOpen = useMediaModalStore(
    (state) => state.setIsMediaModalOpen
  );
  const activeImageName = useMediaModalStore((state) => state.activeImageName);

  const { setValue } = useFormContext(); // retrieve all hook methods

  const handleSelect = () => {
    setValue(activeImageName, item.url);
    setIsMediaModalOpen(false);
  };

  return (
    <li className='relative'>
      <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-blue-500 overflow-hidden'>
        <img
          src={item.url}
          alt={item.title}
          loading='lazy'
          className='p-4 object-contain pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          onClick={handleSelect}
          className='absolute inset-0 focus:outline-none'
        >
          <span className='sr-only'>View details for image</span>
        </button>
      </div>
      <p className='mt-2 block text-xs font-medium text-gray-900 truncate pointer-events-none'>
        {item.title}
      </p>
    </li>
  );
};
