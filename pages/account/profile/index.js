import { ProfileForm } from "components/account";
import { AccountLayout } from "components/layout";
import { withProtect } from "middleware/app/withProtect";
import { withUser } from "middleware/app/withUser";

export default function AccountProfile({ user }) {
  return (
    <AccountLayout>
      <ProfileForm currentUser={user} />
    </AccountLayout>
  );
}

export async function getServerSideProps(ctx) {
  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let user = await withUser(ctx);

  if (!user) {
    return {
      notFound: true,
    };
  }

  user = JSON.parse(user);

  return {
    props: { user },
  };
}
