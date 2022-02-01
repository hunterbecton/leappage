import { useNode } from '@craftjs/core';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';

export const HeroTwoSettings = () => {
  const {
    nodeCtas,
    actions: { setProp },
  } = useNode((node) => ({
    nodeCtas: node.data.props.ctas,
  }));

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text' props={['title']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='title' type='text' label='Title' />
            <ToolbarItem
              propKey='description'
              type='text'
              label='Description'
            />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='CTA' props={['ctas']}>
          {nodeCtas.map((nodeCta, i) => (
            <ToolbarGroup key={nodeCta.id} bgColor='bg-gray-100' full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='text'
                type='text'
                label='Text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='link'
                type='text'
                label='Link'
              />
            </ToolbarGroup>
          ))}
        </ToolbarSection>
        <ToolbarSection title='Video' props={['videoUrl']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='videoUrl' type='text' label='Link' />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
