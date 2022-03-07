import { Fragment, useRef, useState, useEffect, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiImageAdd, BiLoader, BiX } from 'react-icons/bi';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, mixed, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { classNames } from 'utils';
import { UploadFileModalData, UploadFileModalProps } from './_models';

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

const validationSchema: SchemaOf<UploadFileModalData> = object().shape({
  uploadFile: mixed()
    .required('File is required')
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG, PNG, or SVG.', (value) =>
      handleFileType(value)
    ),
});

export const UploadFileModal: FC<UploadFileModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const {
    register,
    unregister,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFileModalData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  // Register upload field
  useEffect(() => {
    register('uploadFile');
    return () => {
      unregister('uploadFile');
    };
  }, [register, unregister]);

  const files = watch('uploadFile');

  const cancelButtonRef = useRef(null);

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

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const handleUpload = async ({ uploadFile }) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadFile[0]);

      const res = await fetch(`/api/media/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        reset();
        refreshData();
        toast.success('Media uploaded.');
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error uploading media.');
    }

    setIsUploading(false);
  };

  const handleRemove = () => {
    reset();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        auto-reopen='true'
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
              <div>
                {!files?.length && (
                  <>
                    <label
                      htmlFor='uploadFile'
                      className='block text-sm font-medium text-gray-700'
                    >
                      File
                    </label>
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
                            type='file'
                            name='uploadFile'
                            className='sr-only'
                            {...getInputProps()}
                          />
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, or SVG up to 2MB
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {!!files?.length && (
                  <ul className='grid grid-cols-1'>
                    {files?.map((file, i) => (
                      <li className='relative' key={`${file}-${i}`}>
                        <div className='aspect-w-10 aspect-h-7 relative block w-full overflow-hidden rounded-lg bg-gray-100'>
                          <div className='h-full w-full'>
                            <button
                              type='button'
                              onClick={handleRemove}
                              className='absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            >
                              <BiX className='h-5 w-5' aria-hidden='true' />
                            </button>
                            {isUploading && (
                              <div className='z-10 flex h-full w-full items-center justify-center'>
                                <BiLoader className='h-12 w-12 animate-spin text-blue-600' />
                              </div>
                            )}
                          </div>
                          <div
                            className={classNames(
                              isUploading ? 'opacity-50' : 'opacity-100',
                              'absolute top-0 left-0 h-full w-full'
                            )}
                          >
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
                {errors.uploadFile && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.uploadFile.message}
                  </p>
                )}
              </div>

              <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                <button
                  type='button'
                  disabled={isUploading}
                  className={classNames(
                    isUploading
                      ? 'disabled:cursor-wait disabled:opacity-50'
                      : '',
                    'inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                  )}
                  onClick={handleSubmit((data) => handleUpload(data))}
                >
                  Upload
                </button>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
                  onClick={handleClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
