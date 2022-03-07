import { useEditor } from '@craftjs/core';
import { FC } from 'react';

import { classNames } from 'utils';
import { Toolbar } from 'components/editor/visual/toolbar';

export const Sidebar: FC = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      className={classNames(
        enabled ? 'opacity-100' : 'opacity-0',
        'sidebar h-full w-full'
      )}
    >
      <Toolbar />
    </div>
  );
};
