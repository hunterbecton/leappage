import { FC } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IconButtonProps } from './_models';

export const IconButton: FC<IconButtonProps> = ({ size, icon }) => {
  switch (size) {
    case 'xs':
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-1 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-5 w-5 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'sm':
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-1.5 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-5 w-5 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'md':
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-5 w-5 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'lg':
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-6 w-6 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'xl':
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-3 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-6 w-6 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    default:
      return (
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span className='flex h-6 w-6 items-center justify-center'>
            {icon}
          </span>
        </button>
      );
  }
};

IconButton.defaultProps = {
  size: 'md',
  icon: <BiPlus aria-hidden='true' />,
};
