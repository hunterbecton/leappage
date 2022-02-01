import { useNode } from '@craftjs/core';
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';

import { classNames } from 'utils';

export const ToolbarSection = ({ title, props, summary, full, children }) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));

  return (
    <Disclosure
      as='div'
      className='p-2 bg-white border border-gray-300 rounded-md'
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <dt className='text-xs'>
            <Disclosure.Button className='text-left w-full flex justify-between items-center text-gray-400'>
              <span className='font-medium text-gray-900'>{title}</span>
              <span className='ml-6 h-7 flex items-center'>
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
  props: {},
  summary: 'Summary',
};
