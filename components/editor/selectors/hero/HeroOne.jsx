import { useNode } from '@craftjs/core';
import { BiPlus } from 'react-icons/bi';

import { HeroOneSettings } from './HeroOneSettings';
import { useEditorStore } from 'store';

const defaultProps = {
  title: 'Landing Pages for Sales',
  description: `Empower your sales team to create personalized landing pages for
  leads and customers in order to drive more engagement and sales.`,
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

export const HeroOne = (props) => {
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

  return (
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center'>
        <div className='mb-8 flex w-full items-center justify-center space-x-4'>
          <div className='flex h-20 w-20 items-center justify-center overflow-hidden'>
            <img
              className='w-full object-cover'
              alt={logos[0].company}
              src={logos[0].src}
            />
          </div>
          <BiPlus className='h-6 w-6 text-gray-500' />
          <div className='flex h-20 w-20 items-center justify-center overflow-hidden'>
            <img
              className='w-full object-cover'
              alt={logos[1].company}
              src={logos[1].src}
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
