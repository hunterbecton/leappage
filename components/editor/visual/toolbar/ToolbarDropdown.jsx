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
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        className="text mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-xs focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
