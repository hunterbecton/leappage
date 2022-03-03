import { useNode } from '@craftjs/core';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';

export const HeroOneSettings = () => {
  const {
    nodeCtas,
    nodeLogos,
    actions: { setProp },
  } = useNode((node) => ({
    nodeCtas: node.data.props.ctas,
    nodeLogos: node.data.props.logos,
  }));

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Logo' props={['logos']}>
          {nodeLogos.map((nodeLogo, i) => (
            <ToolbarGroup key={nodeLogo.id} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='company'
                type='text'
                label='Company'
              />
              <ToolbarItem
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='src'
                type='image'
                label='Logo'
                defaultMediaSize='500'
              />
            </ToolbarGroup>
          ))}
        </ToolbarSection>
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
            <ToolbarGroup key={nodeCta.id} full={true}>
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
      </div>
    </>
  );
};
