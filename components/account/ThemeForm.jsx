import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import validator from 'validator';

import { ColorPicker, FontPicker } from 'components/form';
import { Button } from 'components/button';
import { useProgressStore } from 'store';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';

const validationSchema = yup.object().shape({
  primary: yup
    .string()
    .required('Primary color is required')
    .test('is-hex', 'Value must be hex code color', (value) => {
      let isValid = false;

      if (validator.isHexColor(value)) {
        isValid = true;
        return isValid;
      }
      return isValid;
    }),
  primaryLight: yup
    .string()
    .required('Primary light is required')
    .test('is-hex', 'Value must be hex code color', (value) => {
      let isValid = false;

      if (validator.isHexColor(value)) {
        isValid = true;
        return isValid;
      }
      return isValid;
    }),
  primaryHover: yup
    .string()
    .required('Primary hover is required')
    .test('is-hex', 'Value must be hex code color', (value) => {
      let isValid = false;

      if (validator.isHexColor(value)) {
        isValid = true;
        return isValid;
      }
      return isValid;
    }),
  fontFamily: yup.string().required('Primary hover is required'),
});

export const ThemeForm = ({ theme }) => {
  const [isSending, setIsSending] = useState(false);

  const { user } = useAuth();

  const { register, handleSubmit, setValue, watch, formState, reset, trigger } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        primary: theme.primary,
        primaryLight: theme.primaryLight,
        primaryHover: theme.primaryHover,
        fontFamily: theme.fontFamily,
      },
    });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdateTheme = async (newData) => {
    setIsSending(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/theme/${theme.id}`, {
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
        toast.success('Theme updated.');
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
      handleUpdateTheme(newData);
    }
  };

  // Manually register color values
  useEffect(() => {
    register('primary');
    register('primaryLight');
    register('primaryHover');
    register('fontFamily');
  }, [register]);

  const watchPrimary = watch('primary');
  const watchPrimaryLight = watch('primaryLight');
  const watchPrimaryHover = watch('primaryHover');
  const watchFontFamily = watch('fontFamily');

  return (
    <>
      <div className='space-y-6 lg:col-span-9 lg:px-0'>
        {restrict(['admin'], user) && (
          <form>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Update Theme
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Updating theme is restricted to team admins.
                  </p>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 md:col-span-1'>
                    <ColorPicker
                      name='primary'
                      label='Primary'
                      setValue={setValue}
                      formState={formState}
                      color={watchPrimary}
                      colors={[
                        '#ef4444',
                        '#f97316',
                        '#f59e0b',
                        '#eab308',
                        '#84cc16',
                        '#22c55e',
                        '#10b981',
                        '#14b8a6',
                        '#06b6d4',
                        '#0ea5e9',
                        '#3b82f6',
                        '#6366f1',
                        '#8b5cf6',
                        '#a855f7',
                        '#d946ef',
                        '#ec4899',
                        '#f43f5e',
                      ]}
                    />
                  </div>
                  <div className='col-span-3 md:col-span-1'>
                    <ColorPicker
                      name='primaryLight'
                      label='Primary Light'
                      setValue={setValue}
                      formState={formState}
                      color={watchPrimaryLight}
                      colors={[
                        '#fee2e2',
                        '#ffedd5',
                        '#fef3c7',
                        '#fef9c3',
                        '#ecfccb',
                        '#dcfce7',
                        '#d1fae5',
                        '#ccfbf1',
                        '#cffafe',
                        '#e0f2fe',
                        '#dbeafe',
                        '#e0e7ff',
                        '#ede9fe',
                        '#f3e8ff',
                        '#fae8ff',
                        '#fce7f3',
                        '#ffe4e6',
                      ]}
                    />
                  </div>
                  <div className='col-span-3 md:col-span-1'>
                    <ColorPicker
                      name='primaryHover'
                      label='Primary Hover'
                      setValue={setValue}
                      formState={formState}
                      color={watchPrimaryHover}
                      colors={[
                        '#dc2626',
                        '#ea580c',
                        '#d97706',
                        '#ca8a04',
                        '#65a30d',
                        '#16a34a',
                        '#059669',
                        '#0d9488',
                        '#0891b2',
                        '#0284c7',
                        '#2563eb',
                        '#4f46e5',
                        '#7c3aed',
                        '#9333ea',
                        '#c026d3',
                        '#db2777',
                        '#e11d48',
                      ]}
                    />
                  </div>
                  <div className='col-span-3 md:col-span-1'>
                    <FontPicker
                      font={watchFontFamily}
                      name='fontFamily'
                      label='Font Family'
                      setValue={setValue}
                      formState={formState}
                    />
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  title='Update Theme'
                  disabled={isSending}
                  onClick={handleSubmit((data) => handleIsValid(data))}
                  text='Update'
                  formState={formState}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
