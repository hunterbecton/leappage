import { useEditor } from "@craftjs/core";
import short from "short-uuid";

import { useEditorStore } from "store";

export const ContentCardModal = ({ item }) => {
  const { actions } = useEditor();

  const activeFieldId = useEditorStore((state) => state.activeFieldId);
  const groupName = useEditorStore((state) => state.groupName);
  const groupIndex = useEditorStore((state) => state.groupIndex);

  const setIsContentModalOpen = useEditorStore(
    (state) => state.setIsContentModalOpen
  );

  const handleSelect = () => {
    let uid = short.generate();

    // Set Array ID
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["arrayId"] = uid;
    });
    // Set ID
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["id"] = item.id;
    });
    // Set title
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["title"] = item.title;
    });
    // Set description
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["description"] = item.description;
    });
    // Set category
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["categoryInfo"][0]["title"] =
        item.categoryInfo && item.categoryInfo.length > 0
          ? item.categoryInfo[0].title
          : "Uncategorized";
    });
    // Set image
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["feature"] = item.feature;
    });
    // Set URL
    actions.setProp(activeFieldId, (props) => {
      props[groupName][groupIndex]["url"] = item.url;
    });
    setIsContentModalOpen(false);
  };

  return (
    <li className="relative">
      <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img
          src={item.feature}
          alt={item.title}
          loading="lazy"
          className="pointer-events-none object-contain p-4 group-hover:opacity-75"
        />
        <button
          type="button"
          onClick={handleSelect}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">View details for content</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-xs font-medium text-gray-900">
        {item.title}
      </p>
    </li>
  );
};
