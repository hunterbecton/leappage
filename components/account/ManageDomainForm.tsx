import { FC, useState } from 'react';
import { BiLink } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ConfirmDeleteModal } from 'components/modal';

import { useProgressStore } from 'store';
import { Badge } from 'components/badge';
import { restrict } from 'utils';
import { useAuth } from 'hooks/useAuth';
import { Button } from 'components/button';
import { DomainAlert } from 'components/alert';
import { ManageDomainProps } from './_models';

export const ManageDomainForm: FC<ManageDomainProps> = ({
  tenant,
  domainStatus,
}) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubdomain, setIsSubdomain] = useState(
    tenant.domain.match(/\./g).length <= 1 ? false : true
  );

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const { user } = useAuth();

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDeleteDomain = async () => {
    setIsDeleting(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/domain/${tenant.domain}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        router.push(`https://${tenant.subdomain}.leappage.com/account/domain`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsDeleting(false);
    setIsAnimating(false);
    setIsConfirmDeleteModalOpen(false);
  };

  return (
    <>
      <ConfirmDeleteModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
        isDeleting={isDeleting}
        handleConfirmDelete={() => handleDeleteDomain()}
      />
      <div className='space-y-6 lg:col-span-9'>
        <form>
          <div className='shadow sm:overflow-hidden sm:rounded-md'>
            <div className='space-y-6 bg-white px-4 py-6 sm:p-6'>
              <div>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Manage domain
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  Managing domain is restricted to team admins.
                </p>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3'>
                  <ul className='-my-5 divide-y divide-gray-200'>
                    <li className='py-4'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex-shrink-0'>
                          <span className='mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                            <BiLink className='h-4 w-4 text-gray-600' />
                          </span>
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate text-sm font-medium text-gray-900'>
                            {tenant.domain}
                          </p>
                          <div className='mt-1 flex space-x-2'>
                            <Badge type={domainStatus} text={domainStatus} />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {restrict(['admin'], user) && (
              <div className='space-x-4 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='button'
                  disabled={isDeleting}
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  variant='ghost'
                  title='Delete domain'
                  text='Delete'
                />
              </div>
            )}
          </div>
        </form>
        {domainStatus !== 'verified' && (
          <DomainAlert isSubdomain={isSubdomain} tenant={tenant} />
        )}
      </div>
    </>
  );
};
