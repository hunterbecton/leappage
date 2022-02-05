import { useState } from "react";
import ReactTooltip from "react-tooltip";

import { useComponentPanelStore } from "store";

export const ToolboxPanelButton = (props) => {
  const { icon, toolTip } = props;

  const [toolTipRef, setToolTipRef] = useState(null);

  const setIsComponentPanelOpen = useComponentPanelStore(
    (state) => state.setIsComponentPanelOpen
  );

  return (
    <button
      type="button"
      data-tip={toolTip}
      ref={(ref) => {
        setToolTipRef(ref);
      }}
      className="flex items-center rounded-lg p-4 text-gray-200 hover:bg-gray-800"
      onMouseEnter={() => ReactTooltip.show(toolTipRef)}
      onMouseLeave={() => ReactTooltip.hide(toolTipRef)}
      onClick={() => setIsComponentPanelOpen(true)}
    >
      {icon}
      <span className="sr-only">{toolTip}</span>
      <ReactTooltip
        place="right"
        padding="0.5rem 1rem"
        backgroundColor="#1f2937"
        textColor="#E5E7EB"
      />
    </button>
  );
};
