import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';

export const TitleOneSettings = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text' props={['title']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='title' type='text' label='Title' />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
