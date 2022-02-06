import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';

export const LogoCloudTwoSettings = () => {
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
      company: 'Canon',
      src: 'https://storage.googleapis.com/mattermix-695d1.appspot.com/pagetoast/canon-logo.svg',
      height: 1.25,
    };

    setProp((props) => {
      props.logos = [...props.logos, newLogo];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text' props={['subtitle']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='subtitle' type='text' label='Subtitle' />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='Logos' props={['logos']}>
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
                label='Image'
              />
              <ToolbarItem
                isGroup={true}
                groupName='logos'
                groupIndex={i}
                propKey='height'
                type='range'
                label='Height'
                min={0.25}
                max={5}
                step={0.25}
              />

              {nodeLogos.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
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
            onClick={() => handleAddLogo()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
