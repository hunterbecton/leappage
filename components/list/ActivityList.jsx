import { ActivityCard } from 'components/card';

export const ActivityList = ({ items }) => {
  return (
    <ul className='divide-y divide-gray-200 -mt-12'>
      {items?.map((item) => (
        <ActivityCard item={item} key={item._id} />
      ))}
    </ul>
  );
};
