export const ToolbarDropdownDefault = ({
  name,
  label,
  disabled,
  options,
  helpText,
  register,
  formState,
  onBlur,
  readOnly,
}) => {
  const { errors } = formState;

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name)}
        className="text mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-xs focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        name={name}
        disabled={disabled}
        readOnly={readOnly ? true : false}
        onBlur={onBlur}
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
