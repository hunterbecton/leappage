import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { SketchPicker } from "react-color";

export const ToolbarColorPicker = ({
  propKey,
  onChange,
  value,
  label,
  type,
  ...props
}) => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <div>
      <label
        htmlFor={propKey}
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <Popover>
          <Popover.Button
            ref={setReferenceElement}
            className="relative h-8 w-8 rounded-md border border-gray-300 drop-shadow"
            style={{
              background: `url('/patterns/transparent.png') no-repeat`,
              boxShadow: `inset 0 0 99999px rgba(${value.r},${value.g},${value.b},${value.a})`,
            }}
          ></Popover.Button>
          <Popover.Panel
            ref={setPopperElement}
            className="z-30"
            style={styles.popper}
            {...attributes.popper}
          >
            <SketchPicker
              color={value}
              presetColors={presetColors}
              onChange={(color) => {
                onChange(color.rgb);
              }}
              {...props}
            />
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

const presetColors = [
  "TRANSPARENT",
  "#F9FAFB",
  "#f3f4f6",
  "#E5E7EB",
  "#D1D5DB",
  "#9CA3AF",
  "#6B7280",
  "#4B5563",
  "#374151",
  "#1f2937",
  "#111827",
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
];
