import { classNames } from 'utils';

export const ToolbarMenuItem = ({ active, text, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      {text}
    </button>
  );
};
