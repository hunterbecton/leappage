import { TeamForm } from "components/account";
import { AccountLayout } from "components/layout";
import { withProtect } from "middleware/app/withProtect";
import { withTeam } from "middleware/app/withTeam";

export default function AccountTeam({ team }) {
  return (
    <AccountLayout>
      <TeamForm team={team} />
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

  let team = await withTeam(ctx);

  if (!team) {
    return {
      notFound: true,
    };
  }

  team = JSON.parse(team);

  return {
    props: { team },
  };
}
