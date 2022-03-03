import { useNode } from '@craftjs/core';
import Image from 'next/image';

import { LogoCloudTwoSettings } from './LogoCloudTwoSettings';
import { FallbackImage } from 'components/image';

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
      className='box-border bg-white px-5 py-12 text-gray-800 xl:my-0'
    >
      <div className='grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-6 lg:grid-cols-5'>
        <span className='mb-5 box-border block w-full text-center text-xs font-bold uppercase text-gray-400 lg:mb-0 lg:inline lg:w-auto'>
          {subtitle}
        </span>
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
