import { NextSeo } from 'next-seo';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { SiteAnalytics } from 'components/analytics';
import { withProtect } from 'middleware/app/withProtect';

export default function AllAnalytics({
  totalContents,
  contents,
  totalPaginatedPages,
  parsedIndex,
}) {
  return (
    <>
      <NextSeo title='LeapPage | Analytics' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading title='Analytics' withSubtitle={false} withCta={false} />
        <SiteAnalytics />
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

  return {
    props: {},
  };
}
