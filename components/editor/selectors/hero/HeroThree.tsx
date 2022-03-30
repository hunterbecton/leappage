import { useNode } from '@craftjs/core';

import { HeroThreeSettings } from './HeroThreeSettings';
import { HeroThreeProps } from './_models';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description: `Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.`,
  ctas: [
    {
      id: 'EuN9jaZ8xvNimytz',
      text: 'Book Call',
      link: '',
    },
    {
      id: 'v2CEj7Bo7pT9hegY',
      text: 'Watch Demo',
      link: '',
    },
  ],
};

export const HeroThree = (props: Partial<HeroThreeProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title, description, ctas } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center'>
        <div className='w-full text-center lg:w-2/3'>
          <h1 className='title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl'>
            {title}
          </h1>
          <p className='mb-8 text-base leading-relaxed text-gray-500'>
            {description}
          </p>
          <div className='flex justify-center'>
            {ctas.map((cta, i) =>
              i + 1 === ctas.length ? (
                <a
                  key={cta.id}
                  href={cta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 transition hover:bg-gray-200 focus:outline-none'
                >
                  {cta.text}
                </a>
              ) : (
                <a
                  key={cta.id}
                  href={cta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary hover:bg-primary-hover inline-flex rounded border-0 py-2 px-6 text-lg text-white transition focus:outline-none'
                >
                  {cta.text}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

HeroThree.craft = {
  displayName: 'Hero',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: HeroThreeSettings,
  },
};
