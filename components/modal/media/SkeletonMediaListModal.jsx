import { SkeletonMediaCardModal } from './SkeletonMediaCardModal';
import { Container } from 'components/container';

export const SkeletonMediaListModal = () => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
        <SkeletonMediaCardModal />
      </ul>
    </Container>
  );
};
