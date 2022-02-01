import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';

export const TitleThreeSettings = () => {
  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text' props={['title']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='subtitle' type='text' label='Subtitle' />
            <ToolbarItem propKey='title' type='text' label='Title' />
            <ToolbarItem
              propKey='description'
              type='text'
              label='Description'
            />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
