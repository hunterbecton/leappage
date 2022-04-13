import { useNode } from '@craftjs/core';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { FC } from 'react';

export const HeroTwoSettings: FC = () => {
  const {
    nodeCtas,
    actions: { setProp },
  } = useNode((node) => ({
    nodeCtas: node.data.props.ctas,
  }));

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text'>
          <ToolbarGroup full={true}>
            <ToolbarItem label='Title' propKey='title' type='text' />
            <ToolbarItem
              label='Description'
              propKey='description'
              type='area'
            />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='CTA'>
          {nodeCtas.map((nodeCta, i: number) => (
            <ToolbarGroup key={nodeCta.id} full={true}>
              <ToolbarItem
                label='Enabled'
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='enabled'
                type='toggle'
              />
              <ToolbarItem
                label='CTA'
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='text'
                type='text'
              />
              <ToolbarItem
                label='URL'
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='link'
                type='text'
              />
            </ToolbarGroup>
          ))}
        </ToolbarSection>
        <ToolbarSection title='Video'>
          <ToolbarGroup full={true}>
            <ToolbarItem label='URL' propKey='videoUrl' type='text' />
          </ToolbarGroup>
        </ToolbarSection>
      </div>
    </>
  );
};
