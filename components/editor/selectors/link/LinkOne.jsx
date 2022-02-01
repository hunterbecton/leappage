import { useNode } from '@craftjs/core';
import { Icon } from 'components/icon/Icon';

import { LinkOneSettings } from './LinkOneSettings';

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

export const LinkOne = (props) => {
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
    <section ref={connect} className='w-full bg-white py-12 md:py-16 px-10'>
      <div className='mx-auto max-w-7xl flex flex-wrap'>
        <div className='grid grid-cols-12 gap-6 w-full'>
          {links.map((link) => (
            <div
              key={link.id}
              className='col-span-12 md:col-span-6 lg:col-span-4'
            >
              <div className='flex rounded-lg h-full bg-gray-100 p-8 flex-col'>
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0'>
                    <Icon id={link.icon.id} />
                  </div>
                  <h2 className='text-gray-900 text-lg title-font font-medium'>
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
                    className='inline-flex items-center mt-3 text-blue-500 transition hover:text-blue-600 group'
                  >
                    {link.ctaText}
                    <svg
                      className='w-4 h-4 mt-0.5 ml-1'
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
