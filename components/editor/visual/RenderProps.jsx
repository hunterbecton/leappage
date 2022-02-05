import { useState, useEffect } from "react";

import { useEditor } from "@craftjs/core";

export const RenderProps = ({ children }) => {
  const [customProps, setCustomProps] = useState(null);

  const { actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  // Get custom props from localstorage
  useEffect(() => {
    const customProps = localStorage.getItem("props");

    if (customProps) {
      setCustomProps(JSON.parse(customProps));
    }
  }, []);

  // Set custom props
  useEffect(() => {
    if (customProps)
      customProps.forEach((customProp) => {
        customProp.values.forEach(({ propKey, value, index }) => {
          actions.setProp(customProp.id, (props) => {
            if (Array.isArray(props[propKey])) {
              props[propKey][index] = value;
            } else {
              props[propKey] = value;
            }
          });
        });
      });
  }, [customProps]);

  return <>{children}</>;
};
