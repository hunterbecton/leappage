import { SkeletonContentCardModal } from "components/editor/modal/content/SkeletonContentCardModal";
import { Container } from "components/container";

export const SkeletonContentListModal = () => {
  const items = Array.from(Array(12).keys());

  return (
    <Container size="0">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <SkeletonContentCardModal key={`contentModal-${item}`} />
        ))}
      </ul>
    </Container>
  );
};
