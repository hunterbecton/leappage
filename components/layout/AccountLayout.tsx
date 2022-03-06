import { FC, Fragment } from 'react';
import {
  BiCreditCard,
  BiUser,
  BiGroup,
  BiLink,
  BiPalette,
} from 'react-icons/bi';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Nav } from 'components/nav';
import { Container } from 'components/container';
import { classNames, restrict } from 'utils';
import { useAuth } from 'hooks/useAuth';

export const AccountLayout: FC = ({ children }) => {
  const router = useRouter();

  const { user } = useAuth();

  const navigation = [
    {
      name: 'Profile',
      href: '/account/profile',
      id: 1,
      icon: BiUser,
      current: router.pathname.includes('/account/profile'),
      restrict: ['user', 'editor', 'admin'],
    },
    {
      name: 'Team',
      href: '/account/team',
      id: 2,
      icon: BiGroup,
      current: router.pathname.includes('/account/team'),
      restrict: ['admin'],
    },
    {
      name: 'Subscription',
      href: '/account/subscription',
      id: 4,
      icon: BiCreditCard,
      current: router.pathname.includes('/account/subscription'),
      restrict: ['admin'],
    },
    {
      name: 'Theme',
      href: '/account/theme',
      id: 5,
      icon: BiPalette,
      current: router.pathname.includes('/account/theme'),
      restrict: ['admin'],
    },
    {
      name: 'Domain',
      href: '/account/domain',
      id: 6,
      icon: BiLink,
      current: router.pathname.includes('/account/domain'),
      restrict: ['admin'],
    },
  ];

  return (
    <>
      <Nav />
      <Container
        customClassName='bg-gray-50'
        style={{ minHeight: 'calc(100vh - 4rem' }}
      >
        <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
          <aside className='pb-6 lg:col-span-3'>
            <nav className='space-y-1'>
              {navigation.map((item) => (
                <Fragment key={item.name}>
                  {restrict(item.restrict, user) && (
                    <Link href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-blue-700 hover:bg-gray-100 hover:text-blue-700'
                            : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900',
                          'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-blue-500 group-hover:text-blue-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        <span className='truncate'>{item.name}</span>
                      </a>
                    </Link>
                  )}
                </Fragment>
              ))}
            </nav>
          </aside>
          {children}
        </div>
      </Container>
    </>
  );
};
