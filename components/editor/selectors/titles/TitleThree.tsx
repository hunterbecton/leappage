import { useNode } from '@craftjs/core';

import { TitleThreeSettings } from './TitleThreeSettings';
import { TitleThreeProps } from './_models';

const defaultProps = {
  subtitle: 'Get Started',
  title: 'Landing Pages for Sales',
  description:
    'Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.',
};

export const TitleThree = (props: Partial<TitleThreeProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { subtitle, title, description } = props;

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

TitleThree.craft = {
  displayName: 'Title',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TitleThreeSettings,
  },
};
