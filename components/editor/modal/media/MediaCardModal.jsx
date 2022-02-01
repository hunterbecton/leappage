import { useEditorStore } from 'store';
import { useEditor } from '@craftjs/core';

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
    <li className='relative'>
      <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-blue-500 overflow-hidden'>
        <img
          src={item.url}
          alt={item.title}
          loading='lazy'
          className='p-4 object-contain pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          onClick={handleSelect}
          className='absolute inset-0 focus:outline-none'
        >
          <span className='sr-only'>View details for image</span>
        </button>
      </div>
      <p className='mt-2 block text-xs font-medium text-gray-900 truncate pointer-events-none'>
        {item.title}
      </p>
    </li>
  );
};
