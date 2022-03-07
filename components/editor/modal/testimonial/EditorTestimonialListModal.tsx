import { EditorTestimonialCardModal } from './EditorTestimonialCardModal';
import { Container } from 'components/container';
import { FC } from 'react';
import { EditorTestimonialListModalProps } from './_models';

export const EditorTestimonialListModal: FC<
  EditorTestimonialListModalProps
> = ({ items }) => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {items?.map((item) => (
          <EditorTestimonialCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

EditorTestimonialListModal.defaultProps = {
  items: [],
};
