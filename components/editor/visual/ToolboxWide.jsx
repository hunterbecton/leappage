import { useEditor } from '@craftjs/core';

import { ToolboxPanelTextButton } from 'components/editor/visual';

export const ToolboxWide = () => {
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
    <div className='flex flex-shrink-0'>
      <div className='flex flex-col w-44'>
        <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100'>
          <div className='flex-1 flex flex-col py-5 overflow-y-auto'>
            <nav className='mt-5 flex-1' aria-label='Sidebar'>
              <div className='px-2 space-y-1'>
                <ToolboxPanelTextButton
                  title='Heroes'
                  text='Heroes'
                  component='heroes'
                />
                <ToolboxPanelTextButton
                  title='Titles'
                  text='Titles'
                  component='titles'
                />
                <ToolboxPanelTextButton
                  title='Content'
                  text='Content'
                  component='content'
                />
                <ToolboxPanelTextButton
                  title='Testimonials'
                  text='Testimonials'
                  component='testimonials'
                />
                <ToolboxPanelTextButton
                  title='Steps'
                  text='Steps'
                  component='steps'
                />
                <ToolboxPanelTextButton
                  title='Logos'
                  text='Logos'
                  component='logos'
                />
                <ToolboxPanelTextButton
                  title='Links'
                  text='Links'
                  component='links'
                />
                <ToolboxPanelTextButton
                  title='Dividers'
                  text='Dividers'
                  component='dividers'
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
