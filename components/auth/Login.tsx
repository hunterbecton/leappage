import { useState, useRef, useEffect, FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, SchemaOf } from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { Container } from 'components/container';
import { Input, InputRef } from 'components/form';
import { Button } from 'components/button';
import { useAuth } from 'hooks/useAuth';
import { LoginData, LoginProps } from './_models';

const validationSchema: SchemaOf<LoginData> = object().shape({
  email: string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
  password: string().required('Password is required'),
});

export const Login: FC<LoginProps> = ({ tenant }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const methods = useForm({ resolver: yupResolver(validationSchema) });

  const emailRef = useRef(null);

  const { login } = useAuth();

  // Focus on email field on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async (data: LoginData) => {
    try {
      setIsSigningIn(true);
      return await login(data.email, data.password, tenant.tenantId, '/');
    } catch (error) {
      setIsSigningIn(false);
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
          Sign In to Your Account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(handleLogin)}
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

              <div>
                <Input
                  name='password'
                  label='Password'
                  type='password'
                  placeholder='Enter your password'
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link href='/forgot-password'>
                    <a className='font-medium text-blue-600 hover:text-blue-900 focus:outline-none focus-visible:underline'>
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type='submit'
                  disabled={isSigningIn}
                  customClassName='w-full flex justify-center'
                  title='Sign in'
                  text='Sign In'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};
