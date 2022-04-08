import { FC } from 'react';
import { AnalyticsSimpleCardProps } from './_models';

export const AnalyticsSimpleCard: FC<AnalyticsSimpleCardProps> = ({
  name,
  type,
  value,
}) => {
  const handleValueRender = (type: string, value: string) => {
    switch (type) {
      case 'visitors': {
        return value ? value : 0;
      }
      case 'views': {
        return value ? value : 0;
      }
      case 'duration': {
        if (!value) {
          return '00:00';
        }

        const seconds = parseInt(value);
        let convertedDuration = new Date(seconds * 1000).toLocaleTimeString(
          'en-US',
          {
            minute: '2-digit',
            second: '2-digit',
          }
        );

        return convertedDuration;
      }
      default: {
        return value;
      }
    }
  };

  return (
    <div className='overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6'>
      <dt className='truncate text-sm font-medium text-gray-500'>{name}</dt>
      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
        {handleValueRender(type, value)}
      </dd>
    </div>
  );
};
