import { SkeletonProjectCard } from "components/card";
import { Container } from "components/container";

export const SkeletonProjectList = () => {
  const items = Array.from(Array(12).keys());

  return (
    <Container size="top-0">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {items?.map((item) => (
          <SkeletonProjectCard key={`project-${item}`} />
        ))}
      </ul>
    </Container>
  );
};
