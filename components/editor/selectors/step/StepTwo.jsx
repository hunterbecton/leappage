import { useNode } from '@craftjs/core';

import { StepTwoSettings } from './StepTwoSettings';
import { Icon } from 'components/icon';

const defaultProps = {
  iconClass: '',
  steps: [
    {
      id: 'fuaYf8xEYFwQyAuw',
      title: 'Configure',
      description:
        'Configure your contact details and notification preferences.',
      icon: {
        id: 'friTr1zgaALbd6JuCd8d4w',
        name: 'Notification',
      },
    },
    {
      id: 'nxP2ghLBa8Tm6oGj',
      title: 'Import',
      description: `Don't start empty. Import your data and start right away.`,
      icon: {
        id: 'bMyTcfvVLTsZ29emP7BQCN',
        name: 'Import',
      },
    },
    {
      id: 'sVqZY8NWWNNCB9Dm',
      title: 'Invite',
      description: 'Invite team members to join and start collaborating.',
      icon: {
        id: '1spUQ1q2oaqR1wFkKhX96d',
        name: 'Group',
      },
    },
    {
      id: 's7YnLFiDL7kme2X2',
      title: 'Integrate',
      description: 'Integrate with your favorite apps and get more done.',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
  ],
};

export const StepTwo = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { steps } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='w-full bg-white py-12 md:py-16 px-10'>
      <div className='mx-auto max-w-7xl flex flex-wrap'>
        {steps.map((step, i) => (
          <div
            key={step.id}
            className='flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto'
          >
            <div className='h-full w-6 absolute inset-0 flex items-center justify-center'>
              <div className='h-full w-1 bg-gray-200 pointer-events-none'></div>
            </div>
            <div className='flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm'>
              {i + 1}
            </div>
            <div className='flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row'>
              <div className='flex-shrink-0 w-16 h-16 bg-blue-100 text-blue-500 rounded-full inline-flex items-center justify-center'>
                <Icon id={step.icon.id} renderStyle='w-8 h-8 text-blue-500' />
              </div>
              <div className='flex-grow sm:pl-6 mt-6 sm:mt-0'>
                <h2 className='font-medium title-font text-gray-900 mb-1 text-xl'>
                  {step.title}
                </h2>
                <p className='leading-relaxed text-gray-500'>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

StepTwo.craft = {
  displayName: 'Steps',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: StepTwoSettings,
  },
};
