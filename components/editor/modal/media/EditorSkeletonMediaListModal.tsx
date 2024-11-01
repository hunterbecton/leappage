import { EditorSkeletonMediaCardModal } from './EditorSkeletonMediaCardModal';
import { Container } from 'components/container';
import { FC } from 'react';

export const EditorSkeletonMediaListModal: FC = () => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
        <EditorSkeletonMediaCardModal />
      </ul>
    </Container>
  );
};
