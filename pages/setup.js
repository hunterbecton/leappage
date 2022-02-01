import { Setup } from 'components/auth';
import { withTenant } from 'middleware/app/withTenant';

export default function SetupPage({ tenant }) {
  return <Setup tenant={tenant} />;
}

export async function getServerSideProps(ctx) {
  const tenantRes = await withTenant(ctx);

  const tenant = JSON.parse(tenantRes);

  // Return 404 page if no tenant
  if (!tenant) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tenant },
  };
}
