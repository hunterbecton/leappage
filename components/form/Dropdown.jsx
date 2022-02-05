export const Dropdown = ({
  name,
  label,
  disabled,
  options,
  helpText,
  formState,
  register,
}) => {
  const { errors } = formState;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
      )}
      {helpText && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {helpText}
        </p>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  options: [],
  helpText: false,
  register: () => null,
  formState: {
    errors: [],
  },
  disabled: false,
};
