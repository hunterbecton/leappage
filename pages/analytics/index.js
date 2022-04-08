import { NextSeo } from 'next-seo';

import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { Container } from 'components/container';
import {
  SiteAnalytics,
  SiteAnalyticsGraphs,
  SiteAnalyticsPages,
} from 'components/analytics';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';

export default function AllAnalytics() {
  return (
    <>
      <NextSeo title='LeapPage | Analytics' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading title='Analytics' withSubtitle={false} withCta={false} />
        <Container size='top-0' customClassName='space-y-12'>
          <SiteAnalytics title='Last 30 days' />
          <SiteAnalyticsGraphs />
          <SiteAnalyticsPages />
        </Container>
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

  return {
    props: {},
  };
}
