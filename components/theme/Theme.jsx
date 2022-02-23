import Head from 'next/head';
import { loadFont } from 'utils';

export const Theme = ({ theme }) => {
  let themeCss = `
  :root { 
      --primary: ${theme.primary} !important;
      --primary-light: ${theme.primaryLight} !important;
      --primary-hover: ${theme.primaryHover} !important;
    }
  #root-node {
      font-family: ${loadFont(theme.fontFamily).name};
    }
  `;

  return (
    <Head>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
      <link
        href={`https://fonts.googleapis.com/css2?family=${
          loadFont(theme.fontFamily).link
        }&display=swap`}
        rel='stylesheet'
      />
      <style>{themeCss}</style>
    </Head>
  );
};

Theme.defaultProps = {
  theme: {
    primary: '#3b82f6',
    primaryLight: '#dbeafe',
    primaryHover: '#2563eb',
  },
};
