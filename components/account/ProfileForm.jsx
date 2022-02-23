import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiImageAdd, BiX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { Input } from 'components/form';
import { Button } from 'components/button';
import { useProgressStore } from 'store';
import { classNames } from 'utils';
import { ResponsiveImage } from 'components/image';

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
  name: yup.string(),
  uploadFile: yup
    .mixed()
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG, PNG, or SVG.', (value) =>
      handleFileType(value)
    ),
});

export const ProfileForm = ({ currentUser }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, unregister, handleSubmit, watch, setValue, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        name: currentUser.name,
      },
    });

  // Register upload field
  useEffect(() => {
    register('uploadFile');
    return () => {
      unregister('uploadFile');
    };
  }, [register, unregister]);

  const files = watch('uploadFile');

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue('uploadFile', acceptedFiles, { shouldValidate: true });
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg',
  });

  const handleRemove = () => {
    setValue('uploadFile', null);
  };

  const handleUpdate = async ({ name, uploadFile }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const formData = new FormData();
      formData.append('name', name);

      // Append uploadFile if exists
      if (uploadFile && uploadFile.length > 0) {
        formData.append('file', uploadFile[0]);
      }

      const res = await fetch('/api/user', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Profile updated.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsUpdating(false);
    setIsAnimating(false);
  };

  return (
    <div className='space-y-6 lg:col-span-9'>
      <form>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Update Profile
              </h3>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <Input
                  name='name'
                  label='Name'
                  placeholder='Enter your name'
                  register={register}
                  formState={formState}
                />
              </div>

              <div className='col-span-3'>
                <label className='block text-sm font-medium text-gray-700'>
                  {!!files?.length ? 'Preview Image' : 'Profile Image'}
                </label>
                {!!files?.length && (
                  <ul className='grid grid-cols-1'>
                    {files?.map((file, i) => (
                      <li className='mt-1 max-w-sm' key={`${file}-${i}`}>
                        <div className='block h-64 w-96 overflow-hidden rounded-lg bg-gray-100'>
                          <div className='relative h-full w-full p-4'>
                            <button
                              type='button'
                              onClick={handleRemove}
                              className='absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            >
                              <BiX className='h-5 w-5' aria-hidden='true' />
                            </button>
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              layout='fill'
                              objectFit='contain'
                              className='p-img-4'
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {!files?.length && (
                  <div
                    className={classNames(
                      isDragActive ? 'border-blue-300' : 'border-gray-300',
                      'mt-1 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 hover:cursor-pointer hover:border-blue-300 focus:border-blue-300 focus:outline-none'
                    )}
                    {...getRootProps()}
                  >
                    <div className='space-y-1 text-center'>
                      <BiImageAdd className='mx-auto h-12 w-12 text-gray-300' />
                      <div className='flex text-sm text-gray-600'>
                        <p className='relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500'>
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
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
            <Button
              type='button'
              disabled={isUpdating}
              onClick={handleSubmit((data) => handleUpdate(data))}
              text='Update'
            />
          </div>
        </div>
      </form>
    </div>
  );
};
