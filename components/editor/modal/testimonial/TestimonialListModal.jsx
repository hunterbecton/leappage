import { TestimonialCardModal } from "components/editor/modal/testimonial/TestimonialCardModal";
import { Container } from "components/container";

export const TestimonialListModal = ({ items }) => {
  return (
    <Container size="0">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {items?.map((item) => (
          <TestimonialCardModal key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

TestimonialListModal.defaultProps = {
  items: [],
};
