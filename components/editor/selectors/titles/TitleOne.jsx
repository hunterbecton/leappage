import { useNode } from '@craftjs/core';

import { TitleOneSettings } from './TitleOneSettings';

const defaultProps = {
  title: 'Landing Pages for Sales',
};

export const TitleOne = (props) => {
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
      <div className='flex flex-col text-center mx-auto max-w-3xl'>
        <h1 className='sm:text-3xl text-2xl font-medium title-font text-gray-900'>
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
