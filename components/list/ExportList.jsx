import { ExportCard } from "components/card";
import { Container } from "components/container";

export const ExportList = ({ items, href }) => {
  return (
    <Container size="0">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {items?.map((item) => (
          <ExportCard key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

ExportList.defaultProps = {
  items: [],
};
