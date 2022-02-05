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
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
        type="number"
        name={propKey}
        value={value}
        min={min}
        max={max}
        step={step}
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
      <input
        className="mt-1 h-3 w-full appearance-none overflow-hidden rounded-lg bg-gray-200"
        type="range"
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
