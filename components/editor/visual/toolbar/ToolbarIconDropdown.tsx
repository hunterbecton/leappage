import { Fragment, useState, useEffect, FC } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { classNames } from 'utils';
import { Icon, iconList } from 'components/icon';
import { ToolbarIconDropdownProps } from './_models';

export const ToolbarIconDropdown: FC<ToolbarIconDropdownProps> = ({
  onChange,
  value,
}) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (selected !== value) {
      onChange(selected);
    }
  }, [selected, onChange, value]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div>
          <Listbox.Label className='block text-xs font-medium text-gray-700'>
            Icon
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-xs shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <span className='flex items-center'>
                <Icon id={selected.id} variant='dropdown' />
                <span className='ml-3 block truncate'>{selected.name}</span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
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
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {iconList.map((icon) => (
                  <Listbox.Option
                    key={icon.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blue-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
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
