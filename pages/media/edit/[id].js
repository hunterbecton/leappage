import { NextSeo } from 'next-seo';

import { withProtect } from 'middleware/app/withProtect';
import { withMedia } from 'middleware/app/withMedia';
import { MainLayout, ContentLayout } from 'components/layout';
import { MediaForm } from 'components/media/MediaForm';

export default function MediaPage({ media }) {
  return (
    <>
      <NextSeo title='LeapPage | Edit Media' noindex={true} nofollow={true} />
      <MainLayout>
        <ContentLayout
          title='Media Details'
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
