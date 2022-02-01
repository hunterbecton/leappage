import { useNode } from '@craftjs/core';
import short from 'short-uuid';
import { BiNotification } from 'react-icons/bi';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';

export const StepTwoSettings = () => {
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
        component: <BiNotification className='w-5 h-5 text-gray-900' />,
        render: <BiNotification className='w-8 h-8 text-blue-500' />,
      },
    };

    setProp((props) => {
      props.steps = [...props.steps, newStep];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Steps' props={['steps']}>
          {nodeSteps.map((nodeStep, i) => (
            <ToolbarGroup key={nodeStep.id} bgColor='bg-gray-100' full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='title'
                type='text'
                label='Title'
              />
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='description'
                type='text'
                label='Description'
              />
              <ToolbarItem
                isGroup={true}
                groupName='steps'
                groupIndex={i}
                propKey='icon'
                type='icon'
                label='Icon'
                renderStyle='w-8 h-8 text-blue-500'
              />
              {nodeSteps.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  text='Remove'
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
            onClick={() => handleAddStep()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
