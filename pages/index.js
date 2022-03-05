export default function Home() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/pages/1',
      permanent: false,
    },
  };
}
