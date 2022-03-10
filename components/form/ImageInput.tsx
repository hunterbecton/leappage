import { FC, useEffect } from 'react';
import { MediaModal } from 'components/modal/media';
import { useFormContext } from 'react-hook-form';

import { useMediaModalStore } from 'store';
import { Button } from 'components/button';
import { FallbackImage } from 'components/image';
import { ImageInputProps } from './_models';

export const ImageInput: FC<ImageInputProps> = ({
  name,
  label,
  helpText,
  readOnly,
  mediaSize,
}) => {
  const { watch, formState } = useFormContext();

  const src = watch(name);

  const setIsMediaModalOpen = useMediaModalStore(
    (state) => state.setIsMediaModalOpen
  );
  const setActiveImageName = useMediaModalStore(
    (state) => state.setActiveImageName
  );
  const setMediaSize = useMediaModalStore((state) => state.setMediaSize);

  // Set initial media size
  useEffect(() => {
    setMediaSize(mediaSize);
  }, []);

  const handleSelect = () => {
    setIsMediaModalOpen(true);
    setActiveImageName(name);
  };

  return (
    <>
      <MediaModal />
      <div>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
        <div className='w-full'>
          <div className='relative mt-1 max-w-sm'>
            <div className='aspect-w-10 aspect-h-7 relative block w-full overflow-hidden rounded-lg bg-gray-100'>
              <div className='absolute top-0 left-0 h-full w-full'>
                <FallbackImage
                  src={src}
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
        {!readOnly && (
          <Button
            customClassName='mt-4'
            text='Select image'
            variant='ghost'
            title='Select image'
            onClick={handleSelect}
          />
        )}
        {formState.errors[name] && (
          <p className='mt-2 text-sm text-red-600'>
            {formState.errors[name].message}
          </p>
        )}
        {helpText && (
          <p className='mt-2 text-sm text-gray-500' id='email-description'>
            {helpText}
          </p>
        )}
      </div>
    </>
  );
};

ImageInput.defaultProps = {
  helpText: '',
  readOnly: false,
};
