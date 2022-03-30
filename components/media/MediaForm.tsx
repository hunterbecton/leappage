import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { FileUpload, Input } from 'components/form';
import Image from 'next/image';
import { MediaData, MediaProps } from './_models';

const handleFileSize = (files: File[]) => {
  let valid = true;
  if (files) {
    // eslint-disable-next-line
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size >= 2) {
        valid = false;
      }
    });
  }
  return valid;
};

const handleFileType = (files: File[]) => {
  let valid = true;
  if (files) {
    // eslint-disable-next-line
    files.map((file) => {
      if (!['image/svg+xml', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
};

const validationSchema: SchemaOf<MediaData> = object().shape({
  title: string().required('Title is required'),
  uploadFile: mixed()
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG, PNG, or SVG.', (value) =>
      handleFileType(value)
    ),
  url: string(),
});

export const MediaForm: FC<MediaProps> = ({ media }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const methods = useForm<MediaData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: media.title,
      url: media.url,
    },
  });

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const url = methods.watch('url');
  const title = methods.watch('title');

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdate = async ({ title, url, uploadFile }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('url', url);

      // Append uploadFile if exists
      if (uploadFile && uploadFile.length > 0) {
        formData.append('file', uploadFile[0]);
      }

      const res = await fetch(`/api/media/upload/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        methods.setValue('uploadFile', '');
        toast.success('Media updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating media.');
    }
    setIsUpdating(false);
    setIsAnimating(false);
    refreshData();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Media deleted.');
        router.push('/media/1');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting media.');
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
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleUpdate)}>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='title'
                      label='Title'
                      placeholder={'Enter title'}
                    />
                  </div>
                  <div className='col-span-6 lg:col-span-3'>
                    <Input
                      name='url'
                      label='URL'
                      placeholder=''
                      readOnly={true}
                    />
                  </div>
                  <div className='col-span-6'>
                    <label
                      htmlFor='image-preview'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Image
                    </label>
                    <div className='relative mt-1 max-w-sm'>
                      <div className='aspect-w-10 aspect-h-7 relative block w-full overflow-hidden rounded-lg bg-gray-100'>
                        <div className='absolute top-0 left-0 h-full w-full'>
                          <Image
                            src={url}
                            alt={title}
                            layout='fill'
                            objectFit='contain'
                            className='p-img-4'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <FileUpload label='Replace image' />
                  </div>
                </div>
              </div>
              <div className='space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  variant='ghost'
                  disabled={isUpdating}
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  title='Delete media'
                  text='Delete'
                />
                <Button
                  type='submit'
                  disabled={isUpdating}
                  title='Update media'
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
