import { useNode } from '@craftjs/core';

import { ContentTwoPost } from './ContentTwoPost';
import { ContentTwoSettings } from './ContentTwoSettings';
import { ContentProps } from './_models';

const defaultProps = {
  title: 'Learning Resources',
  ctaText: 'View More Content',
  ctaLink: '',
  posts: [
    {
      arrayId: 'DYvif8a36TmpNW3y',
      id: 'demo-DYvif8a36TmpNW3y',
      title: '4 Simple Tips for Leveraging the Power of Social Media',
      description:
        'The importance of customer reviews online for businesses can mean a surge in brand awareness and an overall increase in profit in the long run.',
      categoryInfo: [{ title: 'Resource' }],
      feature: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
      url: '',
    },
    {
      arrayId: 'AtHcFFwN6DeMfwpJ',
      id: 'demo-AtHcFFwN6DeMfwpJ',
      title: '4 Simple Tips for Leveraging the Power of Social Media',
      description:
        'The importance of customer reviews online for businesses can mean a surge in brand awareness and an overall increase in profit in the long run.',
      categoryInfo: [{ title: 'Resource' }],
      feature: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
      url: '',
    },
    {
      arrayId: 'CNnMW8kzVhqVxvJg',
      id: 'demo-CNnMW8kzVhqVxvJg',
      title: '4 Simple Tips for Leveraging the Power of Social Media',
      description:
        'The importance of customer reviews online for businesses can mean a surge in brand awareness and an overall increase in profit in the long run.',
      categoryInfo: [{ title: 'Resource' }],
      feature: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
      url: '',
    },
  ],
};

export const ContentTwo = (props: Partial<ContentProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { title, ctaText, ctaLink, posts } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 flex w-full items-center justify-between border-b border-gray-200 pb-5'>
          <h2 className='text-3xl font-bold text-gray-800'>{title}</h2>
          <a
            href={ctaLink}
            target='_blank'
            rel='noopener noreferrer'
            className='group text-primary hover:text-primary-hover flex items-center text-base font-semibold transition'
          >
            <span>{ctaText}</span>
            <svg
              className='mt-0.5 ml-1 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
          </a>
        </div>
        {posts.map((post) => (
          <ContentTwoPost key={post.arrayId} post={post} />
        ))}
      </div>
    </section>
  );
};

ContentTwo.craft = {
  displayName: 'Content',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContentTwoSettings,
  },
};
