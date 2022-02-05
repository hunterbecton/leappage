import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheck, BiFontFamily } from "react-icons/bi";

import { fontFamilyItems } from "components/editor/visual/toolbar/defaultFonts";
import { classNames } from "utils";

export const ToolbarFonts = ({
  propKey,
  onChange,
  value,
  label,
  options,
  type,
  ...props
}) => {
  return (
    <div>
      <Listbox value={value} onChange={(e) => onChange(e)}>
        <Listbox.Label className="block text-xs font-medium text-gray-700">
          {label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-xs shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <span
              className="block truncate"
              style={{
                fontFamily: `${value.name},${value.fallback}`,
              }}
            >
              {value.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BiFontFamily
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {fontFamilyItems.map((font) => (
                <Listbox.Option
                  key={font.name}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-blue-600 text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={font}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className="block truncate font-normal"
                        style={{
                          fontFamily: `${font.name},${font.fallback}`,
                        }}
                      >
                        {font.name}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-blue-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <BiCheck className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
