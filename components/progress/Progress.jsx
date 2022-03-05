import { useNProgress } from '@tanem/react-nprogress';

import { Bar } from './Bar';
import { ProgressContainer } from './ProgressContainer';

export const Progress = ({ isAnimating }) => {
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
