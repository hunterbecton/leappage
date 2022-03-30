import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const LinkTwoSettings: FC = () => {
  const {
    nodeLinks,
    actions: { setProp },
  } = useNode((node) => ({
    nodeLinks: node.data.props.links,
  }));

  const handleRemoveLink = (id) => {
    setProp((props) => {
      props.links = nodeLinks.filter((link) => link.id !== id);
    }, 500);
  };

  const handleAddLink = () => {
    const newLink = {
      id: short.generate(),
      ctaText: 'Custom Link',
      ctaLink: '',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    };

    setProp((props) => {
      props.links = [...props.links, newLink];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Links'>
          {nodeLinks.map((nodeLink, i) => (
            <ToolbarGroup key={nodeLink.id} full={true}>
              <ToolbarItem
                label='CTA'
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='ctaText'
                type='text'
              />
              <ToolbarItem
                label='URL'
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='ctaLink'
                type='text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='icon'
                type='icon'
              />
              {nodeLinks.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  title='Remove link'
                  text='Remove'
                  onClick={() => handleRemoveLink(nodeLink.id)}
                />
              )}
            </ToolbarGroup>
          ))}
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2 mb-1'
            text='Add'
            title='Add link'
            onClick={() => handleAddLink()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
