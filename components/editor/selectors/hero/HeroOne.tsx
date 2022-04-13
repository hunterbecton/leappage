import { useNode } from '@craftjs/core';
import { BiPlus } from 'react-icons/bi';

import { HeroOneSettings } from './HeroOneSettings';
import { FallbackImage } from 'components/image';
import { HeroOneProps } from './_models';
import { classNames } from 'utils';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description: `Empower your sales team to create personalized landing pages for leads and customers in order to drive more engagement and sales.`,
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
  logos: [
    {
      id: 'Ezr42KXLdWDwqrQm',
      company: 'First company',
      src: 'https://dummyimage.com/160x160/f3f4f6/1f2937.jpg',
    },
    {
      id: 'cjPBVpwRTh7DM9zh',
      company: 'Second company',
      src: 'https://dummyimage.com/160x160/f3f4f6/1f2937.jpg',
    },
  ],
};

export const HeroOne = (props: Partial<HeroOneProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title, description, ctas, logos } = props;

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
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center'>
        <div className='mb-8 flex w-full items-center justify-center space-x-4'>
          <div className='relative flex h-20 w-20 items-center justify-center overflow-hidden'>
            <FallbackImage
              alt={logos[0].company}
              src={logos[0].src}
              layout='fill'
              objectFit='contain'
              fallbackSrc='/images/not-found.png'
            />
          </div>
          <BiPlus className='h-6 w-6 text-gray-500' />
          <div className='relative flex h-20 w-20 items-center justify-center overflow-hidden'>
            <FallbackImage
              alt={logos[1].company}
              src={logos[1].src}
              layout='fill'
              objectFit='contain'
              fallbackSrc='/images/not-found.png'
            />
          </div>
        </div>
        <div className='w-full text-center lg:w-2/3'>
          <h1 className='title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl'>
            {title}
          </h1>
          <p className='mb-8 text-base leading-relaxed text-gray-500'>
            {description}
          </p>
          <div className='flex justify-center'>
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
                      ? 'ml-4 bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      </div>
    </section>
  );
};

HeroOne.craft = {
  displayName: 'Hero',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: HeroOneSettings,
  },
};
