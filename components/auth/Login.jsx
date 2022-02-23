import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Container } from 'components/container';
import { Input, InputRef } from 'components/form';
import { Button } from 'components/button';
import { useAuth } from 'hooks/useAuth';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      'Invalid email'
    ),
  password: yup.string().required('Password is required'),
});

export const Login = ({ tenant }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const emailRef = useRef(null);
  const { login } = useAuth();

  // Focus on email field on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async (data) => {
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
        <img
          className='mx-auto h-12 w-auto'
          src='/brand/logo-light-on-color.svg'
          alt='Mattermix logo'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Sign In to Your Account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(handleLogin)}>
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

            <div>
              <Input
                name='password'
                label='Password'
                type='password'
                placeholder='Enter your password'
                register={register}
                formState={formState}
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
                text='Sign In'
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
