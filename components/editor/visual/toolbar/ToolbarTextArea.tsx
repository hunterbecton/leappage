import { FC } from 'react';
import { ToolbarTextAreaProps } from './_models';

export const ToolbarTextArea: FC<ToolbarTextAreaProps> = ({
  propKey,
  value,
  onChange,
  label,
  rows = 5,
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
        <textarea
          rows={rows}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          name={propKey}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
