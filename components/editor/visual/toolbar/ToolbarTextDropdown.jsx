import { useState, useEffect } from 'react';

export const ToolbarTextDropdown = ({
  propKey,
  propKeyTwo,
  onChange,
  onChangeTwo,
  value,
  valueTwo,
  label,
  labelTwo,
  type,
  options,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    let val = value;
    setInternalValue(val);
  }, [value, type]);

  const handleCheckReset = (value) => {
    // Check if event target value needs to reset the value,
    // for example when value is 'auto' for height and width
    if (value === 'auto' || value === 'none' || value === 'normal') {
      onChange('');
      onChangeTwo(value);
    } else {
      onChangeTwo(value);
    }
  };

  return (
    <div>
      <label
        htmlFor={propKey}
        className='block text-xs font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <input
          type='text'
          name={propKey}
          className='focus:ring-blue-500 focus:border-blue-500 block w-full text-xs border-gray-300 rounded-md'
          value={internalValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChange(e.target.value);
            }
          }}
          onChange={(e) => {
            setInternalValue(e.target.value);
          }}
          onBlur={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <label htmlFor='currency' className='sr-only'>
            {labelTwo}
          </label>
          <select
            className='focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 text-xs rounded-md'
            name={propKeyTwo}
            value={valueTwo}
            onChange={(e) => {
              handleCheckReset(e.target.value);
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
