import { EditorContentCardModal } from './EditorContentCardModal';
import { Container } from 'components/container';

export const EditorContentListModal = ({ items }) => {
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
