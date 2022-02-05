import { useEditor } from "@craftjs/core";
import React from "react";
import { useLayer } from "@craftjs/layers";

import { ToolbarLayerHeader } from "./ToolbarLayerHeader";
import { classNames } from "utils";

export const ToolbarLayer = ({ children }) => {
  const {
    id,
    expanded,
    hovered,
    connectors: { layer },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));
  const { hasChildCanvases } = useEditor((state, query) => {
    return {
      hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
    };
  });

  return (
    <div
      ref={layer}
      className={classNames(
        hovered ? "bg-gray-200" : "bg-transparent",
        hasChildCanvases && expanded ? "pb-1" : "pb-0",
        "block text-gray-900"
      )}
      style={{ fontSize: "0.75rem", lineHeight: "1.5rem" }}
    >
      <ToolbarLayerHeader />
      {children ? (
        <div
          hasCanvases={hasChildCanvases}
          className={classNames(
            hasChildCanvases
              ? "mb-8 bg-white bg-opacity-5"
              : "mb-0 bg-transparent",
            "craft-layer-children relative"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
