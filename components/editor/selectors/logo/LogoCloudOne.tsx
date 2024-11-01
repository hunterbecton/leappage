import { useNode } from '@craftjs/core';

import { LogoCloudOneSettings } from './LogoCloudOneSettings';
import { FallbackImage } from 'components/image';
import { LogoOneProps } from './_models';

const defaultProps = {
  logos: [
    {
      id: 'B2sqyzXqgJ48W2Dg',
      company: 'Company',
      src: '/demo/demo-logo-1.svg',
      height: 2.25,
    },
    {
      id: '4TpDqMdZQsJNxPFG',
      company: 'Company',
      src: '/demo/demo-logo-2.svg',
      height: 2.25,
    },
    {
      id: 'opwHWbVZGcL3UfMc',
      company: 'Company',
      src: '/demo/demo-logo-3.svg',
      height: 2.75,
    },
    {
      id: 'tbnP2KpKXmX8JipQ',
      company: 'Company',
      src: '/demo/demo-logo-4.svg',
      height: 3,
    },
    {
      id: 'oNasdXHcnugNr6nN',
      company: 'Company',
      src: '/demo/demo-logo-5.svg',
      height: 2,
    },
  ],
};

export const LogoCloudOne = (props: Partial<LogoOneProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { logos } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='bg-gray-100'>
      <div className='mx-auto max-w-screen-xl py-6 px-4 sm:py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-6 lg:grid-cols-5'>
          {logos.map((logo) => (
            <div
              key={logo.id}
              style={{ height: `${logo.height}rem` }}
              className='relative col-span-1 flex w-full items-center justify-center md:col-span-2 lg:col-span-1'
            >
              <FallbackImage
                src={logo.src}
                alt={logo.company}
                layout='fill'
                objectFit='contain'
                fallbackSrc='/images/not-found.png'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

LogoCloudOne.craft = {
  displayName: 'Logos',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: LogoCloudOneSettings,
  },
};
