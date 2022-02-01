import { Fragment } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { BiX, BiChevronDown, BiPlus } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { BiSearch } from 'react-icons/bi';

import { Container } from 'components/container';
import { ProjectCard } from 'components/card';
import { Pagination } from 'components/pagination';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { Loading } from 'components/loading';
import { Alert } from 'components/alert';
import { Empty } from 'components/empty';
import { classNames } from 'utils';
import { useStarterStore } from 'store';
import { useAlertStore } from 'store';
import { useAuth } from 'hooks/useAuth';

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: '61281b944ab6a2f15a3b5b7e', label: 'Webinar' },
      { value: '61281bb84ab6a2f15a3b5b7f', label: 'Ebook' },
      { value: '61281bcb4ab6a2f15a3b5b80', label: 'Event' },
      { value: '615b1faf4fb0253fd439cdc9', label: 'Quote' },
    ],
  },
  {
    id: 'platform',
    name: 'Platform',
    options: [
      { value: '6127bb6c4ab6a2f15a3b5b5a', label: 'LinkedIn' },
      { value: '6127c47b4ab6a2f15a3b5b68', label: 'Twitter' },
      { value: '6127ccb74ab6a2f15a3b5b73', label: 'Instagram' },
      { value: '6127cca54ab6a2f15a3b5b72', label: 'Facebook' },
    ],
  },
];

export const FilterStarters = () => {
  const { register, setValue, watch } = useForm();

  const { getToken } = useAuth();

  const watchAllTags = watch();

  const setMessage = useAlertStore((state) => state.setMessage);

  const isMobileFiltersOpen = useStarterStore(
    (state) => state.isMobileFiltersOpen
  );
  const setIsMobileFiltersOpen = useStarterStore(
    (state) => state.setIsMobileFiltersOpen
  );
  const currentPage = useStarterStore((state) => state.currentPage);
  const setCurrentPage = useStarterStore((state) => state.setCurrentPage);
  const limit = useStarterStore((state) => state.limit);
  const totalPages = useStarterStore((state) => state.totalPages);
  const setTotalPages = useStarterStore((state) => state.setTotalPages);
  const quantity = useStarterStore((state) => state.quantity);
  const setQuantity = useStarterStore((state) => state.setQuantity);

  const fetchStarters = async ({ queryKey }) => {
    let token = await getToken();

    const allTags = queryKey[3];

    const selectedTags = Object.keys(allTags).filter(function (x) {
      return allTags[x] !== false;
    });

    let joinedTags = '';

    if (selectedTags.length > 0) {
      joinedTags = `&tags[$all]=${selectedTags.join('&tags[$all]=')}`;
    } else {
      joinedTags = '';
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/starter?page=${queryKey[1]}&limit=${queryKey[2]}&fields=featureImg${joinedTags}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    const { status, message, data, error } = await res.json();

    if (status !== 'success') {
      const newError = new Error(message);
      newError.statusCode = error.statusCode;
      throw newError;
    }

    setTotalPages(Math.ceil(data.totalStarters / queryKey[2]));
    setQuantity(data.totalStarters);

    return data.starters;
  };

  const {
    data: starters,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(['starters', currentPage, limit, watchAllTags], fetchStarters, {
    onError: (error) => setMessage(error.message),
  });

  return (
    <>
      <MainLayout>
        <PageHeading title='Starters' withSubtitle={false} withCta={false} />
        <div className='bg-white'>
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={isMobileFiltersOpen} as={Fragment}>
              <Dialog
                as='div'
                className='fixed inset-0 flex z-40 lg:hidden'
                onClose={setIsMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter='transition-opacity ease-linear duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity ease-linear duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <div className='ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto'>
                    <div className='px-4 flex items-center justify-between'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        className='-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500'
                        onClick={() => setIsMobileFiltersOpen(false)}
                      >
                        <span className='sr-only'>Close menu</span>
                        <BiX className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4'>
                      {filters.map((section) => (
                        <Disclosure
                          as='div'
                          key={section.name}
                          className='border-t border-gray-200 pt-4 pb-4'
                        >
                          {({ open }) => (
                            <fieldset>
                              <legend className='w-full px-2'>
                                <Disclosure.Button className='w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500'>
                                  <span className='text-sm font-medium text-gray-900'>
                                    {section.name}
                                  </span>
                                  <span className='ml-6 h-7 flex items-center'>
                                    <BiChevronDown
                                      className={classNames(
                                        open ? '-rotate-180' : 'rotate-0',
                                        'h-5 w-5'
                                      )}
                                      aria-hidden='true'
                                    />
                                  </span>
                                </Disclosure.Button>
                              </legend>
                              <Disclosure.Panel className='pt-4 pb-2 px-4'>
                                <div className='space-y-6'>
                                  {section.options.map((option) => (
                                    <div
                                      key={option.value}
                                      className='flex items-center'
                                    >
                                      <input
                                        type='checkbox'
                                        className='h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500'
                                        value={option.value}
                                        checked={watchAllTags[option.value]}
                                        onChange={() =>
                                          setValue(
                                            option.value,
                                            !watchAllTags[option.value]
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={option.value}
                                        className='ml-3 text-sm text-gray-500'
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </fieldset>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </div>
                </Transition.Child>
              </Dialog>
            </Transition.Root>

            <Container size='0'>
              <div className='lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
                <aside>
                  <h2 className='sr-only'>Filters</h2>

                  <button
                    type='button'
                    className='inline-flex items-center lg:hidden'
                    onClick={() => setIsMobileFiltersOpen(true)}
                  >
                    <span className='text-sm font-medium text-gray-700'>
                      Filters
                    </span>
                    <BiPlus
                      className='flex-shrink-0 ml-1 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </button>

                  <div className='hidden lg:block'>
                    <form className='divide-y divide-gray-200 space-y-10'>
                      {filters.map((section, index) => (
                        <div
                          key={section.name}
                          className={index === 0 ? null : 'pt-10'}
                        >
                          <fieldset>
                            <legend className='block text-sm font-medium text-gray-900'>
                              {section.name}
                            </legend>
                            <div className='pt-6 space-y-3'>
                              {section.options.map((option) => (
                                <div
                                  key={option.value}
                                  className='flex items-center'
                                >
                                  <input
                                    type='checkbox'
                                    className='h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500'
                                    {...register(option.value)}
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className='ml-3 text-sm text-gray-600'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      ))}
                    </form>
                  </div>
                </aside>
                {/* Results grid */}
                <div className='mt-6 col-span-2 lg:mt-0 lg:col-span-2 xl:col-span-3'>
                  {isLoading && <Loading withNav={false} height='100%' />}
                  {isSuccess && (
                    <>
                      {starters?.length > 0 && (
                        <>
                          <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {starters.map((item) => (
                              <ProjectCard
                                key={item.id}
                                href='/starters/'
                                item={item}
                              />
                            ))}
                          </ul>
                          <Pagination
                            currentPage={currentPage}
                            limit={limit}
                            quantity={quantity}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                          />
                        </>
                      )}
                      {starters?.length === 0 && (
                        <>
                          <Empty
                            icon={
                              <BiSearch className='mx-auto h-12 w-12 text-gray-300' />
                            }
                            title='No results'
                            subtitle='Change filters to find new results'
                            withCta={false}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
