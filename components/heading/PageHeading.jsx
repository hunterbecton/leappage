import { Container } from 'components/container';
import { Button } from 'components/button';

export const PageHeading = ({
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
      <div className='md:flex md:items-center md:justify-between pb-5 border-b border-gray-200'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
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
  containerSize: '',
};
