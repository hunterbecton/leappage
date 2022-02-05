import { BiImageAdd } from "react-icons/bi";

import { Input, Dropdown } from "components/form";
import { Button } from "components/button";

const roleOptions = [
  {
    value: "loading",
    name: "Loading",
  },
];

export const SkeletonTeammateForm = () => {
  return (
    <>
      <div className="select-none space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Update teammate
                </h3>
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

                <div className="col-span-3">
                  <Dropdown options={roleOptions} disabled />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile image
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 focus:outline-none">
                    <div className="space-y-1 text-center">
                      <BiImageAdd className="mx-auto h-12 w-12 text-gray-300" />
                      <div className="flex text-sm text-gray-600">
                        <p className="relative rounded-md bg-white font-medium text-blue-600">
                          Upload file
                        </p>
                        <p className="pl-1 ">or drag and drop</p>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          readOnly={true}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG or JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-4 bg-gray-50 px-4 py-3 text-right sm:px-6">
              <Button
                type="button"
                variant="ghost"
                disabled={true}
                onClick={() => null}
                text="Delete"
              />
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
    </>
  );
};
