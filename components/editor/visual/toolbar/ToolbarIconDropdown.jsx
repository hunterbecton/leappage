import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { classNames } from 'utils';
import { Icon, iconList } from 'components/icon';

export const ToolbarIconDropdown = ({
  propKey,
  onChange,
  value,
  label,
  type,
  renderStyle,
  dropdownStyle,
  ...props
}) => {
  const [selected, setSelected] = useState(value);

  // Update editor state when local changes
  useEffect(() => {
    if (selected !== value) {
      onChange(selected);
    }
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div>
          <Listbox.Label className='block text-xs font-medium text-gray-700'>
            Icon
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full bg-white text-xs border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'>
              <span className='flex items-center'>
                <Icon id={selected.id} variant='dropdown' />
                <span className='ml-3 block truncate'>{selected.name}</span>
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <BiChevronDown
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='text-xs absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none'>
                {iconList.map((icon) => (
                  <Listbox.Option
                    key={icon.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={icon}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <Icon id={icon.id} variant='dropdown' />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {icon.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <BiCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

ToolbarIconDropdown.defaultProps = {
  dropdownStyle: 'w-5 h-5 text-gray-900',
  renderStyle: 'w-5 h-5 text-white',
};
