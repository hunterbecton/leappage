import { BiErrorCircle } from 'react-icons/bi';

import { classNames } from 'utils';

export const Input = ({
  name,
  label,
  type,
  disabled,
  helpText,
  placeholder,
  register,
  formState,
  onBlur,
  readOnly,
}) => {
  const { errors } = formState;

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <input
          {...register(name)}
          disabled={disabled}
          onBlur={onBlur}
          type={type}
          className={classNames(
            errors[name]
              ? 'border-red-300 text-red-900 placeholder-red-300 focus-visible:ring-red-500 focus-visible:border-red-500'
              : 'focus-visible:ring-blue-500 focus-visible:border-blue-500 border-gray-300',
            'block w-full pr-10  focus:outline-none  sm:text-sm rounded-md'
          )}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {errors[name] && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <BiErrorCircle
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className='mt-2 text-sm text-red-600'>{errors[name].message}</p>
      )}
      {helpText && (
        <p className='mt-2 text-sm text-gray-500' id='email-description'>
          {helpText}
        </p>
      )}
    </div>
  );
};

Input.defaultProps = {
  helpText: false,
  variant: 'default',
  placeholder: '',
  readOnly: false,
  type: 'text',
  register: () => null,
  formState: {
    errors: [],
  },
  disabled: false,
};
