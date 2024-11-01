import { FC } from 'react';
import { BiRightArrowAlt, BiFolderOpen } from 'react-icons/bi';

import { classNames } from 'utils';
import { EmptyProps } from './_models';

export const Empty: FC<EmptyProps> = ({
  icon,
  title,
  subtitle,
  withCta,
  withCtaTwo,
  ctaOneText,
  ctaOneIcon,
  ctaOneOnClick,
  ctaOneDisabled,
  ctaTwoText,
  ctaTwoOnClick,
}) => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='py-16 text-center'>
        {icon}
        <h3 className='mt-2 text-sm font-medium text-gray-900'>{title}</h3>
        <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
        {withCta && (
          <>
            <div className='mt-6 space-x-4'>
              <button
                type='button'
                disabled={ctaOneDisabled}
                onClick={ctaOneOnClick}
                className={classNames(
                  ctaOneDisabled
                    ? 'disabled:cursor-wait disabled:opacity-50'
                    : '',
                  'inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                )}
              >
                {ctaOneText}
                {ctaOneIcon}
              </button>
            </div>
            {withCtaTwo && (
              <div className='mt-4 text-center'>
                <button
                  type='button'
                  onClick={ctaTwoOnClick}
                  className='text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                >
                  {ctaTwoText}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Empty.defaultProps = {
  icon: <BiFolderOpen className='mx-auto h-12 w-12 text-gray-300' />,
  title: 'No projects',
  subtitle: 'Get started by creating a new project',
  withCta: true,
  withCtaTwo: true,
  ctaOneText: 'Start from scratch',
  ctaOneIcon: (
    <BiRightArrowAlt className='ml-1 -mr-2 h-5 w-5' aria-hidden='true' />
  ),
  ctaOneOnClick: () => null,
  ctaOneDisabled: false,
  ctaTwoText: 'Or start from an empty template',
  ctaTwoOnClick: () => null,
};
