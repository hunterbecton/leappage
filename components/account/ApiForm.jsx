import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { BiKey } from 'react-icons/bi';

import { ApiKeyModal, ConfirmDeleteModal } from 'components/modal';
import { Badge } from 'components/badge';
import { Empty } from 'components/empty';
import { useProgressStore } from 'store';
import { useAuth } from 'hooks/useAuth';

export const ApiForm = ({ apiKey }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [newApiKey, setNewApiKey] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setNewApiKey(null);
    }
  }, [isOpen]);

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const queryClient = useQueryClient();

  const { user, getToken } = useAuth();

  const handleCreateKey = async () => {
    let token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/key`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
    });

    const { status, message, data } = await res.json();

    if (status !== 'success') {
      throw Error(message);
    }

    return data.apiKey;
  };

  const createMutation = useMutation(() => handleCreateKey(), {
    onMutate: () => {
      setIsAnimating(true);
    },
    onSuccess: (data) => {
      setNewApiKey(data);
      queryClient.invalidateQueries('apiKey');
      setIsOpen(true);
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Error creating API key.');
      }
    },
    onSettled: () => {
      setIsAnimating(false);
    },
  });

  const handleDeleteKey = async () => {
    let token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/key`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });

    const { status, message, data } = await res.json();

    if (status !== 'success') {
      throw Error(message);
    }

    return data;
  };

  const deleteMutation = useMutation(() => handleDeleteKey(), {
    onMutate: () => {
      setIsDeleting(true);
      setIsAnimating(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('apiKey');
      setIsConfirmDeleteModalOpen(false);
    },
    onError: (error) => {
      setIsConfirmDeleteModalOpen(false);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Error deleting API key.');
      }
    },
    onSettled: () => {
      setIsDeleting(false);
      setIsAnimating(false);
    },
  });
  return (
    <>
      <ConfirmDeleteModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
        isDeleting={isDeleting}
        handleConfirmDelete={() => deleteMutation.mutate()}
      />
      <ApiKeyModal isOpen={isOpen} setIsOpen={setIsOpen} apiKey={newApiKey} />
      <div className='space-y-6 lg:col-span-9'>
        <form>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Manage API key
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  Managing API keys is restricted to team admins.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3'>
                  <ul className='-my-5 divide-y divide-gray-200'>
                    {apiKey.length === 0 && user.role === 'admin' && (
                      <Empty
                        icon={
                          <BiKey className='mx-auto h-12 w-12 text-gray-300' />
                        }
                        title='No API key'
                        subtitle='Get started by creating a new key'
                        ctaOneText='Create key'
                        ctaOneOnClick={() => createMutation.mutate()}
                        ctaOneIcon={null}
                        withCtaTwo={false}
                      />
                    )}
                    {apiKey.length === 0 && user.role !== 'admin' && (
                      <Empty
                        icon={
                          <BiKey className='mx-auto h-12 w-12 text-gray-300' />
                        }
                        title='No API key'
                        subtitle='Contact a team admin to create one'
                        withCta={false}
                      />
                    )}
                    {apiKey.length > 0 &&
                      apiKey.map((key) => (
                        <li className='py-4'>
                          <div className='flex items-center space-x-4'>
                            <div className='flex-shrink-0'>
                              <span className='mx-auto flex items-center justify-center h-8 w-8 rounded-full bg-gray-100'>
                                <BiKey className='h-4 w-4 text-gray-600' />
                              </span>
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900'>
                                {key.safeKey}
                              </p>
                              <div className='flex space-x-2 mt-1'>
                                <Badge type='active' text='active' />
                              </div>
                            </div>
                            {user.role === 'admin' && (
                              <div>
                                <button
                                  type='button'
                                  onClick={() =>
                                    setIsConfirmDeleteModalOpen(true)
                                  }
                                  className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
