import { SkeletonMediaCard } from "components/card";
import { Container } from "components/container";

export const SkeletonMediaList = () => {
  const items = Array.from(Array(12).keys());

  return (
    <Container size="top-0">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item) => (
          <SkeletonMediaCard key={`media-${item}`} />
        ))}
      </ul>
    </Container>
  );
};
