import { useState, useRef, useEffect, FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, SchemaOf } from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { InputRef } from 'components/form';
import { useAuth } from 'hooks/useAuth';
import Image from 'next/image';
import { ForgotPasswordData, ForgotPasswordProps } from './_models';

const validationSchema: SchemaOf<ForgotPasswordData> = object().shape({
  email: string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
});

export const ForgotPassword: FC<ForgotPasswordProps> = ({ tenant }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const methods = useForm<ForgotPasswordData>({
    resolver: yupResolver(validationSchema),
  });

  const emailRef = useRef(null);

  const { resetPassword } = useAuth();

  // Focus on email field on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleReset = async (data: ForgotPasswordData) => {
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
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(handleReset)}
            >
              <div>
                <InputRef
                  ref={emailRef}
                  name='email'
                  label='Email'
                  type='email'
                  placeholder='Enter your email'
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
                  title='Request password reset'
                  text='Request'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};
