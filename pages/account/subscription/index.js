import {
  CreateSubscriptionForm,
  ManageSubscriptionForm,
} from 'components/account';
import { AccountLayout } from 'components/layout';
import { withProtect } from 'middleware/app/withProtect';
import { withSubscription } from 'middleware/app/withSubscription';
import { withRestrict } from 'middleware/app/withRestrict';

export default function AccountSubscription({ subscription }) {
  return (
    <AccountLayout>
      {subscription && <ManageSubscriptionForm subscription={subscription} />}
      {!subscription && <CreateSubscriptionForm />}
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

  let subscription = await withSubscription(ctx);

  subscription = JSON.parse(subscription);

  return {
    props: { subscription },
  };
}
