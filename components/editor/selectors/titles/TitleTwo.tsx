import { useNode } from '@craftjs/core';

import { TitleTwoSettings } from './TitleTwoSettings';
import { TitleTwoProps } from './_models';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description:
    'Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.',
};

export const TitleTwo = (props: Partial<TitleTwoProps>) => {
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
    <div ref={connect} className='w-full bg-white px-4 py-4 sm:px-10'>
      <div className='mx-auto flex max-w-3xl flex-col text-center'>
        <h1 className='title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl'>
          {title}
        </h1>
        <p className='mx-auto text-base leading-relaxed text-gray-500'>
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
