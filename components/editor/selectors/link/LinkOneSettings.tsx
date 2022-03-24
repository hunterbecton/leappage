import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const LinkOneSettings: FC = () => {
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
      title: 'Custom Link',
      description: 'View your custom link for discussed service plan.',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
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
          {nodeLinks.map((nodeLink, i: number) => (
            <ToolbarGroup key={nodeLink.id} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='title'
                type='text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='description'
                type='area'
                rows={3}
              />
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='icon'
                type='icon'
              />
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='ctaText'
                type='text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='links'
                groupIndex={i}
                propKey='ctaLink'
                type='text'
              />
              {nodeLinks.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  text='Remove'
                  title='Remove link'
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
