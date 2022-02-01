import { BiCalendar, BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';

export const SkeletonActivityCard = () => {
  return (
    <li className='animate-pulse select-none'>
      <div className='px-4 py-4 flex items-center'>
        <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
          <div className='truncate'>
            <div className='flex text-sm'>
              <p className='font-medium bg-gray-200 text-gray-200 truncate'>
                Loading Project
              </p>
              <p className='ml-1 flex-shrink-0 font-normal bg-gray-200 text-gray-200 capitalize'>
                in projects
              </p>
            </div>
            <div className='mt-2 flex'>
              <div className='flex items-center text-sm text-gray-200'>
                <BiCalendar
                  className='flex-shrink-0 mr-1.5 h-5 w-5 bg-gray-200 text-gray-200'
                  aria-hidden='true'
                />
                <p className='bg-gray-200'>Updated on Septermber 29, 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className='ml-5 flex-shrink-0'>
          <BiChevronRight
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </div>
    </li>
  );
};
