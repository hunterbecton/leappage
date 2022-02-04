import { CreateDomainForm, ManageDomainForm } from 'components/account';
import { AccountLayout } from 'components/layout';
import { withProtect } from 'middleware/app/withProtect';
import { withTenant } from 'middleware/app/withTenant';
import { withDomain } from 'middleware/app/withDomain';

export default function AccountDomain({ tenant, domainStatus }) {
  return (
    <AccountLayout>
      {!tenant.domain && <CreateDomainForm />}
      {tenant.domain && (
        <ManageDomainForm tenant={tenant} domainStatus={domainStatus} />
      )}
    </AccountLayout>
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

  const tenantRes = await withTenant(ctx);

  const tenant = JSON.parse(tenantRes);

  // Return 404 page if no tenant
  if (!tenant) {
    return {
      notFound: true,
    };
  }

  let domainStatus = 'Unverified';

  if (tenant.domain) {
    domainStatus = await withDomain(tenant.domain);
  }

  return {
    props: { tenant, domainStatus },
  };
}
