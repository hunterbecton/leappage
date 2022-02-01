export const ToolbarRange = ({
  propKey,
  onChange,
  value,
  label,
  min,
  max,
  step,
  type,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={propKey}
        className='block text-xs font-medium text-gray-700'
      >
        {label}
      </label>
      <input
        className='mt-1 text-xs shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md'
        type='number'
        name={propKey}
        value={value}
        min={min}
        max={max}
        step={step}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange(e.target.value);
          }
        }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      />
      <input
        className='mt-1 rounded-lg overflow-hidden appearance-none bg-gray-200 h-3 w-full'
        type='range'
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      />
    </div>
  );
};

ToolbarRange.defaultProps = {
  min: 0,
  max: 25,
  step: 1,
};
