import { useEditor } from '@craftjs/core';

import { ToolboxWide } from 'components/editor/visual';
import { Toolbar } from 'components/editor/visual/toolbar';
import { Nav } from 'components/nav';
import { ComponentPanel } from 'components/editor/panels';
import { MediaModal } from 'components/editor/modal/media/MediaModal';
import { ContentModal } from 'components/editor/modal/content/ContentModal';
import { TestimonialModal } from 'components/editor/modal/testimonial/TestimonialModal';

export const Viewport = ({ children }) => {
  const { connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <>
      <ComponentPanel />
      <MediaModal />
      <ContentModal />
      <TestimonialModal />
      <div className='viewport flex flex-col bg-gray-50 h-screen'>
        <Nav />
        <div className='flex' style={{ height: `calc(100% - 4rem)` }}>
          <ToolboxWide />
          <div className='page-container flex-1 min-w-0 flex flex-col overflow-hidden'>
            <main className='flex-1 flex overflow-hidden'>
              <div className='flex-1 flex overflow-hidden'>
                <section
                  id='cjs'
                  className='craftjs-renderer flex-1 overflow-scroll'
                  ref={(ref) => {
                    connectors.select(connectors.hover(ref, null), null);
                  }}
                >
                  <div className='p-12'>{children}</div>
                </section>
                <aside className='h-full relative flex flex-col w-80 bg-gray-50 border-l border-gray-200 flex-shrink-0'>
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
