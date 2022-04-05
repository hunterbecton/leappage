import { useNode } from '@craftjs/core';

import { TestimonialOneCard } from './TestimonialOneCard';
import { TestimonialOneSettings } from './TestimonialOneSettings';
import { TestimonialProps } from './_models';

const defaultProps = {
  testimonials: [
    {
      arrayId: 'Pvc3wvJoTVpy94Jq',
      id: 'demo-Pvc3wvJoTVpy94Jq',
      title: 'Acme Inc. Testimonial',
      quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
      categoryInfo: [{ title: 'Resource' }],
      name: 'Collins Lancaster',
      position: 'Head of Sales',
      company: 'Acme Inc.',
      profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    },
    {
      arrayId: 'XJad4rqFR4ATZqQG',
      id: 'demo-XJad4rqFR4ATZqQG',
      title: 'Acme Inc. Testimonial',
      quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
      categoryInfo: [{ title: 'Resource' }],
      name: 'Collins Lancaster',
      position: 'Head of Sales',
      company: 'Acme Inc.',
      profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    },
    {
      arrayId: 'cvNt6wu4K3jubRFe',
      id: 'demo-cvNt6wu4K3jubRFe',
      title: 'Acme Inc. Testimonial',
      quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
      categoryInfo: [{ title: 'Resource' }],
      name: 'Collins Lancaster',
      position: 'Head of Sales',
      company: 'Acme Inc.',
      profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    },
  ],
};

export const TestimonialOne = (props: Partial<TestimonialProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { testimonials } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section
      ref={connect}
      className='w-full bg-white py-6 px-4 sm:py-12 sm:px-10 md:py-16'
    >
      <div className='mx-auto flex max-w-7xl flex-wrap'>
        <div className='grid w-full grid-cols-12 gap-6'>
          {testimonials.map((testimonial) => (
            <TestimonialOneCard
              key={testimonial.arrayId}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

TestimonialOne.craft = {
  displayName: 'Testimonials',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TestimonialOneSettings,
  },
};
