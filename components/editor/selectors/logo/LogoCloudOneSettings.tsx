import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const LogoCloudOneSettings: FC = () => {
  const {
    nodeLogos,
    actions: { setProp },
  } = useNode((node) => ({
    nodeLogos: node.data.props.logos,
  }));

  const handleRemoveLogo = (id) => {
    setProp((props) => {
      props.logos = nodeLogos.filter((logo) => logo.id !== id);
    }, 500);
  };

  const handleAddLogo = () => {
    const newLogo = {
      id: short.generate(),
      company: 'Company',
      src: '/demo/demo-logo-1.svg',
      height: 2.25,
    };

    setProp((props) => {
      props.logos = [...props.logos, newLogo];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Logos'>
          {nodeLogos.map((nodeLogo, i: number) => (
            <ToolbarGroup key={nodeLogo.id} full={true}>
              <ToolbarItem
                label='Company'
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='company'
                type='text'
              />
              <ToolbarItem
                label='Logo'
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='src'
                type='image'
                defaultMediaSize='500'
              />
              <ToolbarItem
                label='Height'
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='height'
                type='range'
                min={0.25}
                max={5}
                step={0.25}
              />

              {nodeLogos.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  title='Remove logo'
                  text='Remove'
                  onClick={() => handleRemoveLogo(nodeLogo.id)}
                />
              )}
            </ToolbarGroup>
          ))}
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2 mb-1'
            text='Add'
            title='Add logo'
            onClick={() => handleAddLogo()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
