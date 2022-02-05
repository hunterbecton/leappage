import { ActivityCard } from "components/card";

export const ActivityList = ({ items }) => {
  return (
    <ul className="-mt-12 divide-y divide-gray-200">
      {items?.map((item) => (
        <ActivityCard item={item} key={item._id} />
      ))}
    </ul>
  );
};
