import { Nav } from 'components/nav';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className='overflow-hidden'>{children}</main>
    </>
  );
};
