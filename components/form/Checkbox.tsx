import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckboxProps } from './_models';

export const Checkbox: FC<CheckboxProps> = ({ name, label, description }) => {
  const { register } = useFormContext();

  return (
    <div className='relative flex items-start'>
      <div className='flex h-5 items-center'>
        <input
          {...register(name)}
          aria-describedby={`${name}-description`}
          name={name}
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        />
      </div>
      <div className='ml-3 text-sm'>
        <label htmlFor={name} className='font-medium text-gray-700'>
          {label}
        </label>
        <span id='comments-description' className='text-gray-500'>
          <span className='sr-only'>{label}</span>
          {description}
        </span>
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  label: 'Subscribe',
  description: ' to marketing emails from LeapPage',
};
