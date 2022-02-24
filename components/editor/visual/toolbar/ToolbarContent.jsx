import { useEditorStore } from 'store';
import { Button } from 'components/button';
import Image from 'next/image';
import { useEffect } from 'react';

export const ToolbarContent = ({
  onChange,
  label,
  value,
  prefix,
  type,
  id,
  isGroup: defaultIsGroup,
  groupName,
  groupIndex,
  content,
  ...props
}) => {
  const setIsContentModalOpen = useEditorStore(
    (state) => state.setIsContentModalOpen
  );
  const setActiveFieldId = useEditorStore((state) => state.setActiveFieldId);

  const isGroup = useEditorStore((state) => state.isGroup);
  const setIsGroup = useEditorStore((state) => state.setIsGroup);

  const setGroupName = useEditorStore((state) => state.setGroupName);
  const setGroupIndex = useEditorStore((state) => state.setGroupIndex);

  useEffect(() => {
    setIsGroup(defaultIsGroup);
  }, []);

  const handleSelect = () => {
    if (isGroup) {
      setGroupName(groupName);
      setGroupIndex(groupIndex);
    }
    setActiveFieldId(id);
    setIsContentModalOpen(true);
  };

  return (
    <div>
      <div className='border-1 flex flex-col overflow-hidden rounded border-gray-300 shadow'>
        <div className='flex-shrink-0'>
          <div className='relative h-48 w-full overflow-hidden'>
            <Image
              src={content.feature}
              alt={content.title}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <div className='flex flex-1 flex-col justify-between bg-white p-4'>
          <div className='flex-1'>
            <p className='text-xs font-bold uppercase text-gray-400'>
              {content.categoryInfo && content.categoryInfo.length > 0
                ? content.categoryInfo[0].title
                : 'Uncategorized'}
            </p>
            <p className='mt-2 block text-sm font-medium text-gray-700'>
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
