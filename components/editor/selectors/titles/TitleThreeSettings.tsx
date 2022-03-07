import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { FC } from 'react';

export const TitleThreeSettings: FC = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text'>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='subtitle' type='text' />
            <ToolbarItem propKey='title' type='text' />
            <ToolbarItem propKey='description' type='text' />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
