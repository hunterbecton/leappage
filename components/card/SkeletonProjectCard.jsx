export const SkeletonProjectCard = () => {
  return (
    <li className='relative animate-pulse select-none'>
      <div className='flex w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-200 overflow-hidden'></div>
      <div className='flex items-center mt-2 '>
        <p className='block text-sm font-medium bg-gray-200 text-gray-200 truncate pointer-events-none'>
          Loading Card
        </p>
      </div>
    </li>
  );
};
