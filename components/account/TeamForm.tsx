import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Input } from 'components/form';
import { Button } from 'components/button';
import { Badge } from 'components/badge';
import { useProgressStore } from 'store';
import { formatStatus } from 'utils';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';
import { ConfirmTeammateModal } from 'components/modal';
import Image from 'next/image';
import { ManageTeamData, TeamProps } from './_models';

const validationSchema: SchemaOf<ManageTeamData> = object().shape({
  name: string().required('Name is required'),
  email: string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
});

export const TeamForm: FC<TeamProps> = ({ team }) => {
  const [isSending, setIsSending] = useState(false);

  const [isConfirmTeammateModalOpen, setIsConfirmTeammateModalOpen] =
    useState(false);

  const [isConfirming, setIsConfirming] = useState(false);

  const { user } = useAuth();

  const methods = useForm<ManageTeamData>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleInvite = async (newData: ManageTeamData) => {
    setIsSending(true);
    setIsAnimating(true);
    setIsConfirming(true);

    try {
      const res = await fetch(`/api/invite/send`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Invite sent.');
        methods.reset();
        refreshData();
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsSending(false);
    setIsAnimating(false);
    setIsConfirming(false);
    setIsConfirmTeammateModalOpen(false);
  };

  const handleModalOpen = async () => {
    const isValid = await methods.trigger();

    if (isValid) {
      setIsConfirmTeammateModalOpen(true);
    }
  };

  return (
    <>
      <ConfirmTeammateModal
        isConfirmTeammateModalOpen={isConfirmTeammateModalOpen}
        setIsConfirmTeammateModalOpen={setIsConfirmTeammateModalOpen}
        isConfirming={isConfirming}
        handleConfirmTeammate={methods.handleSubmit((data: ManageTeamData) =>
          handleInvite(data)
        )}
      />
      <div className='space-y-6 lg:col-span-9 lg:px-0'>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Manage team
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Managing teammates is restricted to team admins.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  {team.map((teammate) => (
                    <li key={teammate.id as any} className='py-4'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex-shrink-0'>
                          {teammate.profileImage && (
                            <div className='relative h-8 w-8 overflow-hidden rounded-full'>
                              <Image
                                src={teammate.profileImage}
                                alt={`Profile for ${teammate.id}`}
                                layout='fill'
                                objectFit='contain'
                              />
                            </div>
                          )}
                          {!teammate.profileImage && (
                            <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100'>
                              <svg
                                className='h-full w-full text-gray-300'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate text-sm font-medium text-gray-900'>
                            {teammate.email}
                          </p>
                          <div className='mt-1 flex space-x-2'>
                            <Badge
                              type={teammate.status}
                              text={formatStatus(teammate.status)}
                            />
                            <Badge type='inactive' text={teammate.role} />
                          </div>
                        </div>
                        {restrict(['admin'], user) && (
                          <div>
                            <Link href={`/account/team/${teammate.id}`}>
                              <a className='inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50'>
                                Edit
                              </a>
                            </Link>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {restrict(['admin'], user) && (
          <FormProvider {...methods}>
            <form>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
                  <div>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Add teammate
                    </h3>
                    <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                      Adding teammates is restricted to team admins.
                    </p>
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3'>
                      <Input
                        name='name'
                        label='Name'
                        placeholder='Enter name'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3'>
                      <Input
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='Enter email'
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <Button
                    type='submit'
                    title='Add teammate'
                    disabled={isSending}
                    onClick={() => handleModalOpen()}
                    text='Add'
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
};
