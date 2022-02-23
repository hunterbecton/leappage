import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { Input } from 'components/form';
import { useAuth } from 'hooks/useAuth';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
});

export const CategoryForm = ({ category }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState();

  const router = useRouter();

  const { user } = useAuth();

  const { id } = router.query;

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: category.title,
    },
  });

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdate = async ({ title }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const body = {
        title,
      };

      const res = await fetch(`/api/category/${id}`, {
        method: 'PATCH',
        credentials: 'include',
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
        toast.success('Category updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating category.');
    }
    setIsUpdating(false);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Category deleted.');
        router.push('/categories/1');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting category.');
    }

    setIsConfirmDeleteModalOpen(false);
    setIsDeleting(false);
    setIsAnimating(false);
  };

  return (
    <>
      <ConfirmDeleteModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
        isDeleting={isDeleting}
        handleConfirmDelete={() => handleDelete()}
      />
      <FormProvider {...methods}>
        <div className='mt-5 md:col-span-2 md:mt-0'>
          <form>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6'>
                    <Input
                      name='title'
                      label='Title'
                      placeholder={'Enter title'}
                      register={methods.register}
                      formState={methods.formState}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-6 gap-6'></div>
              </div>
              <div className='space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  variant='ghost'
                  disabled={isUpdating}
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  text='Delete'
                />
                <Button
                  type='button'
                  disabled={isUpdating}
                  onClick={methods.handleSubmit((data) => handleUpdate(data))}
                  text='Update'
                />
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
