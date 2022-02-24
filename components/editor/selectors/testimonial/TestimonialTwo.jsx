import { useNode } from '@craftjs/core';
import { TestimonialTwoCard } from './TestimonialTwoCard';

import { TestimonialTwoSettings } from './TestimonialTwoSettings';

const defaultProps = {
  testimonials: [
    {
      arrayId: 'sGGZgEzKH9w8wBi2',
      id: 'demo-sGGZgEzKH9w8wBi2',
      title: 'Acme Inc. Testimonial',
      quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
      categoryInfo: [{ title: 'Resource' }],
      name: 'Collins Lancaster',
      position: 'Head of Sales',
      company: 'Acme Inc.',
      profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    },
    {
      arrayId: 'bUc4QeAxaj4sdekn',
      id: 'demo-bUc4QeAxaj4sdekn',
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

export const TestimonialTwo = (props) => {
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
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16 '>
      <div className='mx-auto flex max-w-7xl flex-wrap'>
        <div className='grid w-full grid-cols-12 gap-6'>
          {testimonials.map((testimonial) => (
            <TestimonialTwoCard
              key={testimonial.arrayId}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

TestimonialTwo.craft = {
  displayName: 'Testimonials',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: TestimonialTwoSettings,
  },
};
