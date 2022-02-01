export const ToolbarDropdown = ({
  propKey,
  onChange,
  value,
  label,
  options,
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
      <select
        className='mt-1 block w-full pl-3 pr-10 py-2 text-xs text border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md'
        name={propKey}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
