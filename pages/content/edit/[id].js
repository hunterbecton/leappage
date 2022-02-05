import { NextSeo } from "next-seo";

import { withProtect } from "middleware/app/withProtect";
import { withContent } from "middleware/app/withContent";
import { MainLayout, ContentLayout } from "components/layout";
import { ContentForm } from "components/content";
import { withCategories } from "middleware/app/withCategories";

export default function ContentPage({ content, categoryOptions }) {
  return (
    <>
      <NextSeo title="LeapPage | Edit Content" noindex={true} nofollow={true} />
      <MainLayout>
        <ContentLayout
          title="Content Details"
          description="Update or delete content"
        >
          <ContentForm content={content} categoryOptions={categoryOptions} />
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

  let content = await withContent(ctx);

  if (!content) {
    return {
      notFound: true,
    };
  }

  content = JSON.parse(content);

  let allCategoriesInfo = await withCategories(ctx);

  allCategoriesInfo = JSON.parse(allCategoriesInfo);

  const { totalCategories, categories } = allCategoriesInfo;

  let categoryOptions = [];

  if (categories.length > 0) {
    categories.forEach((category) => {
      categoryOptions.push({
        value: category._id,
        text: category.title,
      });
    });
  }

  return {
    props: { content, categoryOptions },
  };
}
