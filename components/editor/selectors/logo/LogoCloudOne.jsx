import { useNode } from '@craftjs/core';

import { LogoCloudOneSettings } from './LogoCloudOneSettings';

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

export const LogoCloudOne = (props) => {
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
      <div className='max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
          {logos.map((logo) => (
            <div
              key={logo.id}
              className='flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1'
            >
              <img
                className='fill-current'
                style={{ height: `${logo.height}rem` }}
                src={logo.src}
                alt={logo.company}
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
