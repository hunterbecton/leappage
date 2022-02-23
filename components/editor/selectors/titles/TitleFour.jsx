import { useNode } from '@craftjs/core';

import { TitleFourSettings } from './TitleFourSettings';

const defaultProps = {
  subtitle: 'Get Started',
  title: 'Landing Pages for Sales',
};

export const TitleFour = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { subtitle, title } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <div ref={connect} className='w-full bg-white px-10 py-4'>
      <div className='mx-auto flex max-w-3xl flex-col text-center'>
        <h2 className='title-font text-primary mb-1 text-xs font-bold uppercase tracking-widest'>
          {subtitle}
        </h2>
        <h1 className='title-font text-2xl font-medium text-gray-900 sm:text-3xl'>
          {title}
        </h1>
      </div>
    </div>
  );
};

TitleFour.craft = {
  displayName: 'Title',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TitleFourSettings,
  },
};
