import Link from "next/link";

export const MediaCard = ({ item, href }) => {
  return (
    <li className="relative">
      <Link href={`${href}${item._id}`}>
        <a className="focus:outline-none">
          <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="pointer-events-none object-contain p-4 group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for image</span>
            </button>
          </div>
        </a>
      </Link>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 lg:text-xs">
        {item.title}
      </p>
    </li>
  );
};
