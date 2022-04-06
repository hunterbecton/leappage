import { FC } from 'react';
import { AnalyticsSimpleCardProps } from './_models';

export const AnalyticsSimpleCard: FC<AnalyticsSimpleCardProps> = ({
  name,
  value,
}) => {
  return (
    <div className='overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6'>
      <dt className='truncate text-sm font-medium text-gray-500'>{name}</dt>
      <dd className='mt-1 text-3xl font-semibold text-gray-900'>{value}</dd>
    </div>
  );
};
