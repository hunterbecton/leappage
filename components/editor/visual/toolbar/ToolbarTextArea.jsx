export const ToolbarTextArea = ({
  propKey,
  value,
  setState,
  label,
  rows = 4,
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
        <textarea
          rows={rows}
          className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
          name={propKey}
          value={value}
          onChange={(e) => setState(e.target.value)}
          {...props}
        />
      </div>
    </div>
  );
};
