import { BiCreditCard } from "react-icons/bi";

import { Badge } from "components/badge";

export const SkeletonSubscriptionForm = () => {
  return (
    <div className="space-y-6 lg:col-span-9">
      <form>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Manage subscription
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Managing subscription is restricted to team admins.
              </p>
            </div>
            <div className="grid select-none grid-cols-3 gap-6">
              <div className="col-span-3">
                <ul className="-my-5 divide-y divide-gray-200">
                  <li className="animate-pulse py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <BiCreditCard className="h-4 w-4 text-gray-600" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="max-w-max bg-gray-200 text-sm font-medium text-gray-200">
                          Loading subscription
                        </p>
                        <div className="mt-1 flex space-x-2">
                          <Badge type="loading" text="Loading..." />
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => null()}
                          disabled={true}
                          className="inline-flex	cursor-default items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm disabled:opacity-50"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
