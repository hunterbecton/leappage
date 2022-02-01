import { useNode } from '@craftjs/core';

import { TitleTwoSettings } from './TitleTwoSettings';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description:
    'Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.',
};

export const TitleTwo = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title, description } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <div ref={connect} className='w-full bg-white px-10 py-4'>
      <div className='flex flex-col text-center mx-auto max-w-3xl'>
        <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
          {title}
        </h1>
        <p className='mx-auto leading-relaxed text-base text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  );
};

TitleTwo.craft = {
  displayName: 'Title',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TitleTwoSettings,
  },
};
