import { FC } from 'react';

export const FullScreen: FC = ({ children }) => {
  return <div className='flex min-h-screen flex-col'>{children}</div>;
};
