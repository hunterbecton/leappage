import { BiErrorCircle } from "react-icons/bi";
import { classNames } from "utils";

export const ToolbarTextDefault = ({
  name,
  label,
  type,
  disabled,
  helpText,
  placeholder,
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
      <div className="relative mt-1">
        <input
          {...register(name)}
          className={classNames(
            errors[name]
              ? "border-red-300 text-red-900 placeholder-red-300 focus-visible:border-red-500 focus-visible:ring-red-500"
              : "border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-500",
            "block w-full rounded-md text-xs  shadow-sm"
          )}
          type={type}
          name={name}
          disabled={disabled}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={readOnly ? true : false}
        />
        {errors[name] && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <BiErrorCircle
              className="h-3 w-3 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

ToolbarTextDefault.defaultProps = {
  helpText: false,
  variant: "default",
  placeholder: "",
  readOnly: false,
  type: "text",
  register: () => null,
  formState: {
    errors: [],
  },
  disabled: false,
};
