import { useNode } from '@craftjs/core';

import { LogoCloudThreeSettings } from './LogoCloudThreeSettings';

const defaultProps = {
  subtitle: `Trusted by these leading companies`,
  logos: [
    {
      id: 'vYMs3VqisvHAhX8n',
      company: 'Company',
      src: '/demo/demo-logo-1.svg',
      height: 2.25,
    },
    {
      id: 'mxusg64BGVaZktFu',
      company: 'Company',
      src: '/demo/demo-logo-2.svg',
      height: 2.25,
    },
    {
      id: 'k2qQEo6KvEdwFVj3',
      company: 'Company',
      src: '/demo/demo-logo-3.svg',
      height: 2.75,
    },
    {
      id: 'ZajJBXGmDMp4nR3E',
      company: 'Company',
      src: '/demo/demo-logo-4.svg',
      height: 3,
    },
    {
      id: 'u6AGtw4jqZkwMGqw',
      company: 'Company',
      src: '/demo/demo-logo-5.svg',
      height: 2,
    },
  ],
};

export const LogoCloudThree = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { subtitle, logos } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section
      ref={connect}
      className='relative pb-12 overflow-x-hidden bg-white pt-7'
    >
      <p className='w-full text-xs font-bold tracking-wider text-center text-gray-900 pb-7 uppercase'>
        {subtitle}
      </p>
      <div className='px-8 mx-auto max-w-7xl-xl'>
        <div className='max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
            {logos.map((logo) => (
              <div
                key={logo.id}
                className='flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1'
              >
                <img
                  className='w-auto fill-current'
                  style={{ height: `${logo.height}rem` }}
                  src={logo.src}
                  alt={logo.company}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

LogoCloudThree.craft = {
  displayName: 'Logos',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: LogoCloudThreeSettings,
  },
};
