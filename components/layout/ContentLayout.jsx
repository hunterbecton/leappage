import { Container } from "components/container";

export const ContentLayout = ({ children, title, description }) => {
  return (
    <Container
      customClassName="bg-gray-50"
      style={{ minHeight: "calc(100vh - 4rem" }}
    >
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
};

ContentLayout.defaultProps = {
  title: "Media Details",
  description: "Update or replace media file",
};
