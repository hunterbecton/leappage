import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, SchemaOf, string } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { Input, TextArea, Dropdown, ImageInput } from 'components/form';
import { TestimonialData, TestimonialProps } from './_models';

const validationSchema: SchemaOf<TestimonialData> = object().shape({
  title: string().required('Title is required'),
  quote: string().required('Quote is required'),
  profileImage: string().required('Profile image is required'),
  name: string().required('Name is required'),
  company: string().required('Company is required'),
  position: string().required('Position is required'),
  category: string(),
  status: string(),
});

export const TestimonialForm: FC<TestimonialProps> = ({
  testimonial,
  categoryOptions,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const methods = useForm<TestimonialData>({
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
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleUpdate)}>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6'>
                    <Input
                      name='title'
                      label='Title'
                      placeholder={'Enter title'}
                    />
                  </div>
                  <div className='col-span-6'>
                    <TextArea
                      name='quote'
                      label='Quote'
                      placeholder='Enter quote'
                    />
                  </div>
                  <div className='col-span-6'>
                    <ImageInput
                      name='profileImage'
                      label='Profile'
                      mediaSize='200'
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Dropdown
                      name='status'
                      label='Status'
                      options={statusOptions}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Dropdown
                      name='category'
                      label='Category'
                      options={categoryOptions}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='name'
                      label='Name'
                      placeholder={'Enter name'}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='company'
                      label='Company'
                      placeholder={'Enter company'}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='position'
                      label='Position'
                      placeholder={'Enter position'}
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
                  title='Delete testimonial'
                  text='Delete'
                />
                <Button
                  type='submit'
                  disabled={isUpdating}
                  title='Update testimonial'
                  text='Update'
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
