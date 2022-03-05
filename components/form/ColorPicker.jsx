import { useState, useEffect, useRef } from 'react';
import { BlockPicker } from 'react-color';
import { usePopper } from 'react-popper';
import { useClickAway } from 'react-use';
import { useFormContext } from 'react-hook-form';

import { Button } from 'components/button';

export const ColorPicker = ({ name, label, colors }) => {
  const { formState, register, setValue, watch } = useFormContext();

  // Manually register on mount
  useEffect(() => {
    register(name);
  }, []);

  const color = watch(name);

  const [referenceElement, setReferenceElement] = useState(null);

  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const boundaryRef = useRef(null);

  const handleChange = (color, event) => {
    setValue(name, color.hex);
  };

  useClickAway(boundaryRef, () => {
    setShowColorPicker(false);
  });

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1 flex space-x-2'>
        <div
          ref={setReferenceElement}
          style={{ backgroundColor: color }}
          className='h-10 w-10 rounded border border-gray-300 shadow-sm'
        />
        <Button
          text='Change'
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker && (
          <div
            className='z-10'
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div ref={boundaryRef}>
              <BlockPicker
                color={color}
                colors={colors}
                triangle='hide'
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
      {formState.errors[name] && (
        <p className='mt-2 text-sm text-red-600'>
          {formState.errors[name].message}
        </p>
      )}
    </div>
  );
};
