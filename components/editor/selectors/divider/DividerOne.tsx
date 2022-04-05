import { useNode } from '@craftjs/core';

import { DividerOneSettings } from './DividerOneSettings';
import { DividerProps } from './_models';

const defaultProps = {
  paddingY: 3,
  enabled: true,
};

export const DividerOne = (props: Partial<DividerProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { enabled, paddingY } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <div
      ref={connect}
      className='w-full bg-white px-4 sm:px-10'
      style={{ paddingTop: `${paddingY}rem`, paddingBottom: `${paddingY}rem` }}
    >
      <div className='mx-auto max-w-2xl'>
        <div className='relative'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            {enabled ? (
              <div className='w-full border-t border-gray-300' />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

DividerOne.craft = {
  displayName: 'Divider',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: DividerOneSettings,
  },
};
