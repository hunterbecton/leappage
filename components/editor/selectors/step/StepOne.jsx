import { useNode } from '@craftjs/core';

import { StepOneSettings } from './StepOneSettings';
import { Icon } from 'components/icon';

const defaultProps = {
  src: 'https://dummyimage.com/1000x828/f3f4f6/1f2937.jpg',
  steps: [
    {
      id: 'GqzMpgFLwEgG2fRF',
      title: 'Step 1',
      description:
        'Configure your contact details and notification preferences.',
      icon: {
        id: 'friTr1zgaALbd6JuCd8d4w',
        name: 'Notification',
      },
    },
    {
      id: 'NhYDLzkjp22KpnDx',
      title: 'Step 2',
      description: `Don't start empty. Import your data and start right away.`,
      icon: {
        id: 'bMyTcfvVLTsZ29emP7BQCN',
        name: 'Import',
      },
    },
    {
      id: 'ecs4kqPiD4NrhHsH',
      title: 'Step 3',
      description: 'Invite team members to join and start collaborating.',
      icon: {
        id: '1spUQ1q2oaqR1wFkKhX96d',
        name: 'Group',
      },
    },
    {
      id: 'jpfEMnu8JaBtx7Ue',
      title: 'Step 4',
      description: 'Integrate with your favorite apps and get more done.',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
    {
      id: 'jpfEMnu8JaBtx7Ue',
      title: 'Finish',
      description: 'Send your first campaign and start gathering data.',
      icon: {
        id: '7tBFgZKJYb862wAnrByswk',
        name: 'Mail Send',
      },
    },
  ],
};

export const StepOne = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { src, steps } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='w-full bg-white py-12 md:py-16 px-10'>
      <div className='mx-auto max-w-7xl flex flex-wrap'>
        <div className='flex flex-wrap w-full'>
          <div className='lg:w-2/5 md:w-1/2 md:pr-10 md:py-6'>
            {steps.map((step, i) =>
              i + 1 === steps.length ? (
                <div key={step.id} className='flex relative'>
                  <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10'>
                    <Icon id={step.icon.id} />
                  </div>
                  <div className='flex-grow pl-4'>
                    <h2 className='font-medium text-sm text-gray-900 mb-1 tracking-wider'>
                      {step.title}
                    </h2>
                    <p className='leading-relaxed text-gray-500'>
                      {step.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={step.id} className='flex relative pb-12'>
                  <div className='h-full w-10 absolute inset-0 flex items-center justify-center'>
                    <div className='h-full w-1 bg-gray-200 pointer-events-none'></div>
                  </div>
                  <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10'>
                    <Icon id={step.icon.id} />
                  </div>
                  <div className='flex-grow pl-4'>
                    <h2 className='font-medium text-sm text-gray-900 mb-1 tracking-wider'>
                      {step.title}
                    </h2>
                    <p className='leading-relaxed text-gray-500'>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <img
            className='lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12'
            src={src}
            alt='step'
          />
        </div>
      </div>
    </section>
  );
};

StepOne.craft = {
  displayName: 'Steps',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: StepOneSettings,
  },
};
