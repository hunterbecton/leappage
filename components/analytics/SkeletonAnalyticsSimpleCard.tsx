import { FC } from 'react';
import { SkeletonAnalyticsSimpleCardProps } from './_models';

export const SkeletonAnalyticsSimpleCard: FC<
  SkeletonAnalyticsSimpleCardProps
> = ({ name }) => {
  return (
    <div className='overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6'>
      <dt className='truncate text-sm font-medium text-gray-500'>{name}</dt>
      <dd className='mt-1 animate-pulse select-none bg-gray-200 text-3xl font-semibold text-gray-200'>
        Loading
      </dd>
    </div>
  );
};
