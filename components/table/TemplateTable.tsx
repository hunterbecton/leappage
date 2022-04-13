import { FC } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Container } from 'components/container';
import { formatDate, restrict } from 'utils';
import { Badge } from 'components/badge';
import { TemplateTableProps } from './_models';
import { useAuth } from 'hooks/useAuth';
import { useProgressStore } from 'store';

export const TemplateTable: FC<TemplateTableProps> = ({ templates }) => {
  const { user } = useAuth();

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);

  const handleDuplicate = async (templateId: string) => {
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/template/${templateId}`, {
        method: 'POST',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (success) {
        toast.success('Template duplicated.');
        router.push(`/pages/edit/${data.page.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error duplicating template.');
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <Container size='none'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Updated
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Created
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Status
                    </th>
                    {restrict(['admin', 'editor'], user) ? (
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    ) : (
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Duplicate</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {templates.map((template) => (
                    <tr key={template.id}>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {template.title}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {formatDate(template.updatedAt)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {formatDate(template.createdAt)}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        <Badge text={template.status} type={template.status} />
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        {restrict(['admin', 'editor'], user) ? (
                          <Link href={`/templates/edit/${template.id}`}>
                            <a className='text-blue-600 hover:text-blue-900'>
                              Edit
                            </a>
                          </Link>
                        ) : (
                          <button
                            type='button'
                            onClick={() => handleDuplicate(template.id)}
                            disabled={isAnimating}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            Duplicate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
