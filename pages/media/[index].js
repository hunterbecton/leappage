import { useState } from 'react';
import { NextSeo } from 'next-seo';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { Pagination } from 'components/pagination';
import { withProtect } from 'middleware/app/withProtect';
import { withMedias } from 'middleware/app/withMedias';
import { withRestrict } from 'middleware/app/withRestrict';
import { MediaList } from 'components/list/MediaList';
import { UploadFileModal } from 'components/modal';

export default function AllMedia({
  totalMedia,
  medias,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NextSeo title='LeapPage | Media' noindex={true} nofollow={true} />
      <UploadFileModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainLayout>
        <PageHeading
          title='Media'
          withSubtitle={false}
          withCta={true}
          ctaText='Upload file'
          ctaDisabled={isOpen}
          ctaOnClick={() => setIsOpen(true)}
        />
        {totalMedia === 0 && (
          <Empty
            title='No media'
            subtitle='Get started by uploading a file'
            withCta={true}
            ctaOneText='Upload file'
            ctaOneOnClick={() => setIsOpen(true)}
            ctaOneIcon={null}
            ctaTwoText=''
            ctaTwoOnClick={() => null}
          />
        )}
        {totalMedia > 0 && (
          <>
            <MediaList items={medias} href='/media/edit/' />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalMedia}
              totalPages={totalPaginatedPages}
              href='/media/'
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
        destination: '/media/1',
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

  let allMediaInfo = await withMedias(ctx);

  if (!allMediaInfo) {
    return {
      notFound: true,
    };
  }

  allMediaInfo = JSON.parse(allMediaInfo);

  const { totalMedia, medias } = allMediaInfo;

  if (!medias) {
    return {
      notFound: true,
    };
  }

  const totalPaginatedPages = Math.ceil(totalMedia / 24);

  if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
    return {
      redirect: {
        destination: '/media/1',
        permanent: false,
      },
    };
  }

  if (totalMedia === 0 && parsedIndex > 1) {
    return {
      redirect: {
        destination: '/media/1',
        permanent: false,
      },
    };
  }

  return {
    props: { totalMedia, medias, totalPaginatedPages, parsedIndex },
  };
}
