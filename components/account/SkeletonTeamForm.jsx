import { Input } from "components/form";
import { Button } from "components/button";
import { Badge } from "components/badge";

export const SkeletonTeamForm = () => {
  return (
    <div className="space-y-6 lg:col-span-9 lg:px-0">
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Manage team
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Managing teammates is restricted to team admins.
            </p>
          </div>

          <div className="grid select-none grid-cols-3 gap-6">
            <div className="col-span-3">
              <ul className="-my-5 divide-y divide-gray-200">
                <li className="animate-pulse py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="max-w-max truncate bg-gray-200 text-sm font-medium text-gray-200">
                        email@example.com
                      </p>
                      <div className="mt-1 flex space-x-2">
                        <Badge type="loading" text="Loading..." />
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
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add teammate
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Adding teammates is restricted to team admins.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <Input
                  placeholder="Loading..."
                  readOnly={true}
                  variant="loader"
                  disabled={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <Input
                  placeholder="Loading..."
                  readOnly={true}
                  variant="loader"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button
              type="button"
              disabled={true}
              onClick={() => null}
              text="Update"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
