import { MediaCard } from 'components/card';
import { Container } from 'components/container';
import { FC } from 'react';
import { MediaListProps } from './_models';

export const MediaList: FC<MediaListProps> = ({ items, href }) => {
  return (
    <Container size='none'>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6'>
        {items?.map((item) => (
          <MediaCard key={item.id} href={href} item={item} />
        ))}
      </ul>
    </Container>
  );
};

MediaList.defaultProps = {
  items: [],
  href: '/media/',
};
