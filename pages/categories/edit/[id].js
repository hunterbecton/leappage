import { NextSeo } from "next-seo";

import { withProtect } from "middleware/app/withProtect";
import { withCategory } from "middleware/app/withCategory";
import { MainLayout, ContentLayout } from "components/layout";
import { CategoryForm } from "components/category";

export default function CategoryPage({ category }) {
  return (
    <>
      <NextSeo
        title="LeapPage | Edit Category"
        noindex={true}
        nofollow={true}
      />
      <MainLayout>
        <ContentLayout
          title="Category Details"
          description="Update or delete category"
        >
          <CategoryForm category={category} />
        </ContentLayout>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let category = await withCategory(ctx);

  if (!category) {
    return {
      notFound: true,
    };
  }

  category = JSON.parse(category);

  return {
    props: { category },
  };
}
