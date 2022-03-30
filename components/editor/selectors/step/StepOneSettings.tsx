import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const StepOneSettings: FC = () => {
  const {
    nodeSteps,
    actions: { setProp },
  } = useNode((node) => ({
    nodeSteps: node.data.props.steps,
  }));

  const handleRemoveStep = (id) => {
    setProp((props) => {
      props.steps = nodeSteps.filter((step) => step.id !== id);
    }, 500);
  };

  const handleAddStep = () => {
    const newStep = {
      id: short.generate(),
      title: 'Step 1',
      description:
        'Configure your contact details and notification preferences.',
      icon: {
        id: 'friTr1zgaALbd6JuCd8d4w',
        name: 'Notification',
      },
    };

    setProp((props) => {
      props.steps = [...props.steps, newStep];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Feature'>
          <ToolbarGroup full={true}>
            <ToolbarItem
              label='Image'
              propKey='src'
              type='image'
              defaultMediaSize='full'
            />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='Steps'>
          {nodeSteps.map((nodeStep, i: number) => (
            <ToolbarGroup key={nodeStep.id} full={true}>
              <ToolbarItem
                label='Title'
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='title'
                type='text'
              />
              <ToolbarItem
                label='Description'
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='description'
                type='area'
                rows={3}
              />
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='icon'
                type='icon'
              />
              {nodeSteps.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  text='Remove'
                  title='Remove step'
                  onClick={() => handleRemoveStep(nodeStep.id)}
                />
              )}
            </ToolbarGroup>
          ))}
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2 mb-1'
            text='Add'
            title='Add step'
            onClick={() => handleAddStep()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
