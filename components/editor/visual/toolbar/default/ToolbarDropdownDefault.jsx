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
      <label htmlFor={name} className='block text-xs font-medium text-gray-700'>
        {label}
      </label>
      <select
        {...register(name)}
        className='mt-1 block w-full pl-3 pr-10 py-2 text-xs text border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md'
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
