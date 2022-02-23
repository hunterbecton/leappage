import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { CategoryTable } from 'components/table';
import { Pagination } from 'components/pagination';
import { useProgressStore } from 'store';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';
import { withCategories } from 'middleware/app/withCategories';

export default function AllCategories({
  totalCategories,
  categories,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const createNewCategory = async () => {
    setIsAnimating(true);
    setIsCreating(true);

    try {
      const body = {
        title: 'Untitled Category',
      };

      const res = await fetch(`/api/category`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Category created.');
        router.push(`/categories/edit/${data.category.id}`);
      }
    } catch (error) {
      toast.error('Error creating category.');
      console.log(error);
    }

    setIsAnimating(false);
    setIsCreating(false);
  };

  return (
    <>
      <NextSeo title='LeapPage | Categories' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading
          title='Categories'
          withSubtitle={false}
          withCta={true}
          ctaText='Create Category'
          ctaDisabled={isCreating}
          ctaOnClick={() => createNewCategory()}
        />
        {totalCategories === 0 && (
          <Empty
            title='No Categories'
            subtitle='Create new category below to get startedv'
            withCta={true}
            ctaOneText='Create Category'
            ctaOneOnClick={() => createNewCategory()}
            ctaOneIcon={null}
            withCtaTwo={false}
          />
        )}
        {totalCategories > 0 && (
          <>
            <CategoryTable categories={categories} />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalCategories}
              totalPages={totalPaginatedPages}
            />
          </>
        )}
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { index } = ctx.params;

  const parsedIndex = parseInt(index);

  // Redirect if not number
  if (!parsedIndex) {
    return {
      redirect: {
        destination: '/categories/1',
        permanent: false,
      },
    };
  }

  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const isPermitted = await withRestrict(ctx, 'admin', 'editor');

  if (!isPermitted) {
    return {
      redirect: {
        destination: '/pages/1',
        permanent: false,
      },
    };
  }

  let allCategoriesInfo = await withCategories(ctx);

  if (!allCategoriesInfo) {
    return {
      notFound: true,
    };
  }

  allCategoriesInfo = JSON.parse(allCategoriesInfo);

  const { totalCategories, categories } = allCategoriesInfo;

  const totalPaginatedPages = Math.ceil(totalCategories / 24);

  if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
    return {
      redirect: {
        destination: '/categories/1',
        permanent: false,
      },
    };
  }

  if (totalCategories === 0 && parsedIndex > 1) {
    return {
      redirect: {
        destination: '/categories/1',
        permanent: false,
      },
    };
  }

  return {
    props: { totalCategories, categories, totalPaginatedPages, parsedIndex },
  };
}
