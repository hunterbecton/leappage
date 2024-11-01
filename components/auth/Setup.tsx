import { useState, useRef, useEffect, FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, boolean, ref, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Container } from 'components/container';
import { Checkbox, Input, InputRef } from 'components/form';
import { Button } from 'components/button';
import { useProgressStore } from 'store';
import { useAuth } from 'hooks/useAuth';
import { SetupData, SetupProps } from './_models';

const validationSchema: SchemaOf<SetupData> = object().shape({
  email: string().required('Email is required'),
  password: string()
    .required('Password is required')
    .matches(
      //eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
  passwordConfirm: string()
    .required('Confirm password is required')
    .oneOf([ref('password'), null], 'Passwords must match'),
  getMarketingEmails: boolean(),
});

export const Setup: FC<SetupProps> = ({ tenant }) => {
  const [isSending, setIsSending] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuth();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const router = useRouter();

  const values = router.query;

  const emailRef = useRef(null);

  // Focus on email field on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSetup = async (formData: SetupData) => {
    // Check that token is provided
    if (!values.token) {
      return toast.error('Invite token not provided.');
    }

    setIsSending(true);
    setIsAnimating(true);

    try {
      const body = {
        ...formData,
        tenant_mongo_id: tenant.id,
        tenant_google_id: tenant.tenantId,
        token: values.token,
      };

      const res = await fetch(`/api/setup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        setIsSending(false);
        setIsAnimating(false);
        toast.success('Account activated.');
        await login(formData.email, formData.password, tenant.tenantId, '/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsSending(false);
    setIsAnimating(false);
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
          Set up your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(handleSetup)}
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

              <div>
                <Input
                  name='passwordConfirm'
                  label='Confirm password'
                  type='password'
                  placeholder='Confirm password'
                />
              </div>

              <div>
                <Checkbox name='getMarketingEmails' />
              </div>

              <div>
                <Button
                  type='submit'
                  disabled={isSending}
                  customClassName='w-full flex justify-center'
                  title='Set up'
                  text='Set up'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};
