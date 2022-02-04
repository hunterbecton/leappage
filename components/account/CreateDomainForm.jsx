import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { BiLink } from 'react-icons/bi';
import validator from 'validator';

import { Input } from 'components/form';
import { Button } from 'components/button';
import { useProgressStore } from 'store';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';
import { Empty } from 'components/empty';

const validationSchema = yup.object().shape({
  domain: yup
    .string()
    .required('Domain is required')
    .test('is-domain', 'Invalid domain', (value) => {
      let isValid = false;

      if (validator.isEmail(value)) {
        isValid = false;
        return isValid;
      } else if (
        validator.isURL(value, {
          protocols: [],
          allow_query_components: false,
        })
      ) {
        isValid = true;
      }

      return isValid;
    }),
});

export const CreateDomainForm = () => {
  const [isSending, setIsSending] = useState(false);

  const { user } = useAuth();

  const { register, handleSubmit, formState, reset, trigger } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleAddDomain = async (newData) => {
    setIsSending(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/domain`, {
        method: 'PATCH',
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
        toast.success('Domain added.');
        reset();
        refreshData();
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsSending(false);
    setIsAnimating(false);
  };

  const handleIsValid = async (newData) => {
    const isValid = await trigger();

    if (isValid) {
      handleAddDomain(newData);
    }
  };

  return (
    <>
      <div className='space-y-6 lg:px-0 lg:col-span-9'>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Manage Domain
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Managing custom domain is restricted to team admins.
              </p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  <Empty
                    icon={
                      <BiLink className='mx-auto h-12 w-12 text-gray-300' />
                    }
                    title='No Custom Domain'
                    subtitle={
                      restrict(['admin', 'editor'], user)
                        ? 'Create a custom domain below to get started'
                        : 'Creation is restricted to team admins'
                    }
                    withCta={false}
                  />
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
                    Add Domain
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Adding custom domain is restricted to team admins.
                  </p>
                </div>

                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3'>
                    <Input
                      name='domain'
                      label='Domain'
                      placeholder='example.com'
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
                  onClick={handleSubmit((data) => handleIsValid(data))}
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
