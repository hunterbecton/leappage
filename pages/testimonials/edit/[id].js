import { NextSeo } from "next-seo";

import { withProtect } from "middleware/app/withProtect";
import { withTestimonial } from "middleware/app/withTestimonial";
import { MainLayout, ContentLayout } from "components/layout";
import { withCategories } from "middleware/app/withCategories";
import { TestimonialForm } from "components/testimonial";

export default function TestimonialPage({ testimonial, categoryOptions }) {
  return (
    <>
      <NextSeo
        title="LeapPage | Edit Testimonial"
        noindex={true}
        nofollow={true}
      />
      <MainLayout>
        <ContentLayout
          title="Testimonial Details"
          description="Update or delete testimonial"
        >
          <TestimonialForm
            testimonial={testimonial}
            categoryOptions={categoryOptions}
          />
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

  let testimonial = await withTestimonial(ctx);

  if (!testimonial) {
    return {
      notFound: true,
    };
  }

  testimonial = JSON.parse(testimonial);

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
    props: { testimonial, categoryOptions },
  };
}
