import { useState } from "react";
import { useEditor } from "@craftjs/core";
import ReactTooltip from "react-tooltip";

export const ToolboxButton = (props) => {
  const { component, icon, toolTip } = props;

  const [toolTipRef, setToolTipRef] = useState(null);

  const {
    connectors: { create },
  } = useEditor(() => ({}));

  return (
    <div
      data-tip={toolTip}
      ref={(ref) => {
        create(ref, component);
        setToolTipRef(ref);
      }}
      className="flex cursor-move items-center rounded-lg p-4 text-gray-200 hover:bg-gray-800"
      onMouseEnter={() => ReactTooltip.show(toolTipRef)}
      onMouseLeave={() => ReactTooltip.hide(toolTipRef)}
    >
      {icon}
      <span className="sr-only">{toolTip}</span>
      <ReactTooltip
        place="right"
        padding="0.5rem 1rem"
        backgroundColor="#1f2937"
        textColor="#E5E7EB"
      />
    </div>
  );
};
