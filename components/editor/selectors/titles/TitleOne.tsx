import { useNode } from '@craftjs/core';

import { TitleOneSettings } from './TitleOneSettings';
import { TitleOneProps } from './_models';

const defaultProps = {
  title: 'Landing Pages for Sales',
};

export const TitleOne = (props: Partial<TitleOneProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <div ref={connect} className='w-full bg-white px-10 py-4'>
      <div className='mx-auto flex max-w-3xl flex-col text-center'>
        <h1 className='title-font text-2xl font-medium text-gray-900 sm:text-3xl'>
          {title}
        </h1>
      </div>
    </div>
  );
};

TitleOne.craft = {
  displayName: 'Title',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TitleOneSettings,
  },
};
