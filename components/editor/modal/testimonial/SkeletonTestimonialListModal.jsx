import { SkeletonTestimonialCardModal } from "components/editor/modal/testimonial/SkeletonTestimonialCardModal";
import { Container } from "components/container";

export const SkeletonTestimonialListModal = () => {
  const items = Array.from(Array(12).keys());

  return (
    <Container size="0">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <SkeletonTestimonialCardModal key={`testimonialModal-${item}`} />
        ))}
      </ul>
    </Container>
  );
};
