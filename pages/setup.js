import { Setup } from 'components/auth';
import { withTenant } from 'middleware/app/withTenant';

export default function SetupPage({ tenant }) {
  return <Setup tenant={tenant} />;
}

export async function getServerSideProps(ctx) {
  let tenant = await withTenant(ctx);

  // Return 404 page if no tenant
  if (!tenant) {
    return {
      notFound: true,
    };
  }

  tenant = JSON.parse(tenant);

  return {
    props: { tenant },
  };
}
