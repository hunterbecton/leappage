export const ToolbarText = ({
  propKey,
  onChange,
  value,
  label,
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
      <div className='mt-1 relative'>
        <input
          className='text-xs shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md'
          type='text'
          name={propKey}
          value={value}
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
      </div>
    </div>
  );
};
