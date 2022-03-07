import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const TestimonialTwoSettings: FC = () => {
  const {
    nodeTestimonials,
    actions: { setProp },
  } = useNode((node) => ({
    nodeTestimonials: node.data.props.testimonials,
  }));

  const handleRemoveTestimonial = (arrayId) => {
    setProp((props) => {
      props.testimonials = nodeTestimonials.filter(
        (testimonial) => testimonial.arrayId !== arrayId
      );
    }, 500);
  };

  const handleAddTestimonial = () => {
    let uid = short.generate();

    const newTestimonial = {
      arrayId: uid,
      id: `demo-${uid}`,
      title: 'Acme Inc. Testimonial',
      quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
      categoryInfo: [{ title: 'Resource' }],
      name: 'Collins Lancaster',
      position: 'Head of Sales',
      company: 'Acme Inc.',
      profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    };

    setProp((props) => {
      props.testimonials = [...props.testimonials, newTestimonial];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Testimonials'>
          {nodeTestimonials.map((nodeTestimonial, i: number) => (
            <ToolbarGroup key={nodeTestimonial.arrayId} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='testimonials'
                groupIndex={i}
                type='testimonial'
                testimonial={nodeTestimonial}
              />
              {nodeTestimonials.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  text='Remove'
                  title='Remove testimonial'
                  onClick={() =>
                    handleRemoveTestimonial(nodeTestimonial.arrayId)
                  }
                />
              )}
            </ToolbarGroup>
          ))}
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2 mb-1'
            text='Add'
            title='Add testimonial'
            onClick={() => handleAddTestimonial()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
