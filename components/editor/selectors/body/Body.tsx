import { useNode, UserComponent } from '@craftjs/core';

import { BodySettings } from './BodySettings';

const defaultProps = {};

export const Body: UserComponent = (props: any) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { children } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <div
      id='root-node'
      ref={connect}
      className='min-h-editor h-full w-full bg-white'
    >
      {children}
    </div>
  );
};

Body.craft = {
  displayName: 'Body',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: BodySettings,
  },
};
