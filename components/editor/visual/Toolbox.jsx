import { useEditor } from '@craftjs/core';
import { BiUndo, BiRedo, BiCloud } from 'react-icons/bi';

import {
  ToolboxEditButton,
  ToolboxPanelButton,
} from 'components/editor/visual';

export const Toolbox = () => {
  const {
    connectors: { create },
    enabled,
    canUndo,
    canRedo,
    actions,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <div className='flex h-full z-20'>
      <div className='flex flex-col w-16'>
        <div className='flex-1 flex flex-col min-h-0 overflow-y-auto bg-gray-700'>
          <div className='flex-1 flex flex-col'>
            <div aria-label='Sidebar' className='py-4 flex flex-col h-full'>
              <div className='flex flex-col items-center space-y-3'>
                {/* Create Logo Cloud */}
                <ToolboxPanelButton
                  icon={<BiCloud className='h-5 w-5' aria-hidden='true' />}
                  toolTip='Logo Clouds'
                />
              </div>
              <div className='flex flex-col items-center space-y-3 mt-auto'>
                {/* Undo Changes */}
                <ToolboxEditButton
                  icon={<BiUndo className='h-5 w-5' aria-hidden='true' />}
                  toolTip='Undo'
                  disabled={!canUndo}
                  onClick={() => actions.history.undo()}
                />
                <ToolboxEditButton
                  icon={<BiRedo className='h-5 w-5' aria-hidden='true' />}
                  toolTip='Redo'
                  disabled={!canRedo}
                  onClick={() => actions.history.redo()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
