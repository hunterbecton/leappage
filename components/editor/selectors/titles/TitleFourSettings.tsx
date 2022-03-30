import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { FC } from 'react';

export const TitleFourSettings: FC = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text'>
          <ToolbarGroup full={true}>
            <ToolbarItem label='Subtitle' propKey='subtitle' type='text' />
            <ToolbarItem label='Title' propKey='title' type='text' />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
