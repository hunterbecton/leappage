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
    <section ref={connect} className='w-full bg-white py-12 px-10 md:py-16'>
      <div className='mx-auto flex max-w-7xl flex-wrap'>
        <div className='grid w-full grid-cols-12 gap-6'>
          {links.map((link) => (
            <a
              key={link.id}
              href={link.ctaLink}
              target='_blank'
              rel='noopener noreferrer'
              className='group col-span-12 flex h-full items-center rounded bg-gray-100 p-4 transition hover:bg-gray-200 md:col-span-6 lg:col-span-4'
            >
              <Icon
                id={link.icon.id}
                renderStyle='text-primary w-6 h-6 flex-shrink-0 mr-4'
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
