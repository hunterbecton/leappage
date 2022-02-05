import { BiImage } from "react-icons/bi";

import { useEditorStore } from "store";

export const ToolbarImage = ({
  propKey,
  onChange,
  value,
  prefix,
  label,
  type,
  id,
  isGroup,
  groupName,
  groupIndex,
  ...props
}) => {
  const setIsMediaModalOpen = useEditorStore(
    (state) => state.setIsMediaModalOpen
  );
  const setActiveFieldId = useEditorStore((state) => state.setActiveFieldId);
  const setActiveImageProp = useEditorStore(
    (state) => state.setActiveImageProp
  );

  const setIsGroup = useEditorStore((state) => state.setIsGroup);

  const setGroupName = useEditorStore((state) => state.setGroupName);

  const setGroupIndex = useEditorStore((state) => state.setGroupIndex);

  const handleSelect = () => {
    if (isGroup) {
      setIsGroup(true);
      setGroupName(groupName);
      setGroupIndex(groupIndex);
    }
    setActiveImageProp(propKey);
    setActiveFieldId(id);
    setIsMediaModalOpen(true);
  };

  return (
    <div>
      <label
        htmlFor={propKey}
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            className="block w-full rounded-none rounded-l-md border-gray-300 text-xs focus:border-blue-500 focus:ring-blue-500"
            type="text"
            name={propKey}
            value={value}
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
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 p-2 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={handleSelect}
        >
          <BiImage className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
