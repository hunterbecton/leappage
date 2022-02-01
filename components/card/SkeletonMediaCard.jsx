export const SkeletonMediaCard = () => {
  return (
    <li className='animate-pulse select-none'>
      <div className='block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-200 overflow-hidden' />
      <p className='mt-2 max-w-max block text-sm font-medium bg-gray-200 text-gray-200 truncate pointer-events-none lg:text-xs'>
        Loading card
      </p>
    </li>
  );
};
