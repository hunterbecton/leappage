import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, mixed, SchemaOf } from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Input, Dropdown, FileUpload } from 'components/form';
import { Button } from 'components/button';
import { ConfirmDeleteModal } from 'components/modal';
import { useProgressStore } from 'store';
import { RoleType, TeammateData, TeammateProps } from './_models';

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

const validationSchema: SchemaOf<TeammateData> = object().shape({
  name: string(),
  role: mixed<RoleType>().oneOf(['user', 'editor', 'admin']),
  uploadFile: mixed()
    .test('fileSize', 'The file must be less than 2mb.', (value) =>
      handleFileSize(value)
    )
    .test('fizeType', 'The file must be a JPEG or PNG.', (value) =>
      handleFileType(value)
    ),
});

const roleOptions = [
  { value: 'user', text: 'User' },
  { value: 'editor', text: 'Editor' },
  { value: 'admin', text: 'Admin' },
];

export const TeammateForm: FC<TeammateProps> = ({ teammate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const methods = useForm<TeammateData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: teammate.name,
      role: teammate.role,
      uploadFile: [],
    },
  });

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const handleUpdate = async ({ name, role, uploadFile }) => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('role', role);

      // Append uploadFile if exists
      if (uploadFile && uploadFile.length > 0) {
        formData.append('file', uploadFile[0]);
      }

      const res = await fetch(`/api/team/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Teammate updated.');
        methods.setValue('uploadFile', null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating teammate.');
    }

    setIsUpdating(false);
    setIsAnimating(false);
  };

  const handleResend = async () => {
    setIsUpdating(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/invite/resend/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Invite sent.');
        methods.setValue('uploadFile', null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsUpdating(false);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Teammate deleted.');
        router.push('/account/team');
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

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
      <div className='space-y-6 sm:px-6 lg:col-span-9 lg:px-0'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => handleUpdate(data))}>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Update Teammate
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
                    <Dropdown name='role' label='Role' options={roleOptions} />
                  </div>
                  <div className='col-span-3'>
                    <FileUpload />
                  </div>
                </div>
              </div>
              <div className='space-x-4 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  variant='ghost'
                  disabled={isDeleting}
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  title='Delete teammate'
                  text='Delete'
                />
                {teammate.status !== 'pending' && (
                  <Button
                    type='submit'
                    disabled={isUpdating}
                    title='Update teammate'
                    text='Update'
                  />
                )}
                {teammate.status === 'pending' && (
                  <Button
                    type='button'
                    disabled={isUpdating}
                    onClick={() => handleResend()}
                    title='Resend invite'
                    text='Resend Invite'
                  />
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
