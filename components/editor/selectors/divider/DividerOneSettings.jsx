import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';

export const DividerOneSettings = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Divider' props={['paddingY']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='enabled' type='toggle' label='Line' />
            <ToolbarItem
              propKey='paddingY'
              type='range'
              label='Height'
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
