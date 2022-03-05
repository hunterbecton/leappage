import { FC, forwardRef, MutableRefObject } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useFormContext } from 'react-hook-form';

import { classNames } from 'utils';
import { InputRefProps } from './_models';

export const InputRef: FC<InputRefProps> = forwardRef(
  ({ name, label, type, helpText, placeholder, onBlur, readOnly }, ref) => {
    const { formState, register } = useFormContext();

    const { ref: inputRef, ...rest } = register(name);

    return (
      <div>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
        <div className='relative mt-1 rounded-md shadow-sm'>
          <input
            {...rest}
            ref={(e) => {
              inputRef(e);
              (ref as MutableRefObject<HTMLInputElement>).current = e;
            }}
            onBlur={onBlur}
            type={type}
            className={classNames(
              formState.errors[name]
                ? 'border-red-300 text-red-900 placeholder-red-300 focus-visible:border-red-500 focus-visible:ring-red-500'
                : 'border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-500',
              'block w-full rounded-md  pr-10  focus:outline-none sm:text-sm'
            )}
            placeholder={placeholder}
            readOnly={readOnly ? true : false}
          />
          {formState.errors[name] && (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <BiErrorCircle
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {formState.errors[name] && (
          <p className='mt-2 text-sm text-red-600'>
            {formState.errors[name].message}
          </p>
        )}
        {helpText && (
          <p className='mt-2 text-sm text-gray-500' id='email-description'>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

InputRef.defaultProps = {
  helpText: '',
  placeholder: '',
  readOnly: false,
  type: 'text',
};
