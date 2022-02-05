import { convertTime, downloadFile } from "utils";

export const ExportCard = ({ item, children }) => {
  const fileType = item.url.substring(item.url.lastIndexOf(".") + 1);

  return (
    <li className="relative">
      <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.url}
          alt={item.id}
          loading="lazy"
          className="pointer-events-none object-contain p-4 group-hover:opacity-75"
        />
        <button
          type="button"
          onClick={() => downloadFile(item.url, fileType)}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">Download image</span>
        </button>
      </div>
      <div className="mt-2 flex items-center ">
        <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">
          {convertTime(item.createdAt)}
        </p>
        {children}
      </div>
    </li>
  );
};
