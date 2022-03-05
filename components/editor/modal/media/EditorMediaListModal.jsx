import { EditorMediaCardModal } from './EditorMediaCardModal';
import { Container } from 'components/container';

export const EditorMediaListModal = ({ items }) => {
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
