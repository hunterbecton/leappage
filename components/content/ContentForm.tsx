import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { Input, TextArea, Dropdown, ImageInput } from 'components/form';
import { ContentFormData, ContentFormProps, StatusType } from './_models';

const validationSchema: SchemaOf<ContentFormData> = object().shape({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  url: string(),
  feature: string().required('Feature image is required'),
  category: string(),
  status: mixed<StatusType>().oneOf(['drafted', 'preview', 'published']),
});

export const ContentForm: FC<ContentFormProps> = ({
  content,
  categoryOptions,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const methods = useForm<ContentFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: content.title,
      description: content.description,
      url: content.url,
      feature: content.feature,
      category: content.category,
      status: content.status,
    },
  });

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdate = async ({
    title,
    description,
    url,
    feature,
    category,
    status,
  }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const body = {
        title,
        description,
        url,
        feature,
        category,
        status,
      };

      const res = await fetch(`/api/content/${id}`, {
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
        toast.success('Content updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating content.');
    }
    setIsUpdating(false);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const { success } = await res.json();

      if (success) {
        toast.success('Content deleted.');
        router.push('/content/1');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting content.');
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
                      name='description'
                      label='Description'
                      placeholder='Enter short description'
                    />
                  </div>
                  <div className='col-span-6'>
                    <ImageInput
                      name='feature'
                      label='Feature'
                      mediaSize='500'
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
                    <Input name='url' label='URL' placeholder={'Enter URL'} />
                  </div>
                </div>

                <div className='grid grid-cols-6 gap-6'></div>
              </div>
              <div className='space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  title='Delete content'
                  variant='ghost'
                  disabled={isUpdating}
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  text='Delete'
                />
                <Button
                  type='submit'
                  title='Update content'
                  disabled={isUpdating}
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
