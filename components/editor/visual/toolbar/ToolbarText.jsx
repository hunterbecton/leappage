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
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          className="block w-full rounded-md border-gray-300 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
          type="text"
          name={propKey}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
