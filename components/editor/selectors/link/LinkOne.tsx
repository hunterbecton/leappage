import { useNode } from '@craftjs/core';
import { Icon } from 'components/icon/Icon';

import { LinkOneSettings } from './LinkOneSettings';
import { LinkOneProps } from './_models';

const defaultProps = {
  links: [
    {
      id: 'MyEvPm4XtMxVQtYM',
      title: 'Custom Link',
      description: 'View your custom link for discussed service plan.',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
    {
      id: 'HJZMiNte3TfvPtyB',
      title: 'Custom Link',
      description: 'View your custom link for discussed service plan.',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
    {
      id: 'UGeoR7XeGd9NuQoX',
      title: 'Custom Link',
      description: 'View your custom link for discussed service plan.',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
  ],
};

export const LinkOne = (props: Partial<LinkOneProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { links } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16'>
      <div className='mx-auto flex max-w-7xl flex-wrap'>
        <div className='grid w-full grid-cols-12 gap-6'>
          {links.map((link) => (
            <div
              key={link.id}
              className='col-span-12 md:col-span-6 lg:col-span-4'
            >
              <div className='flex h-full flex-col rounded-lg bg-gray-100 p-8'>
                <div className='mb-3 flex items-center'>
                  <div className='bg-primary mr-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white'>
                    <Icon id={link.icon.id} />
                  </div>
                  <h2 className='title-font text-lg font-medium text-gray-900'>
                    {link.title}
                  </h2>
                </div>
                <div className='flex-grow'>
                  <p className='leading-relaxed text-gray-500'>
                    {link.description}
                  </p>
                  <a
                    href={link.ctaLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group text-primary hover:text-primary-hover mt-3 inline-flex items-center transition'
                  >
                    {link.ctaText}
                    <svg
                      className='mt-0.5 ml-1 h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 5l7 7-7 7'
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

LinkOne.craft = {
  displayName: 'Links',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: LinkOneSettings,
  },
};
