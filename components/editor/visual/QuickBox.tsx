import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BiArrowFromBottom, BiTrashAlt, BiMove } from 'react-icons/bi';

export const QuickBox = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((state) => ({
    isActive: state.nodes[id].events.selected,
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    position: node.data.props.position,
  }));

  const currentRef = useRef(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add('component-selected');
      } else {
        dom.classList.remove('component-selected');
      }
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    if (document.querySelector('.craftjs-renderer')) {
      document
        .querySelector('.craftjs-renderer')
        .addEventListener('scroll', scroll);
    }

    return () => {
      if (document.querySelector('.craftjs-renderer')) {
        document
          .querySelector('.craftjs-renderer')
          .removeEventListener('scroll', scroll);
      }
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={currentRef}
              className='fixed z-10 -mt-8 flex h-8 items-center bg-blue-600 p-2 text-xs text-white opacity-90'
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
              }}
            >
              <h2 className='mr-4 flex-1'>{name}</h2>
              {moveable ? (
                <a
                  className='mr-2 flex cursor-move items-center opacity-90'
                  ref={drag}
                >
                  <BiMove className='h-3.5 w-3.5 text-white' />
                </a>
              ) : null}
              {id !== ROOT_NODE && (
                <a
                  className='mr-2 flex cursor-pointer items-center opacity-90'
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  <BiArrowFromBottom className='h-3.5 w-3.5 text-white' />
                </a>
              )}
              {deletable ? (
                <a
                  className='flex cursor-pointer items-center opacity-90'
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <BiTrashAlt className='h-3.5 w-3.5 text-white' />
                </a>
              ) : null}
            </div>,
            document.querySelector('.page-container')
          )
        : null}
      {render}
    </>
  );
};
