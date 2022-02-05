import { BiImageAdd } from "react-icons/bi";

import { Button } from "components/button";
import { Input } from "components/form";

export const SkeletonMediaForm = () => {
  return (
    <>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <Input
                    placeholder={"Loading..."}
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

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <div className="relative mt-1 max-w-sm animate-pulse">
                    <div className="aspect-w-10 aspect-h-7 relative block w-full overflow-hidden rounded-lg bg-gray-100"></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Replace File
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
            <div className="space-x-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
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
