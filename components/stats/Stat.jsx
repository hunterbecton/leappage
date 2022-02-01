export const Stat = ({ title, value }) => {
  return (
    <dl className='mt-5 grid grid-cols-3 gap-5'>
      <div className='col-span-3 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 md:col-span-1 lg:col-span-3'>
        <dt className='text-sm font-medium text-gray-500 truncate'>{title}</dt>
        <dd className='mt-1 text-3xl font-semibold text-gray-900'>{value}</dd>
      </div>
    </dl>
  );
};

Stat.defaultProps = {
  title: 'Total exports',
  value: '71,897',
};
