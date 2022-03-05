export const EditorSkeletonContentCardModal = () => {
  return (
    <li className='animate-pulse select-none'>
      <div className='group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-200' />
      <p className='pointer-events-none mt-2 block max-w-max truncate bg-gray-200 text-xs font-medium text-gray-200'>
        Loading card
      </p>
    </li>
  );
};
