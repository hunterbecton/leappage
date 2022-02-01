import { useEditor } from '@craftjs/core';
import React from 'react';
import styled from 'styled-components';
import { useLayer } from '@craftjs/layers';

import { ToolbarLayerName } from './ToolbarLayerName';
import Arrow from './svg/arrow.svg';
import Eye from './svg/eye.svg';
import Linked from './svg/linked.svg';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  background: ${({ selected }) => (selected ? '#2680eb' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : 'inherit')};
  svg {
    fill: ${({ selected }) => (selected ? '#fff' : '#808184')};
    margin-top: 2px;
  }
  .inner {
    flex: 1;
    > div {
      padding: 0px;
      flex: 1;
      display: flex;
      margin-left: ${({ depth }) => depth * 10}px;
      align-items: center;
      div.layer-name {
        flex: 1;
        p {
          font-size: 15px;
          line-height: 26px;
          font-family: 'Inter', sans-serif;
          color: rgba(17, 24, 39, 1);
        }
      }
    }
  }
`;

const Expand = styled.a`
  width: 8px;
  height: 8px;
  display: block;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  transform: rotate(${(props) => (props.expanded ? 180 : 0)}deg);
  opacity: 0.7;
  cursor: pointer;
  transform-origin: 60% center;
`;

const Hide = styled.a`
  width: 14px;
  height: 14px;
  margin-right: 10px;
  position: relative;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: ${(props) => (props.isHidden ? 0.2 : 1)};
  }
  &:after {
    content: ' ';
    width: 2px;
    height: ${(props) => (props.isHidden ? 100 : 0)}%;
    position: absolute;
    left: 2px;
    top: 3px;
    background: ${(props) => (props.selected ? '#fff' : '#808184')};
    transform: rotate(-45deg);
    transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: 0% 0%;
    opacity: ${(props) => (props.isHidden ? 0.4 : 1)};
  }
`;

const TopLevelIndicator = styled.div`
  margin-left: -22px;
  margin-right: 10px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ToolbarLayerHeader = () => {
  const {
    id,
    depth,
    expanded,
    children,
    connectors: { drag, layerHeader },
    actions: { toggleLayer },
  } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });

  const { hidden, actions, selected, topLevel } = useEditor((state, query) => ({
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
    selected: state.events.selected === id,
    topLevel: query.node(id).isTopLevelCanvas(),
  }));

  return (
    <StyledDiv selected={selected} ref={drag} depth={depth}>
      <Hide
        selected={selected}
        isHidden={hidden}
        onClick={() => actions.setHidden(id, !hidden)}
      >
        <img src={Eye} />
      </Hide>
      <div className='inner'>
        <div ref={layerHeader}>
          {topLevel ? (
            <TopLevelIndicator>
              <img src={Linked} />
            </TopLevelIndicator>
          ) : null}

          <div className='layer-name s'>
            <ToolbarLayerName />
          </div>
          <div>
            {children && children.length ? (
              <Expand expanded={expanded} onMouseDown={() => toggleLayer()}>
                <img src={Arrow} />
              </Expand>
            ) : null}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};
