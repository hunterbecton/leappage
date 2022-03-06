import { Container } from 'components/container';
import { Button } from 'components/button';
import { FC } from 'react';
import { PageHeadingProps } from './_models';

export const PageHeading: FC<PageHeadingProps> = ({
  title,
  withSubtitle,
  subtitle,
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
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl'>
            {title}
          </h2>
          {withSubtitle && (
            <p className='mt-2 max-w-4xl text-sm text-gray-500'>{subtitle}</p>
          )}
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

PageHeading.defaultProps = {
  title: 'Heading title',
  withSubtitle: true,
  subtitle:
    'Etiam ullamcorper massa viverra consequat, consectetur id nulla tempus. Fringilla egestas justo massa purus sagittis malesuada.',
  withCta: false,
  ctaText: 'New Template',
  ctaDisabled: false,
  ctaVariant: 'default',
  containerSize: 'lg',
};
