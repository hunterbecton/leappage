import { CreateThemeForm, ManageThemeForm } from 'components/account';
import { AccountLayout } from 'components/layout';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';
import { withTheme } from 'middleware/app/withTheme';

export default function AccountTheme({ theme }) {
  return (
    <AccountLayout>
      {!theme && <CreateThemeForm />}
      {theme && <ManageThemeForm theme={theme} />}
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

  const isPermitted = await withRestrict(ctx, 'admin');

  if (!isPermitted) {
    return {
      redirect: {
        destination: '/account/profile',
        permanent: false,
      },
    };
  }

  let theme = await withTheme(ctx.req.user.tenant_mongo_id);

  theme = JSON.parse(theme);

  return {
    props: { theme },
  };
}
