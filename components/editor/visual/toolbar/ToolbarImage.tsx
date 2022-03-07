import { FC, useEffect } from 'react';

import { useEditorStore } from 'store';
import { FallbackImage } from 'components/image';
import { Button } from 'components/button';
import { ToolbarImageProps } from './_models';

export const ToolbarImage: FC<ToolbarImageProps> = ({
  propKey,
  value,
  label,
  id,
  isGroup: defaultIsGroup,
  groupName,
  groupIndex,
  defaultMediaSize,
}) => {
  const setIsMediaModalOpen = useEditorStore(
    (state) => state.setIsMediaModalOpen
  );
  const setActiveFieldId = useEditorStore((state) => state.setActiveFieldId);
  const setActiveImageProp = useEditorStore(
    (state) => state.setActiveImageProp
  );
  const isGroup = useEditorStore((state) => state.isGroup);
  const setIsGroup = useEditorStore((state) => state.setIsGroup);
  const setGroupName = useEditorStore((state) => state.setGroupName);
  const setGroupIndex = useEditorStore((state) => state.setGroupIndex);
  const setMediaSize = useEditorStore((state) => state.setMediaSize);

  // Set default group and media size
  useEffect(() => {
    setIsGroup(defaultIsGroup);
    setMediaSize(defaultMediaSize);
  }, []);

  const handleSelect = () => {
    if (isGroup) {
      setGroupName(groupName);
      setGroupIndex(groupIndex);
    }
    setActiveImageProp(propKey);
    setActiveFieldId(id);
    setIsMediaModalOpen(true);
  };

  return (
    <>
      <div>
        <label
          htmlFor={propKey}
          className='block text-xs font-medium text-gray-700'
        >
          {label}
        </label>
        <div className='w-full'>
          <div className='relative mt-1 max-w-sm'>
            <div className='aspect-w-10 aspect-h-7 relative block w-full overflow-hidden rounded-lg bg-gray-100'>
              <div className='absolute top-0 left-0 h-full w-full'>
                <FallbackImage
                  src={value}
                  alt='Image input source'
                  layout='fill'
                  objectFit='contain'
                  className='p-img-4'
                  fallbackSrc='/images/not-found.png'
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          customClassName='mt-4'
          text='Select Image'
          size='sm'
          variant='ghost'
          title='Select image'
          onClick={handleSelect}
        />
      </div>
    </>
  );
};
