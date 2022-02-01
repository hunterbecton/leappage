import { useCallback, useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { BiImageAdd } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { classNames } from 'utils';
import { ConfirmDeleteModal } from 'components/modal';
import { Button } from 'components/button';
import { Input } from 'components/form';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';

const handleFileSize = (files) => {
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

const handleFileType = (files) => {
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

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  uploadFile: yup
    .mixed()
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG, PNG, or SVG.', (value) =>
      handleFileType(value)
    ),
});

export const MediaForm = ({ media }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState();

  const { user } = useAuth();

  const router = useRouter();

  const { id } = router.query;

  const imageRef = useRef();

  const { register, unregister, handleSubmit, watch, setValue, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        title: media.title,
        url: media.url,
      },
    });

  const refreshImage = () => {
    if (imageRef) {
      imageRef.current.src = imageRef.current.src; // eslint-disable-line
    }
  };

  // Register upload field
  useEffect(() => {
    register('uploadFile');
    return () => {
      unregister('uploadFile');
    };
  }, [register, unregister]);

  const files = watch('uploadFile');
  const title = watch('title');
  const url = watch('url');

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue('uploadFile', acceptedFiles, { shouldValidate: true });
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg, image/svg+xml',
  });

  const handleRemove = () => {
    setValue('uploadFile', null);
  };

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
        setValue('uploadFile', '');
        refreshImage();
        toast.success('Media updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating media.');
    }
    setIsUpdating(false);
    setIsAnimating(false);
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
      <div className='mt-5 md:mt-0 md:col-span-2'>
        <form>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 lg:col-span-3'>
                  <Input
                    name='title'
                    label='Title'
                    placeholder={'Enter title'}
                    register={register}
                    formState={formState}
                    readOnly={!restrict(['admin', 'editor'], user)}
                  />
                </div>
                <div className='col-span-6 lg:col-span-3'>
                  <Input
                    name='url'
                    label='URL'
                    register={register}
                    formState={formState}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3'>
                  <label
                    htmlFor='image-preview'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Image
                  </label>
                  <div className='relative max-w-sm mt-1'>
                    <div className='relative block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'>
                      <img
                        ref={imageRef}
                        src={url}
                        alt={title}
                        className='p-4 object-contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
              {restrict(['admin', 'editor'], user) && (
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    {!!files?.length ? 'Replacement Preview' : 'Replace File'}
                  </label>
                  {!!files?.length && (
                    <ul className='grid grid-cols-1'>
                      {files?.map((file, i) => (
                        <li
                          className='relative max-w-sm mt-1'
                          key={`${file}-${i}`}
                        >
                          <div className='relative block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'>
                            <div className='w-full h-full'>
                              <button
                                type='button'
                                onClick={handleRemove}
                                className='absolute h-8 w-8 z-10 top-2 right-2 inline-flex items-center justify-center border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                              >
                                <BiX className='h-5 w-5' aria-hidden='true' />
                              </button>
                            </div>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className='p-4 object-contain'
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {!files?.length && (
                    <div
                      className={classNames(
                        isDragActive ? 'border-blue-300' : 'border-gray-300',
                        'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-blue-300 hover:cursor-pointer focus:outline-none focus:border-blue-300'
                      )}
                      {...getRootProps()}
                    >
                      <div className='space-y-1 text-center'>
                        <BiImageAdd className='mx-auto h-12 w-12 text-gray-300' />
                        <div className='flex text-sm text-gray-600'>
                          <p className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'>
                            Upload file
                          </p>
                          <p className='pl-1 '>or drag and drop</p>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            className='sr-only'
                            {...getInputProps()}
                          />
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG or JPG up to 2MB
                        </p>
                      </div>
                    </div>
                  )}
                  {formState.errors.uploadFile && (
                    <p className='mt-2 text-sm text-red-600'>
                      {formState.errors.uploadFile.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {restrict(['admin', 'editor'], user) && (
              <div className='px-4 py-3 bg-gray-50 text-right space-x-2 sm:px-6'>
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
                  onClick={handleSubmit((data) => handleUpdate(data))}
                  text='Update'
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
