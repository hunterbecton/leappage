import { useNode } from '@craftjs/core';
import ReactPlayer from 'react-player';

import { HeroTwoSettings } from './HeroTwoSettings';
import { HeroTwoProps } from './_models';
import { classNames } from 'utils';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description: `Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.`,
  videoUrl: 'https://www.youtube.com/watch?v=3PZ65s2qLTE',
  ctas: [
    {
      enabled: true,
      id: 'EuN9jaZ8xvNimytz',
      text: 'Book Call',
      link: '',
    },
    {
      enabled: true,
      id: 'v2CEj7Bo7pT9hegY',
      text: 'Watch Demo',
      link: '',
    },
  ],
};

export const HeroTwo = (props: Partial<HeroTwoProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title, description, videoUrl, ctas } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  const handleUndefinedCtaEnabled = (enabled: boolean | undefined) => {
    // Set true for undefined values on older hero components
    if (enabled === undefined) {
      return true;
    } else {
      return enabled;
    }
  };

  return (
    <section
      ref={connect}
      className='w-full bg-white py-6 px-4 sm:py-12 sm:px-10 md:py-16'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-12 gap-6'>
        <div className='order-2 col-span-12 self-center text-left lg:order-1 lg:col-span-6'>
          <h1 className='title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl'>
            {title}
          </h1>
          <p className='mb-8 text-base leading-relaxed text-gray-500'>
            {description}
          </p>
          <div className='flex space-x-4'>
            {ctas.map((cta, i) =>
              handleUndefinedCtaEnabled(cta.enabled) ? (
                <a
                  key={cta.id}
                  href={cta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classNames(
                    i === 0
                      ? 'bg-primary hover:bg-primary-hover  text-white'
                      : '',
                    i === 1
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : '',
                    'inline-flex rounded border-0 py-2 px-6 text-lg transition focus:outline-none'
                  )}
                >
                  {cta.text}
                </a>
              ) : null
            )}
          </div>
        </div>
        <div
          className='relative order-1 col-span-12 bg-gray-100 lg:order-2 lg:col-span-6'
          style={{ paddingTop: '56.25%' }}
        >
          <ReactPlayer
            url={videoUrl}
            className='absolute top-0 left-0'
            width='100%'
            height='100%'
            controls={true}
          />
        </div>
      </div>
    </section>
  );
};

HeroTwo.craft = {
  displayName: 'Hero',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: HeroTwoSettings,
  },
};
