import { FC } from 'react';
import { BadgeProps } from './_models';

export const Badge: FC<BadgeProps> = ({ type, text }) => {
  switch (type) {
    case 'pending':
      return (
        <span className='inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium capitalize text-yellow-800'>
          {text}
        </span>
      );
    case 'incomplete':
      return (
        <span className='inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium capitalize text-yellow-800'>
          {text}
        </span>
      );
    case 'incomplete_expired':
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
    case 'all':
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
    case 'past_due':
      return (
        <span className='inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium capitalize text-yellow-800'>
          {text}
        </span>
      );
    case 'active':
      return (
        <span className='inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800'>
          {text}
        </span>
      );
    case 'trialing':
      return (
        <span className='inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800'>
          {text}
        </span>
      );
    case 'inactive':
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
    case 'canceled':
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
    case 'ended':
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
    case 'unpaid':
      return (
        <span className='inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium capitalize text-red-800'>
          {text}
        </span>
      );
    case 'loading':
      return (
        <span className='inline-flex items-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium capitalize text-gray-200'>
          {text}
        </span>
      );
    case 'drafted':
      return (
        <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-800'>
          {text}
        </span>
      );
    case 'preview':
      return (
        <span className='inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium capitalize text-purple-800'>
          {text}
        </span>
      );
    case 'published':
      return (
        <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800'>
          {text}
        </span>
      );
    case 'categorized':
      return (
        <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-800'>
          {text}
        </span>
      );
    case 'uncategorized':
      return (
        <span className='inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-800'>
          {text}
        </span>
      );
    case 'verified':
      return (
        <span className='inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800'>
          {text}
        </span>
      );
    default:
      return (
        <span className='inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-800'>
          {text}
        </span>
      );
  }
};

Badge.defaultProps = {
  type: 'inactive',
  text: 'Badge',
};
