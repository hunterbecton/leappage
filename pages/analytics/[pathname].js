import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { PageHeadingWithLabel } from 'components/heading';
import { MainLayout } from 'components/layout';
import { Container } from 'components/container';
import { PageAnalytics, PageAnalyticsGraphs } from 'components/analytics';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';
import { withPagePathname } from 'middleware/app/withPagePathname';

export default function PageAnalyticsPage() {
  const router = useRouter();

  const { pathname } = router.query;

  return (
    <>
      <NextSeo
        title='LeapPage | Page analytics'
        noindex={true}
        nofollow={true}
      />
      <MainLayout>
        <PageHeadingWithLabel
          title='Analytics'
          label={`for /${pathname}`}
          withCta={false}
        />
        <Container size='top-0' customClassName='space-y-12'>
          <PageAnalytics title='Last 30 days' />
          <PageAnalyticsGraphs />
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

  const isAdminOrEditor = await withRestrict(ctx, 'admin', 'editor');

  // Check if user owns page
  if (!isAdminOrEditor) {
    let page = await withPagePathname(ctx);

    if (!page) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {},
  };
}
