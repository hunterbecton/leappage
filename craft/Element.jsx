import { Element as CraftJsElement } from '@craftjs/core';
import React from 'react';

export function Element({ is, id, children, isSSR, ...elementProps }) {
  return isSSR ? (
    React.createElement(is, elementProps, children)
  ) : (
    <CraftJsElement id={id} {...elementProps}>
      {children}
    </CraftJsElement>
  );
}
