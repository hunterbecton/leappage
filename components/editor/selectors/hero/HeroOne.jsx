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
    <section ref={connect} className='w-full py-12 bg-white md:py-16 px-10'>
      <div className='max-w-7xl mx-auto flex items-center justify-center flex-col'>
        <div className='flex items-center justify-center w-full mb-8 space-x-4'>
          <div className='flex items-center justify-center w-20 h-20 overflow-hidden'>
            <img
              className='w-full object-cover'
              alt={logos[0].company}
              src={logos[0].src}
            />
          </div>
          <BiPlus className='w-6 h-6 text-gray-500' />
          <div className='flex items-center justify-center w-20 h-20 overflow-hidden'>
            <img
              className='w-full object-cover'
              alt={logos[1].company}
              src={logos[1].src}
            />
          </div>
        </div>
        <div className='text-center lg:w-2/3 w-full'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
            {title}
          </h1>
          <p className='mb-8 leading-relaxed text-base text-gray-500'>
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
