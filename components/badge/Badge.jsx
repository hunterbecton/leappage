export const Badge = ({ type, text }) => {
  switch (type) {
    case 'pending':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 capitalize'>
          {text}
        </span>
      );
    case 'incomplete':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 capitalize'>
          {text}
        </span>
      );
    case 'incomplete_expired':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
    case 'all':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
    case 'past_due':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 capitalize'>
          {text}
        </span>
      );
    case 'active':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 capitalize'>
          {text}
        </span>
      );
    case 'trialing':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 capitalize'>
          {text}
        </span>
      );
    case 'inactive':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
    case 'canceled':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
    case 'ended':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
    case 'unpaid':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 capitalize'>
          {text}
        </span>
      );
    case 'loading':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-200 capitalize'>
          {text}
        </span>
      );
    case 'drafted':
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize'>
          {text}
        </span>
      );
    case 'preview':
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize'>
          {text}
        </span>
      );
    case 'published':
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize'>
          {text}
        </span>
      );
    case 'categorized':
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize'>
          {text}
        </span>
      );
    case 'uncategorized':
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize'>
          {text}
        </span>
      );
    case 'verified':
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 capitalize'>
          {text}
        </span>
      );
    default:
      return (
        <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
          {text}
        </span>
      );
  }
};

Badge.defaultProps = {
  type: 'inactive',
  text: 'Badge',
};
