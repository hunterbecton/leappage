import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { Input, TextArea, Dropdown, ImageInput } from 'components/form';
import { useAuth } from 'hooks/useAuth';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  quote: yup.string().required('Quote is required'),
  profileImage: yup.string().required('Profile image is required'),
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  position: yup.string().required('Position is required'),
});

export const TestimonialForm = ({ testimonial, categoryOptions }) => {
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
      title: testimonial.title,
      quote: testimonial.quote,
      profileImage: testimonial.profileImage,
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      category: testimonial.category,
      status: testimonial.status,
    },
  });

  const profileImage = methods.watch('profileImage');

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdate = async ({
    title,
    quote,
    profileImage,
    name,
    company,
    position,
    category,
    status,
  }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const body = {
        title,
        quote,
        profileImage,
        name,
        company,
        position,
        category,
        status,
      };

      const res = await fetch(`/api/testimonial/${id}`, {
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
        toast.success('Testimonial updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating testimonial.');
    }
    setIsUpdating(false);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/testimonial/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Testimonial deleted.');
        router.push('/testimonials/1');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting testimonial.');
    }

    setIsConfirmDeleteModalOpen(false);
    setIsDeleting(false);
    setIsAnimating(false);
  };

  const statusOptions = [
    { value: 'drafted', text: 'Drafted' },
    { value: 'published', text: 'Published' },
  ];

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
                  <div className='col-span-6'>
                    <TextArea
                      name='quote'
                      label='Quote'
                      placeholder='Enter quote'
                      register={methods.register}
                      formState={methods.formState}
                    />
                  </div>
                  <div className='col-span-6'>
                    <ImageInput
                      name='profileImage'
                      label='Profile'
                      placeholder={'Select profile image'}
                      register={methods.register}
                      formState={methods.formState}
                      src={profileImage}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Dropdown
                      name='status'
                      label='Status'
                      register={methods.register}
                      options={statusOptions}
                      formState={methods.formState}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Dropdown
                      name='category'
                      label='Category'
                      register={methods.register}
                      options={categoryOptions}
                      formState={methods.formState}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='name'
                      label='Name'
                      placeholder={'Enter name'}
                      register={methods.register}
                      formState={methods.formState}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='company'
                      label='Company'
                      placeholder={'Enter company'}
                      register={methods.register}
                      formState={methods.formState}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='position'
                      label='Position'
                      placeholder={'Enter position'}
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
