import { MediaModal } from 'components/modal/media';
import { BiErrorCircle, BiImage } from 'react-icons/bi';

import { classNames } from 'utils';
import { useMediaModalStore } from 'store';
import { Button } from 'components/button';

export const ImageInput = ({
  name,
  label,
  type,
  disabled,
  helpText,
  placeholder,
  register,
  formState,
  onBlur,
  readOnly,
  src,
}) => {
  const { errors } = formState;

  const setIsMediaModalOpen = useMediaModalStore(
    (state) => state.setIsMediaModalOpen
  );
  const setActiveImageName = useMediaModalStore(
    (state) => state.setActiveImageName
  );

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
          <div className='relative max-w-sm mt-1'>
            <div className='relative block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'>
              <img
                src={src}
                alt='Image input source'
                className='p-4 object-contain'
              />
            </div>
          </div>
        </div>
        {!readOnly && (
          <Button
            customClassName='mt-4'
            text='Select Image'
            variant='ghost'
            onClick={handleSelect}
          />
        )}
        {errors[name] && (
          <p className='mt-2 text-sm text-red-600'>{errors[name].message}</p>
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
  helpText: false,
  variant: 'default',
  placeholder: '',
  readOnly: false,
  type: 'text',
  register: () => null,
  formState: {
    errors: [],
  },
  disabled: false,
};
