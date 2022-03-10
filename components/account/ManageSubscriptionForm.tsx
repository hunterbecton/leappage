import { useState, useEffect, FC } from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useProgressStore } from 'store';
import { Badge } from 'components/badge';
import { formatStatus, restrict } from 'utils';
import { useAuth } from 'hooks/useAuth';
import { Button } from 'components/button';
import { ManageSubscriptionProps } from './_models';

export const ManageSubscriptionForm: FC<ManageSubscriptionProps> = ({
  subscription,
}) => {
  const [isSending, setIsSending] = useState(false);

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const { user } = useAuth();

  const router = useRouter();

  const canSubscribe = () => {
    if (subscription && subscription.status === 'canceled') {
      return true;
    } else if (!subscription) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const refreshData = () => {
      router.replace(router.asPath);
    };

    // Check for subscription changes every 20 seconds
    const timer = setTimeout(() => {
      refreshData();
    }, 20000);
    return () => clearTimeout(timer);
  }, [router]);

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

  const handlePortal = async () => {
    setIsSending(true);
    setIsAnimating(true);

    try {
      const res = await fetch(
        `/api/stripe/portal/${subscription.tenantInfo[0].stripeId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

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
                Manage subscription
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Managing subscription is restricted to team admins.
              </p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3'>
                <ul className='-my-5 divide-y divide-gray-200'>
                  <li className='py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <span className='mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                          <BiCreditCard className='h-4 w-4 text-gray-600' />
                        </span>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium text-gray-900'>
                          {subscription.productInfo[0].title}
                        </p>
                        <div className='mt-1 flex space-x-2'>
                          <Badge
                            type={subscription.status}
                            text={formatStatus(subscription.status)}
                          />
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
                disabled={isSending}
                onClick={() => handlePortal()}
                variant='ghost'
                title='Manage subscription'
                text='Manage'
              />
              {canSubscribe() && (
                <Button
                  type='button'
                  disabled={isSending}
                  onClick={() => redirectToCheckout()}
                  title='Create subscription'
                  text='Subscribe'
                />
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
