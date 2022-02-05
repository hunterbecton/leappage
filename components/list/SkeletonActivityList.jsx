import { SkeletonActivityCard } from "components/card";

export const SkeletonActivityList = () => {
  const items = Array.from(Array(12).keys());

  return (
    <ul className="-mt-12 divide-y divide-gray-200">
      {items.map((item) => (
        <SkeletonActivityCard key={`activity-${item}`} />
      ))}
    </ul>
  );
};
