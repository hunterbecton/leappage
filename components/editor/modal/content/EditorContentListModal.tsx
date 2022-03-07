import { EditorContentCardModal } from './EditorContentCardModal';
import { Container } from 'components/container';
import { FC } from 'react';
import { EditorContentListModalProps } from './_models';

export const EditorContentListModal: FC<EditorContentListModalProps> = ({
  items,
}) => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {items?.map((item) => (
          <EditorContentCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

EditorContentListModal.defaultProps = {
  items: [],
};
