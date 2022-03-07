import { MediaCardModal } from './MediaCardModal';
import { Container } from 'components/container';
import { FC } from 'react';
import { MediaListModalProps } from './_models';

export const MediaListModal: FC<MediaListModalProps> = ({ items }) => {
  return (
    <Container size='none'>
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
