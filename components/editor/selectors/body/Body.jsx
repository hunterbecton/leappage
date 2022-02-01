import { useNode, useEditor } from '@craftjs/core';

import { fontFamilyItems } from 'components/editor/visual/toolbar/defaultFonts';
import { BodySettings } from './BodySettings';

const interFontFamilyIndex = fontFamilyItems.findIndex(
  (fontFamily) => fontFamily.name === 'Inter'
);

const defaultProps = {};

export const Body = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { children } = props;

  const {
    id,
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  // const { isRootNode } = useEditor((state, query) => {
  //   return {
  //     isRootNode: query.node(id).isRoot(),
  //   };
  // });

  return (
    <div
      id='root-node'
      ref={connect}
      className='w-full bg-white h-full min-h-editor'
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
