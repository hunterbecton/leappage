import { classNames } from "utils";

export const ToolbarMenuItem = ({ active, text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        "flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      {text}
    </button>
  );
};
