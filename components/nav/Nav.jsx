import { Fragment } from 'react';
import { Menu, Disclosure, Transition } from '@headlessui/react';
import { BiMenuAltLeft, BiX, BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { classNames } from 'utils';
import { useAuth } from 'hooks/useAuth';

export const Nav = () => {
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleHelp = () => {
    global.Beacon('identify', {
      name: user.name,
      email: user.email,
    });
    global.Beacon('open');
  };

  return (
    <Disclosure as='nav' className='bg-gray-800 z-30 sticky top-0'>
      {({ open }) => (
        <>
          <div className='w-full px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <BiX className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <BiMenuAltLeft
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <Link href='/'>
                    <a className='focus:outline-none'>
                      <span className='sr-only'>LeapPage</span>
                      <img
                        className='h-7 w-auto'
                        src='/brand/logo-light.svg'
                        alt='LeapPage Logo'
                      />
                    </a>
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    <Link href='/pages/1'>
                      <a
                        className={classNames(
                          router.pathname.includes('/pages')
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
                        )}
                        aria-current={
                          router.pathname.includes('/pages')
                            ? 'page'
                            : undefined
                        }
                      >
                        Pages
                      </a>
                    </Link>
                    <Link href='/templates/1'>
                      <a
                        className={classNames(
                          router.pathname.includes('/templates')
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
                        )}
                        aria-current={
                          router.pathname.includes('/templates')
                            ? 'page'
                            : undefined
                        }
                      >
                        Templates
                      </a>
                    </Link>
                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className='group inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'>
                              <span>Library</span>
                              <BiChevronDown
                                className={classNames(
                                  open ? 'text-gray-600' : 'text-gray-400',
                                  'ml-2 h-5 w-5 group-hover:text-gray-500'
                                )}
                                aria-hidden='true'
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              static
                              className='origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => router.push('/content/1')}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Content
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      router.push('/testimonials/1')
                                    }
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Testimonials
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => router.push('/categories/1')}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Categories
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => router.push('/media/1')}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Media
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-white'>
                          <span className='sr-only'>Open user menu</span>
                          {user?.photoUrl && (
                            <img
                              className='h-8 w-8 rounded-full'
                              src={user.photoUrl}
                              alt={user.email}
                            />
                          )}
                          {!user?.photoUrl && (
                            <span className='inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100'>
                              <svg
                                className='h-full w-full text-gray-300'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                              </svg>
                            </span>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items
                          static
                          className='origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => router.push('/account/profile')}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Account
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => logout('/login')}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Link href='/pages/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/pages')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/pages') ? 'page' : undefined
                  }
                >
                  Pages
                </a>
              </Link>
              <Link href='/templates/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/templates')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/templates') ? 'page' : undefined
                  }
                >
                  Templates
                </a>
              </Link>
              <Link href='/content/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/content')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/content') ? 'page' : undefined
                  }
                >
                  Content
                </a>
              </Link>
              <Link href='/testimonials/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/testimonials')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/testimonials')
                      ? 'page'
                      : undefined
                  }
                >
                  Testimonials
                </a>
              </Link>
              <Link href='/categories/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/categories')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/categories') ? 'page' : undefined
                  }
                >
                  Categories
                </a>
              </Link>
              <Link href='/media/1'>
                <a
                  className={classNames(
                    router.pathname.includes('/media')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    router.pathname.includes('/media') ? 'page' : undefined
                  }
                >
                  Media
                </a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
