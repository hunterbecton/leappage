import { useEditorStore } from "store";
import { useEditor } from "@craftjs/core";

export const MediaCardModal = ({ item }) => {
  const { actions } = useEditor();

  const activeFieldId = useEditorStore((state) => state.activeFieldId);
  const activeImageProp = useEditorStore((state) => state.activeImageProp);
  const isGroup = useEditorStore((state) => state.isGroup);
  const groupName = useEditorStore((state) => state.groupName);
  const groupIndex = useEditorStore((state) => state.groupIndex);

  const setIsMediaModalOpen = useEditorStore(
    (state) => state.setIsMediaModalOpen
  );

  const handleSelect = () => {
    if (isGroup) {
      actions.setProp(activeFieldId, (props) => {
        props[groupName][groupIndex][activeImageProp] = item.url;
      });
    } else {
      actions.setProp(activeFieldId, (props) => {
        props[activeImageProp] = item.url;
      });
    }
    setIsMediaModalOpen(false);
  };

  return (
    <li className="relative">
      <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className="pointer-events-none object-contain p-4 group-hover:opacity-75"
        />
        <button
          type="button"
          onClick={handleSelect}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">View details for image</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-xs font-medium text-gray-900">
        {item.title}
      </p>
    </li>
  );
};
