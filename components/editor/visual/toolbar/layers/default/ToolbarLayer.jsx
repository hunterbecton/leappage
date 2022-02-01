import { useEditor } from '@craftjs/core';
import React from 'react';
import styled from 'styled-components';
import { useLayer } from '@craftjs/layers';

import { ToolbarLayerHeader } from './ToolbarLayerHeader';

const LayerNodeDiv = styled.div`
  background: ${({ hovered }) => (hovered ? '#E5E7EB' : 'transparent')};
  display: block;
  padding-bottom: ${({ hasCanvases, expanded }) =>
    hasCanvases && expanded ? '0.5rem' : '0'};
`;

const LayerChildren = styled.div`
  margin: 0 0 0 ${({ hasCanvases }) => (hasCanvases ? '2rem' : '0rem')};
  background: ${({ hasCanvases }) =>
    hasCanvases ? 'rgba(255, 255, 255, 0.02)' : 'transparent'};
  position: relative;

  ${({ hasCanvases }) =>
    hasCanvases
      ? `
  
  box-shadow: 0px 0px 44px -1px #00000014;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom:5px;
  margin-top:5px; 
  > * { overflow:hidden; }
    &:before { 
      position:absolute;
      left:-19px;
      width: 2px;
      height:100%;
      content: " ";
      background:#00000012;
    }
  `
      : ''}
`;

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
    <LayerNodeDiv
      ref={layer}
      expanded={expanded}
      hasCanvases={hasChildCanvases}
      hovered={hovered}
    >
      <ToolbarLayerHeader />
      {children ? (
        <LayerChildren
          hasCanvases={hasChildCanvases}
          className='craft-layer-children'
        >
          {children}
        </LayerChildren>
      ) : null}
    </LayerNodeDiv>
  );
};
