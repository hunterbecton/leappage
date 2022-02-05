export const Stat = ({ title, value }) => {
  return (
    <dl className="mt-5 grid grid-cols-3 gap-5">
      <div className="col-span-3 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 md:col-span-1 lg:col-span-3">
        <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </div>
    </dl>
  );
};

Stat.defaultProps = {
  title: "Total exports",
  value: "71,897",
};
