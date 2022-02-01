import { BiError } from 'react-icons/bi';

import { useAlertStore } from 'store';

export const Alert = () => {
  const title = useAlertStore((state) => state.title);
  const message = useAlertStore((state) => state.message);

  return (
    <div className='w-full absolute bottom-12 left-0 z-40'>
      <div className='mx-auto rounded-md bg-red-50 p-4 max-w-2xl shadow-sm'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <BiError className='h-5 w-5 text-red-400' aria-hidden='true' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-red-800'>{title}</h3>
            <div className='mt-2 text-sm text-red-700'>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
