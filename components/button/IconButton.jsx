import { BiPlus } from 'react-icons/bi';

export const IconButton = ({ size, icon }) => {
  switch (size) {
    case 'xsm':
      return (
        <button
          type='button'
          className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-5 w-5 flex items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'sm':
      return (
        <button
          type='button'
          className='inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-5 w-5 flex items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'md':
      return (
        <button
          type='button'
          className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-5 w-5 flex items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'lg':
      return (
        <button
          type='button'
          className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-6 w-6 flex items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    case 'xlg':
      return (
        <button
          type='button'
          className='inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-6 w-6 flex items-center justify-center'>
            {icon}
          </span>
        </button>
      );
    default:
      return (
        <button
          type='button'
          className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          <span className='h-6 w-6 flex items-center justify-center'>
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
