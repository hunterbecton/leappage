import { Disclosure } from '@headlessui/react';
import { FC } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { classNames } from 'utils';
import { ToolbarSectionProps } from './_models';

export const ToolbarSection: FC<ToolbarSectionProps> = ({
  title,
  children,
}) => {
  return (
    <Disclosure
      as='div'
      className='rounded-md border border-gray-300 bg-white p-2'
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <dt className='text-xs'>
            <Disclosure.Button className='flex w-full items-center justify-between text-left text-gray-400'>
              <span className='font-medium text-gray-900'>{title}</span>
              <span className='ml-6 flex h-7 items-center'>
                <BiChevronDown
                  className={classNames(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-4 w-4'
                  )}
                  aria-hidden='true'
                />
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as='dd'>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

ToolbarSection.defaultProps = {
  title: 'Size',
};
