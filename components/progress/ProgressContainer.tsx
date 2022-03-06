import { FC } from 'react';
import { ProgressContainerProps } from './_models';

export const ProgressContainer: FC<ProgressContainerProps> = ({
  animationDuration,
  isFinished,
  children,
}) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
      zIndex: 1000,
    }}
  >
    {children}
  </div>
);
