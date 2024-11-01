import { FC, useState } from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Button } from 'components/button';
import { Empty } from 'components/empty';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';
import { useProgressStore } from 'store';

export const CreateSubscriptionForm: FC = () => {
  const router = useRouter();

  const { user } = useAuth();

  const [isSending, setIsSending] = useState(false);

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const redirectToCheckout = async () => {
    setIsSending(true);
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/stripe/session`, {
        method: 'GET',
        credentials: 'include',
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        router.push(data.session.url);
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error');
    }

    setIsSending(false);
    setIsAnimating(false);
  };

  return (
    <div className='space-y-6 lg:col-span-9'>
      <form>
        <div className='shadow sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white px-4 py-6 sm:p-6'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Create Subscription
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Creating a subscription is restricted to team admins.
              </p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  <Empty
                    icon={
                      <BiCreditCard className='mx-auto h-12 w-12 text-gray-300' />
                    }
                    title='No Subscription'
                    subtitle={
                      restrict(['admin', 'editor'], user)
                        ? 'Create a new subscription below to get started'
                        : 'Creation is restricted to team admins'
                    }
                    withCta={false}
                  />
                </ul>
              </div>
            </div>
          </div>
          {restrict(['admin'], user) && (
            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
              <Button
                type='button'
                disabled={isSending}
                onClick={() => redirectToCheckout()}
                text='Create'
                title='Create subscription'
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
