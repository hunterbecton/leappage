import { EditorSkeletonContentCardModal } from './EditorSkeletonContentCardModal';
import { Container } from 'components/container';
import { FC } from 'react';

export const EditorSkeletonContentListModal: FC = () => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
        <EditorSkeletonContentCardModal />
      </ul>
    </Container>
  );
};
