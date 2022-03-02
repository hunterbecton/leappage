import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { ContentTable } from 'components/table';
import { Pagination } from 'components/pagination';
import { useProgressStore } from 'store';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';
import { withContents } from 'middleware/app/withContents';

export default function AllContent({
  totalContents,
  contents,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const createNewContent = async () => {
    setIsAnimating(true);
    setIsCreating(true);

    try {
      const body = {
        title: 'Untitled Content',
      };

      const res = await fetch(`/api/content`, {
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
        toast.success('Content created.');
        router.push(`/content/edit/${data.content.id}`);
      }
    } catch (error) {
      toast.error('Error creating content.');
      console.log(error);
    }

    setIsAnimating(false);
    setIsCreating(false);
  };

  return (
    <>
      <NextSeo title='LeapPage | Content' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading
          title='Content'
          withSubtitle={false}
          withCta={true}
          ctaText='Create Content'
          ctaDisabled={isCreating}
          ctaOnClick={() => createNewContent()}
        />
        {contents.length === 0 && (
          <Empty
            title='No Content'
            subtitle='Create new content below to get started'
            withCta={true}
            ctaOneText='Create Content'
            ctaOneOnClick={() => createNewContent()}
            ctaOneIcon={null}
            withCtaTwo={false}
          />
        )}
        {contents.length > 0 && (
          <>
            <ContentTable content={contents} />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalContents}
              totalPages={totalPaginatedPages}
              href='/content/'
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
        destination: '/content/1',
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

  let allContentsInfo = await withContents(ctx);

  if (!allContentsInfo) {
    return {
      notFound: true,
    };
  }

  allContentsInfo = JSON.parse(allContentsInfo);

  const { totalContents, contents } = allContentsInfo;

  const totalPaginatedPages = Math.ceil(totalContents / 24);

  if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
    return {
      redirect: {
        destination: '/content/1',
        permanent: false,
      },
    };
  }

  if (totalContents === 0 && parsedIndex > 1) {
    return {
      redirect: {
        destination: '/content/1',
        permanent: false,
      },
    };
  }

  return {
    props: { totalContents, contents, totalPaginatedPages, parsedIndex },
  };
}
