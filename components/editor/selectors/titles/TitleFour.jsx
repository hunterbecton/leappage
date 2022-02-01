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
      <div className='flex flex-col text-center mx-auto max-w-3xl'>
        <h2 className='text-xs text-blue-500 tracking-widest font-bold title-font mb-1 uppercase'>
          {subtitle}
        </h2>
        <h1 className='sm:text-3xl text-2xl font-medium title-font text-gray-900'>
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
