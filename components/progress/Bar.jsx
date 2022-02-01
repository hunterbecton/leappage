export const Bar = ({ animationDuration, progress }) => (
  <div
    className='bg-blue-600'
    style={{
      height: 4,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'fixed',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
    }}
  ></div>
);
