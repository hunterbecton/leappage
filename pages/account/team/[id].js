import { TeammateForm } from 'components/account/TeammateForm';
import { AccountLayout } from 'components/layout';
import { withProtect } from 'middleware/app/withProtect';
import { withTeammate } from 'middleware/app/withTeammate';
import { withRestrict } from 'middleware/app/withRestrict';

export default function AccountTeam({ teammate }) {
  return (
    <AccountLayout>
      <TeammateForm teammate={teammate} />
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

  let teammate = await withTeammate(ctx);

  if (!teammate) {
    return {
      notFound: true,
    };
  }

  teammate = JSON.parse(teammate);

  return {
    props: { teammate },
  };
}
