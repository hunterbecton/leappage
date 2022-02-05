import { classNames } from "utils";

export const ToolbarGroup = ({ full, bgColor, children, ...props }) => {
  return (
    <div
      className={classNames(
        full ? "grid-cols-1" : "grid-cols-2",
        bgColor,
        "mt-2 grid gap-2 rounded-sm p-4"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ToolbarGroup.defaultProps = {
  full: false,
  bgColor: "bg-gray-50",
};
