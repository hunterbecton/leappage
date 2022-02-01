import { useEditorStore } from 'store';
import { Button } from 'components/button';

export const ToolbarContent = ({
  onChange,
  label,
  value,
  prefix,
  type,
  id,
  isGroup,
  groupName,
  groupIndex,
  content,
  ...props
}) => {
  const setIsContentModalOpen = useEditorStore(
    (state) => state.setIsContentModalOpen
  );
  const setActiveFieldId = useEditorStore((state) => state.setActiveFieldId);

  const setIsGroup = useEditorStore((state) => state.setIsGroup);
  const setGroupName = useEditorStore((state) => state.setGroupName);
  const setGroupIndex = useEditorStore((state) => state.setGroupIndex);

  const handleSelect = () => {
    if (isGroup) {
      setIsGroup(true);
      setGroupName(groupName);
      setGroupIndex(groupIndex);
    }
    setActiveFieldId(id);
    setIsContentModalOpen(true);
  };

  return (
    <div>
      <div className='flex flex-col shadow rounded border-1 border-gray-300 overflow-hidden'>
        <div className='flex-shrink-0'>
          <img
            className='h-48 w-full object-cover'
            src={content.feature}
            alt={content.title}
          />
        </div>
        <div className='flex-1 bg-white p-4 flex flex-col justify-between'>
          <div className='flex-1'>
            <p className='text-xs font-bold text-gray-400 uppercase'>
              {content.categoryInfo && content.categoryInfo.length > 0
                ? content.categoryInfo[0].title
                : 'Uncategorized'}
            </p>
            <p className='text-sm font-medium text-gray-700 block mt-2'>
              {content.title}
            </p>
          </div>
        </div>
      </div>
      <Button
        size='sm'
        variant='ghost'
        customClassName='justify-center w-full mt-2'
        text='Change'
        onClick={() => handleSelect()}
      />
    </div>
  );
};
