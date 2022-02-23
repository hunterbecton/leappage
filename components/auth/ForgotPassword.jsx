import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { InputRef } from 'components/form';
import { useAuth } from 'hooks/useAuth';
import Image from 'next/image';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
});

export const ForgotPassword = ({ tenant }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const emailRef = useRef(null);
  const { resetPassword } = useAuth();

  // Focus on email field on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleReset = async (data) => {
    try {
      setIsRequesting(true);
      await resetPassword(data.email, tenant.tenantId);
      setIsRequesting(false);
      return toast.success('Check your email to complete password reset.');
    } catch (error) {
      setIsRequesting(false);
      if (error.message) {
        return toast.error(error.message);
      }
      return toast.error('Please try again.');
    }
  };

  return (
    <Container customClassName='min-h-screen bg-gray-50 flex flex-col'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='relative mx-auto h-12 w-auto overflow-hidden'>
          <Image
            src='/brand/logo-light-on-color.svg'
            alt='LeapPage logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Forgot password
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(handleReset)}>
            <div>
              <InputRef
                ref={emailRef}
                name='email'
                label='Email'
                type='email'
                placeholder='Enter your email'
                formState={formState}
                register={register}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <Link href='/login'>
                  <a className='font-medium text-blue-600 hover:text-blue-900 focus:outline-none focus-visible:underline'>
                    Back to login
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <Button
                type='submit'
                disabled={isRequesting}
                customClassName='w-full flex justify-center'
                text='Request'
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
