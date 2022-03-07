import { FC } from 'react';
import { ToolbarTextProps } from './_models';

export const ToolbarText: FC<ToolbarTextProps> = ({
  propKey,
  onChange,
  value,
  label,
}) => {
  return (
    <div>
      <label
        htmlFor={propKey}
        className='block text-xs font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          className='block w-full rounded-md border-gray-300 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500'
          type='text'
          name={propKey}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
