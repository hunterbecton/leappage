import { useNode } from '@craftjs/core';

import { StepOneSettings } from './StepOneSettings';
import { Icon } from 'components/icon';
import { FallbackImage } from 'components/image';
import { StepOneProps } from './_models';

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
      id: 'HgHnYnATcQ3HMEfQ',
      title: 'Finish',
      description: 'Send your first campaign and start gathering data.',
      icon: {
        id: '7tBFgZKJYb862wAnrByswk',
        name: 'Mail Send',
      },
    },
  ],
};

export const StepOne = (props: Partial<StepOneProps>) => {
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
    <section
      ref={connect}
      className='w-full bg-white py-6 px-4 sm:py-12 sm:px-10 md:py-16'
    >
      <div className='mx-auto flex max-w-7xl flex-wrap'>
        <div className='flex w-full flex-wrap'>
          <div className='md:w-1/2 md:py-6 md:pr-10 lg:w-2/5'>
            {steps.map((step, i) =>
              i + 1 === steps.length ? (
                <div key={step.id} className='relative flex'>
                  <div className='bg-primary relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white'>
                    <Icon id={step.icon.id} />
                  </div>
                  <div className='flex-grow pl-4'>
                    <h2 className='mb-1 text-sm font-medium tracking-wider text-gray-900'>
                      {step.title}
                    </h2>
                    <p className='leading-relaxed text-gray-500'>
                      {step.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={step.id} className='relative flex pb-12'>
                  <div className='absolute inset-0 flex h-full w-10 items-center justify-center'>
                    <div className='pointer-events-none h-full w-1 bg-gray-200'></div>
                  </div>
                  <div className='bg-primary relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white'>
                    <Icon id={step.icon.id} />
                  </div>
                  <div className='flex-grow pl-4'>
                    <h2 className='mb-1 text-sm font-medium tracking-wider text-gray-900'>
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
          <div className='relative mt-12 rounded-lg object-cover object-center md:mt-0 md:w-1/2 lg:w-3/5'>
            <FallbackImage
              src={src}
              alt='Step'
              layout='fill'
              objectFit='cover'
              fallbackSrc='/images/not-found.png'
            />
          </div>
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
