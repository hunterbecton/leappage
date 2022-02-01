import { BiCalendar, BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';

import { convertTime } from 'utils';

export const ActivityCard = ({ item }) => {
  return (
    <li>
      <Link
        href={
          item.type === 'project'
            ? `/projects/${item._id}`
            : `/templates/${item._id}`
        }
      >
        <a className='block hover:bg-gray-50'>
          <div className='px-4 py-4 flex items-center'>
            <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
              <div className='truncate'>
                <div className='flex text-sm'>
                  <p className='font-medium text-blue-600 truncate'>
                    {item.title}
                  </p>
                  <p className='ml-1 flex-shrink-0 font-normal text-gray-500 capitalize'>
                    in {item.type}s
                  </p>
                </div>
                <div className='mt-2 flex'>
                  <div className='flex items-center text-sm text-gray-500'>
                    <BiCalendar
                      className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <p>
                      Updated on{' '}
                      <time dateTime={item.updatedAt}>
                        {convertTime(item.updatedAt)}
                      </time>
                    </p>
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
        </a>
      </Link>
    </li>
  );
};
