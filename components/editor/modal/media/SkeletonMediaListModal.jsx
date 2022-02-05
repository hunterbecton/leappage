import { SkeletonMediaCardModal } from "components/editor/modal/media/SkeletonMediaListModal";
import { Container } from "components/container";

export const SkeletonMediaListModal = () => {
  const items = Array.from(Array(12).keys());

  return (
    <Container size="0">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <SkeletonMediaCardModal key={`mediaModal-${item}`} />
        ))}
      </ul>
    </Container>
  );
};
