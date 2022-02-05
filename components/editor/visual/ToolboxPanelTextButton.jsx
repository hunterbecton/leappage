import { useComponentPanelStore } from "store";

export const ToolboxPanelTextButton = (props) => {
  const { title, text, component } = props;

  const setIsComponentPanelOpen = useComponentPanelStore(
    (state) => state.setIsComponentPanelOpen
  );

  const setActiveComponent = useComponentPanelStore(
    (state) => state.setActiveComponent
  );

  const setTitle = useComponentPanelStore((state) => state.setTitle);

  const handleClick = () => {
    setActiveComponent(component);
    setTitle(title);
    setIsComponentPanelOpen(true);
  };

  return (
    <button
      type="button"
      className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
