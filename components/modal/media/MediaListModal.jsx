import { MediaCardModal } from './MediaCardModal';
import { Container } from 'components/container';

export const MediaListModal = ({ items }) => {
  return (
    <Container size='0'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {items?.map((item) => (
          <MediaCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

MediaListModal.defaultProps = {
  items: [],
};
