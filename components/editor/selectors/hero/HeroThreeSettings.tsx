import { useNode } from '@craftjs/core';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { FC } from 'react';

export const HeroThreeSettings: FC = () => {
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
            <ToolbarItem propKey='title' type='text' />
            <ToolbarItem propKey='description' type='area' />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='CTA'>
          {nodeCtas.map((nodeCta, i: number) => (
            <ToolbarGroup key={nodeCta.id} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='text'
                type='text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='ctas'
                groupIndex={i}
                propKey='link'
                type='text'
              />
            </ToolbarGroup>
          ))}
        </ToolbarSection>
      </div>
    </>
  );
};
