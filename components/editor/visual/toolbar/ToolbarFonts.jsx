import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiCheck, BiFontFamily } from 'react-icons/bi';

import { fontFamilyItems } from 'components/editor/visual/toolbar/defaultFonts';
import { classNames } from 'utils';

export const ToolbarFonts = ({
  propKey,
  onChange,
  value,
  label,
  options,
  type,
  ...props
}) => {
  return (
    <div>
      <Listbox value={value} onChange={(e) => onChange(e)}>
        <Listbox.Label className='block text-xs font-medium text-gray-700'>
          {label}
        </Listbox.Label>
        <div className='mt-1 relative'>
          <Listbox.Button className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-xs text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'>
            <span
              className='block truncate'
              style={{
                fontFamily: `${value.name},${value.fallback}`,
              }}
            >
              {value.name}
            </span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <BiFontFamily
                className='h-4 w-4 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-xs ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none'>
              {fontFamilyItems.map((font) => (
                <Listbox.Option
                  key={font.name}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-blue-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={font}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className='font-normal block truncate'
                        style={{
                          fontFamily: `${font.name},${font.fallback}`,
                        }}
                      >
                        {font.name}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-blue-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <BiCheck className='h-4 w-4' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
