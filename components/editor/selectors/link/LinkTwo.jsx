import { useNode } from '@craftjs/core';
import { Icon } from 'components/icon/Icon';

import { LinkTwoSettings } from './LinkTwoSettings';

const defaultProps = {
  links: [
    {
      id: 'EZaJdTBNFnyM6Ghz',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
    {
      id: 'XtV2KttCQNeMcrG3',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
    {
      id: 'v3a7VyYirHgiKqUf',
      ctaText: 'Custom Link',
      ctaLink: 'https://leappage.com',
      icon: {
        id: 'biou2LvQzWiAPZCVYwfo5U',
        name: 'Link Alt',
      },
    },
  ],
};

export const LinkTwo = (props) => {
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
            <a
              key={link.id}
              href={link.ctaLink}
              target='_blank'
              rel='noopener noreferrer'
              className='col-span-12 md:col-span-6 lg:col-span-4 bg-gray-100 rounded flex p-4 h-full items-center transition group hover:bg-gray-200'
            >
              <Icon
                id={link.icon.id}
                renderStyle='text-blue-500 w-6 h-6 flex-shrink-0 mr-4'
              />
              <span className='title-font text-gray-900'>{link.ctaText}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

LinkTwo.craft = {
  displayName: 'Links',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: LinkTwoSettings,
  },
};
