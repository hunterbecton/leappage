import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed, SchemaOf } from 'yup';
import { toast } from 'react-toastify';

import { FileUpload, Input } from 'components/form';
import { Button } from 'components/button';
import { useProgressStore } from 'store';
import { ProfileProps, ProfileData } from './_models';

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

const validationSchema: SchemaOf<ProfileData> = object().shape({
  name: string(),
  uploadFile: mixed()
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG, PNG, or SVG.', (value) =>
      handleFileType(value)
    ),
});

export const ProfileForm: FC<ProfileProps> = ({ currentUser }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const methods = useForm<ProfileData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentUser.name,
      uploadFile: [],
    },
  });

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleUpdate)}>
          <div className='shadow sm:overflow-hidden sm:rounded-md'>
            <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
              <div>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Update profile
                </h3>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3'>
                  <Input
                    name='name'
                    label='Name'
                    placeholder='Enter your name'
                  />
                </div>

                <div className='col-span-3'>
                  <FileUpload label='Profile image' />
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
              <Button
                type='submit'
                disabled={isUpdating}
                title='Update profile'
                text='Update'
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
