import { useNode } from '@craftjs/core';
import ReactPlayer from 'react-player';

import { HeroTwoSettings } from './HeroTwoSettings';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description: `Empower your sales team to create personalized landing pages for
  leads and customers in order to drive more engagement and sales.`,
  videoUrl: 'https://www.youtube.com/watch?v=3PZ65s2qLTE',
  ctas: [
    {
      id: 'EuN9jaZ8xvNimytz',
      text: 'Book Call',
      link: 'https://leappage.com',
    },
    {
      id: 'v2CEj7Bo7pT9hegY',
      text: 'Watch Demo',
      link: 'https://leappage.com',
    },
  ],
};

export const HeroTwo = (props) => {
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

  return (
    <section ref={connect} className='w-full py-12 bg-white md:py-16 px-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-12 gap-6'>
        <div className='text-left self-center col-span-12 order-2 lg:order-1 lg:col-span-6'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
            {title}
          </h1>
          <p className='mb-8 leading-relaxed text-base text-gray-500'>
            {description}
          </p>
          <div className='flex'>
            {ctas.map((cta, i) =>
              i + 1 === ctas.length ? (
                <a
                  key={cta.id}
                  href={cta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 transition focus:outline-none hover:bg-gray-200 rounded text-lg'
                >
                  {cta.text}
                </a>
              ) : (
                <a
                  key={cta.id}
                  href={cta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex text-white bg-blue-500 border-0 py-2 px-6 transition focus:outline-none hover:bg-blue-600 rounded text-lg'
                >
                  {cta.text}
                </a>
              )
            )}
          </div>
        </div>
        <div
          className='relative order-1 col-span-12 lg:col-span-6 lg:order-2 bg-gray-100'
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
