import { ContentCardModal } from 'components/editor/modal/content/ContentCardModal';
import { Container } from 'components/container';

export const ContentListModal = ({ items }) => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {items?.map((item) => (
          <ContentCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

ContentListModal.defaultProps = {
  items: [],
};
