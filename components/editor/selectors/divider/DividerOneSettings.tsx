import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { FC } from 'react';

export const DividerOneSettings: FC = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Divider'>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='enabled' type='toggle' />
            <ToolbarItem
              propKey='paddingY'
              type='range'
              min={1}
              max={6}
              step={0.5}
            />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
