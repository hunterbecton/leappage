import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { PageTable } from 'components/table';
import { Pagination } from 'components/pagination';
import { useProgressStore } from 'store';
import { withRestrict } from 'middleware/app/withRestrict';
import { withProtect } from 'middleware/app/withProtect';
import { withPages } from 'middleware/app/withPages';
import { withPagesAsAdmin } from 'middleware/app/withPagesAsAdmin';

export default function AllPages({
  totalPages,
  pages,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const createNewPage = async () => {
    setIsAnimating(true);
    setIsCreating(true);

    try {
      const body = {
        title: 'Untitled Page',
      };

      const res = await fetch(`/api/page`, {
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
        toast.success('Page created.');
        router.push(`/pages/edit/${data.page.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error creating page.');
    }

    setIsAnimating(false);
    setIsCreating(false);
  };

  return (
    <>
      <NextSeo title='LeapPage | Pages' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading
          title='Pages'
          withSubtitle={false}
          withCta={true}
          ctaText='Create page'
          ctaDisabled={isCreating}
          ctaOnClick={() => createNewPage()}
        />
        {pages.length === 0 && (
          <Empty
            title='No pages'
            subtitle='Create a new page below to get started'
            ctaOneText='Create page'
            ctaOneOnClick={() => createNewPage()}
            ctaOneIcon={null}
            withCtaTwo={false}
          />
        )}
        {pages.length > 0 && (
          <>
            <PageTable pages={pages} />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalPages}
              totalPages={totalPaginatedPages}
              href='/pages/'
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
        destination: '/pages/1',
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

  const isAdminOrEditor = await withRestrict(ctx, 'admin', 'editor');

  // Show all pages if admin or editor
  if (isAdminOrEditor) {
    let allPagesInfo = await withPagesAsAdmin(ctx);

    if (!allPagesInfo) {
      return {
        notFound: true,
      };
    }

    allPagesInfo = JSON.parse(allPagesInfo);

    const { totalPages, pages } = allPagesInfo;

    const totalPaginatedPages = Math.ceil(totalPages / 24);

    if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
      return {
        redirect: {
          destination: '/pages/1',
          permanent: false,
        },
      };
    }

    if (totalPages === 0 && parsedIndex > 1) {
      return {
        redirect: {
          destination: '/pages/1',
          permanent: false,
        },
      };
    }

    return {
      props: { totalPages, pages, totalPaginatedPages, parsedIndex },
    };
  }

  // Only get pages user owns
  if (!isAdminOrEditor) {
    let allPagesInfo = await withPages(ctx);

    if (!allPagesInfo) {
      return {
        notFound: true,
      };
    }

    allPagesInfo = JSON.parse(allPagesInfo);

    const { totalPages, pages } = allPagesInfo;

    const totalPaginatedPages = Math.ceil(totalPages / 24);

    if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
      return {
        redirect: {
          destination: '/pages/1',
          permanent: false,
        },
      };
    }

    if (totalPages === 0 && parsedIndex > 1) {
      return {
        redirect: {
          destination: '/pages/1',
          permanent: false,
        },
      };
    }

    return {
      props: { totalPages, pages, totalPaginatedPages, parsedIndex },
    };
  }
}
