import { Nav } from 'components/nav';
import Image from 'next/image';

export const Loading = ({ withNav, height, customClassName }) => {
  return (
    <>
      {withNav && <Nav />}
      <div
        style={{ height: withNav ? 'calc(100vh - 4rem)' : height }}
        className={`flex w-full items-center justify-center ${customClassName}`}
      >
        <div className='relative h-10 w-10 overflow-hidden'>
          <Image
            src='/loading/circles.svg'
            alt='Loading'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
    </>
  );
};

Loading.defaultProps = {
  withNav: true,
  height: '100vh',
  customClassName: '',
};
