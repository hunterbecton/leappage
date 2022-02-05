import { classNames } from "utils";

export const Button = ({
  size,
  variant,
  type,
  title,
  text,
  onClick,
  customClassName,
  disabled,
}) => {
  const handleSize = (size) => {
    switch (size) {
      case "sm":
        return "px-2.5 py-1.5 text-xs";
      case "md":
        return "px-3 py-2 text-sm leading-4";
      case "lg":
        return "px-4 py-2 text-sm";
      default:
        return "px-3 py-2 text-sm leading-4";
    }
  };

  const handleVariant = (variant) => {
    switch (variant) {
      case "default":
        return "shadow-sm border-transparent text-white bg-blue-600 hover:bg-blue-700";
      case "ghost":
        return "shadow-sm border-gray-300 text-gray-700 bg-white hover:bg-gray-50";
      case "loader":
        return "border-transparent text-gray-700 bg-white h-9 cursor-default";
      default:
        return "border-transparent text-white bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        disabled && variant !== "loader"
          ? "disabled:cursor-wait disabled:opacity-50"
          : "",
        handleSize(size),
        handleVariant(variant),
        "inline-flex items-center rounded border font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        customClassName
      )}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  size: "md",
  variant: "default",
  type: "button",
  title: "Button Title",
  text: "Button Text",
  onClick: () => null,
  disabled: false,
  customClassName: "",
};
