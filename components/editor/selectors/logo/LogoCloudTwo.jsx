import { useNode } from '@craftjs/core';

import { LogoCloudTwoSettings } from './LogoCloudTwoSettings';

const defaultProps = {
  subtitle: `Trusted by`,
  logos: [
    {
      id: 'kGKk4cRXVHAnYpU7',
      company: 'Company',
      src: '/demo/demo-logo-1.svg',
      height: 1.75,
    },
    {
      id: 'UZXzhxeDgYnhCWg6',
      company: 'Company',
      src: '/demo/demo-logo-2.svg',
      height: 1.75,
    },
    {
      id: 'wzaaKDivX9A6d7TT',
      company: 'Company',
      src: '/demo/demo-logo-3.svg',
      height: 2.25,
    },
    {
      id: '4TrrPH7pW2ss27Py',
      company: 'Company',
      src: '/demo/demo-logo-4.svg',
      height: 2.5,
    },
    {
      id: 'axs4QNzKGpnHfw49',
      company: 'Company',
      src: '/demo/demo-logo-5.svg',
      height: 1.5,
    },
  ],
};

export const LogoCloudTwo = (props) => {
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
      className='box-border px-5 py-12 text-gray-800 bg-white xl:my-0'
    >
      <div className='flex flex-wrap items-center justify-center px-5 mx-auto md:px-12 md:flex-wrap lg:justify-between max-w-7xl'>
        <span className='box-border block w-full mb-5 text-xs font-bold text-center text-gray-400 uppercase lg:w-auto lg:inline lg:mb-0'>
          {subtitle}
        </span>
        {logos.map((logo) => (
          <div
            key={logo.id}
            className='box-border inline-flex items-center px-5 py-0 my-2 text-center text-gray-800'
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
    </section>
  );
};

LogoCloudTwo.craft = {
  displayName: 'Logos',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: LogoCloudTwoSettings,
  },
};
