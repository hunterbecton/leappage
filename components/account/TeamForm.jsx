import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
});

export const TeamForm = ({ team }) => {
  const [isSending, setIsSending] = useState(false);

  const [isConfirmTeammateModalOpen, setIsConfirmTeammateModalOpen] =
    useState(false);

  const [isConfirming, setIsConfirming] = useState();

  const { user } = useAuth();

  const { register, handleSubmit, formState, reset, trigger } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleInvite = async (newData) => {
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
        reset();
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
    const isValid = await trigger();

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
        handleConfirmTeammate={handleSubmit((data) => handleInvite(data))}
      />
      <div className='space-y-6 lg:px-0 lg:col-span-9'>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Manage Team
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Managing teammates is restricted to team admins.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  {team.map((teammate) => (
                    <li key={teammate.id} className='py-4'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex-shrink-0'>
                          {teammate.profileImage && (
                            <img
                              className='h-8 w-8 rounded-full'
                              src={teammate.profileImage}
                              alt={`Profile for ${teammate.id}`}
                            />
                          )}
                          {!teammate.profileImage && (
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
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-900 truncate'>
                            {teammate.email}
                          </p>
                          <div className='flex space-x-2 mt-1'>
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
                              <a className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'>
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
          <form>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                <div>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Add Teammate
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
                      register={register}
                      formState={formState}
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
                      register={register}
                      formState={formState}
                    />
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <Button
                  type='button'
                  title='Add Teammate'
                  disabled={isSending}
                  onClick={() => handleModalOpen()}
                  text='Add'
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
