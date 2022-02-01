import { SkeletonActivityCard } from 'components/card';

export const SkeletonActivityList = () => {
  const items = Array.from(Array(12).keys());

  return (
    <ul className='divide-y divide-gray-200 -mt-12'>
      {items.map((item) => (
        <SkeletonActivityCard key={`activity-${item}`} />
      ))}
    </ul>
  );
};
