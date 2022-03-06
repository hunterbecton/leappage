import { Nav } from 'components/nav';
import { FC } from 'react';

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Nav />
      <main className='overflow-hidden'>{children}</main>
    </>
  );
};
