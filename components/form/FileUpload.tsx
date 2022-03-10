import { FC, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { BiImageAdd, BiX } from 'react-icons/bi';

import { classNames } from 'utils';
import { FileUploadProps } from './_models';

export const FileUpload: FC<FileUploadProps> = ({ label }) => {
  const { register, unregister, watch, setValue, formState } = useFormContext();

  // Manually register on mount
  useEffect(() => {
    register('uploadFile');
    return () => {
      unregister('uploadFile');
    };
  }, []);

  const files = watch('uploadFile');

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

  return (
    <>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
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
            <p className='text-xs text-gray-500'>PNG or JPG up to 2MB</p>
          </div>
        </div>
      )}
      {formState.errors.uploadFile && (
        <p className='mt-2 text-sm text-red-600'>
          {(formState.errors.uploadFile as any)?.message}
        </p>
      )}
    </>
  );
};

FileUpload.defaultProps = {
  label: 'Profile image',
};
