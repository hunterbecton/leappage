import { FC } from 'react';
import { classNames } from 'utils';
import { ToolbarMenuItemProps } from './_models';

export const ToolbarMenuItem: FC<ToolbarMenuItemProps> = ({
  active,
  children,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      {children}
    </button>
  );
};
