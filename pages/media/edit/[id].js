import { NextSeo } from 'next-seo';

import { withProtect } from 'middleware/app/withProtect';
import { withMedia } from 'middleware/app/withMedia';
import { withRestrict } from 'middleware/app/withRestrict';
import { MainLayout, ContentLayout } from 'components/layout';
import { MediaForm } from 'components/media/MediaForm';

export default function MediaPage({ media }) {
  return (
    <>
      <NextSeo title='LeapPage | Edit media' noindex={true} nofollow={true} />
      <MainLayout>
        <ContentLayout
          title='Media details'
          description='Update or replace media file'
        >
          <MediaForm media={media} />
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

  let media = await withMedia(ctx);

  if (!media) {
    return {
      notFound: true,
    };
  }

  media = JSON.parse(media);

  return {
    props: { media },
  };
}
