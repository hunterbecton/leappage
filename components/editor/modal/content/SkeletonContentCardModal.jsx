export const SkeletonContentCardModal = () => {
  return (
    <li className='animate-pulse select-none'>
      <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-200 overflow-hidden' />
      <p className='mt-2 max-w-max block text-xs font-medium text-gray-200 bg-gray-200 truncate pointer-events-none'>
        Loading card
      </p>
    </li>
  );
};
