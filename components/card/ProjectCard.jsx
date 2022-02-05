import Link from "next/link";

export const ProjectCard = ({ item, href, children }) => {
  return (
    <li className="relative">
      <Link href={`${href}${item._id}`}>
        <a className="focus:outline-none">
          <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            {item.featureImg && (
              <>
                <img
                  src={item.featureImg}
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
              </>
            )}
            {!item.featureImg && (
              <div className="pointer-events-none flex h-full w-full items-center justify-center group-hover:opacity-75">
                <p className="lg:text-md text-sm text-gray-500">
                  Preview Unavailable
                </p>
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">View details for image</span>
                </button>
              </div>
            )}
          </div>
        </a>
      </Link>
      <div className="mt-2 flex items-center ">
        <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">
          {item.title}
        </p>
        {children}
      </div>
    </li>
  );
};
