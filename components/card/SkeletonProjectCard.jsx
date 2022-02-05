export const SkeletonProjectCard = () => {
  return (
    <li className="relative animate-pulse select-none">
      <div className="aspect-w-10 aspect-h-7 flex w-full overflow-hidden rounded-lg bg-gray-200"></div>
      <div className="mt-2 flex items-center ">
        <p className="pointer-events-none block truncate bg-gray-200 text-sm font-medium text-gray-200">
          Loading Card
        </p>
      </div>
    </li>
  );
};
