import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiFontFamily, BiCheck } from 'react-icons/bi';
import slugify from 'slugify';
import { useFormContext } from 'react-hook-form';

import { classNames } from 'utils';
import { fonts } from 'data/fonts';
import Image from 'next/image';

export const FontPicker = ({ name, label }) => {
  const { setValue, formState, watch, register } = useFormContext();

  // Manually register on mount
  useEffect(() => {
    register(name);
  }, []);

  const font = watch(name);

  const handleChange = (newFont) => {
    setValue(name, newFont);
  };

  return (
    <div>
      <Listbox value={font} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm font-medium text-gray-700'>
              {label}
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-4 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                <div className='relative flex h-3 w-full overflow-hidden'>
                  <Image
                    src={`/fonts/preview/${slugify(font, {
                      lower: false,
                    })}.svg`}
                    alt={font}
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left center'
                  />
                </div>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <BiFontFamily
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
                <Listbox.Options className='z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {fonts.map((font) => (
                    <Listbox.Option
                      key={font}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-gray-50 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-4 px-3'
                        )
                      }
                      value={font}
                    >
                      {({ selected }) => (
                        <div className='flex items-center justify-between'>
                          <div className='relative h-3 w-full overflow-hidden'>
                            <Image
                              src={`/fonts/preview/${slugify(font, {
                                lower: false,
                              })}.svg`}
                              alt={font}
                              layout='fill'
                              objectFit='contain'
                              objectPosition='left center'
                            />
                          </div>
                          {selected && (
                            <BiCheck
                              className='h-5 w-5 text-blue-600'
                              aria-hidden='true'
                            />
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {formState.errors[name] && (
        <p className='mt-2 text-sm text-red-600'>
          {formState.errors[name].message}
        </p>
      )}
    </div>
  );
};

FontPicker.defaultProps = {
  label: 'Font Family',
  font: 'Inter',
};
