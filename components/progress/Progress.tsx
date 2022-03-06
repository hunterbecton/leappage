import { useNProgress } from '@tanem/react-nprogress';
import { FC } from 'react';

import { Bar } from './Bar';
import { ProgressContainer } from './ProgressContainer';
import { ProgressProps } from './_models';

export const Progress: FC<ProgressProps> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <ProgressContainer
      animationDuration={animationDuration}
      isFinished={isFinished}
    >
      <Bar animationDuration={animationDuration} progress={progress} />
    </ProgressContainer>
  );
};
