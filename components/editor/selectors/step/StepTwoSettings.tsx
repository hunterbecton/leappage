import { useNode } from '@craftjs/core';
import short from 'short-uuid';
import { BiNotification } from 'react-icons/bi';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';
import { FC } from 'react';

export const StepTwoSettings: FC = () => {
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
        component: <BiNotification className='h-5 w-5 text-gray-900' />,
        render: <BiNotification className='h-8 w-8 text-blue-500' />,
      },
    };

    setProp((props) => {
      props.steps = [...props.steps, newStep];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Steps'>
          {nodeSteps.map((nodeStep, i: number) => (
            <ToolbarGroup key={nodeStep.id} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='title'
                type='text'
              />
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='description'
                type='text'
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
