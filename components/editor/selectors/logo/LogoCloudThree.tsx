import { useNode } from '@craftjs/core';

import { LogoCloudThreeSettings } from './LogoCloudThreeSettings';
import { FallbackImage } from 'components/image';
import { LogoThreeProps } from './_models';

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

export const LogoCloudThree = (props: Partial<LogoThreeProps>) => {
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
      className='relative overflow-x-hidden bg-white pb-12 pt-7'
    >
      <p className='w-full pb-7 text-center text-xs font-bold uppercase tracking-wider text-gray-900'>
        {subtitle}
      </p>
      <div className='max-w-7xl-xl mx-auto px-8'>
        <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
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
