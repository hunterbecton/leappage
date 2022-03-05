import { EditorSkeletonTestimonialCardModal } from './EditorSkeletonTestimonialCardModal';
import { Container } from 'components/container';

export const EditorSkeletonTestimonialListModal = () => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
        <EditorSkeletonTestimonialCardModal />
      </ul>
    </Container>
  );
};
