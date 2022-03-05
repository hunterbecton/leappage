import { useEditor } from '@craftjs/core';

import { ToolboxWide } from 'components/editor/visual';
import { Toolbar } from 'components/editor/visual/toolbar';
import { Nav } from 'components/nav';
import { ComponentPanel } from 'components/editor/panels';
import { EditorMediaModal } from 'components/editor/modal/media/EditorMediaModal';
import { EditorContentModal } from 'components/editor/modal/content/EditorContentModal';
import { EditorTestimonialModal } from 'components/editor/modal/testimonial/EditorTestimonialModal';

export const Viewport = ({ children }) => {
  const { connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <>
      <ComponentPanel />
      <EditorMediaModal />
      <EditorContentModal />
      <EditorTestimonialModal />
      <div className='viewport flex h-screen flex-col bg-gray-50'>
        <Nav />
        <div className='flex' style={{ height: `calc(100% - 4rem)` }}>
          <ToolboxWide />
          <div className='page-container flex min-w-0 flex-1 flex-col overflow-hidden'>
            <main className='flex flex-1 overflow-hidden'>
              <div className='flex flex-1 overflow-hidden'>
                <section
                  id='cjs'
                  className='craftjs-renderer flex-1 overflow-scroll'
                  ref={(ref) => {
                    connectors.select(connectors.hover(ref, null), null);
                  }}
                >
                  <div className='p-12'>{children}</div>
                </section>
                <aside className='relative flex h-full w-80 flex-shrink-0 flex-col border-l border-gray-200 bg-gray-50'>
                  <Toolbar />
                </aside>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
