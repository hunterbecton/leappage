import { useEditor } from '@craftjs/core';
import { useState } from 'react';

import { classNames } from 'utils';
import { Toolbar } from 'components/editor/visual/toolbar';

export const Sidebar = () => {
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      className={classNames(
        enabled ? 'opacity-100' : 'opacity-0',
        'sidebar w-full h-full'
      )}
    >
      <Toolbar />
    </div>
  );
};
