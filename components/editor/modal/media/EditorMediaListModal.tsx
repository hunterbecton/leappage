import { EditorMediaCardModal } from './EditorMediaCardModal';
import { Container } from 'components/container';
import { FC } from 'react';
import { EditorMediaListModalProps } from './_models';

export const EditorMediaListModal: FC<EditorMediaListModalProps> = ({
  items,
}) => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {items?.map((item) => (
          <EditorMediaCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

EditorMediaListModal.defaultProps = {
  items: [],
};
