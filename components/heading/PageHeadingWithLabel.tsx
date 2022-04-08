import { Container } from 'components/container';
import { Button } from 'components/button';
import { FC } from 'react';
import { PageHeadingWithLabelProps } from './_models';

export const PageHeadingWithLabel: FC<PageHeadingWithLabelProps> = ({
  title,
  label,
  withCta,
  ctaDisabled,
  ctaVariant,
  ctaText,
  ctaOnClick,
  containerSize,
}) => {
  return (
    <Container size={containerSize}>
      <div className='border-b border-gray-200 pb-5 md:flex md:items-center md:justify-between'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl'>
            {title}
          </h2>
          <p className='ml-2 mt-1 truncate text-base text-gray-500'>{label}</p>
        </div>
        {withCta && (
          <div className='mt-4 ml-0 flex md:mt-0 md:ml-4'>
            <Button
              type='button'
              onClick={ctaOnClick}
              text={ctaText}
              size='lg'
              disabled={ctaDisabled}
              variant={ctaVariant}
              title={ctaText}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

PageHeadingWithLabel.defaultProps = {
  title: 'Heading title',
  label: 'for /pathname',
  withCta: false,
  ctaText: 'New Template',
  ctaDisabled: false,
  ctaVariant: 'default',
  containerSize: 'lg',
};
