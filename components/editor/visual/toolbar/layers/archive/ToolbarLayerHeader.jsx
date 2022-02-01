import { useEditor } from '@craftjs/core';
import React from 'react';
import { useLayer } from '@craftjs/layers';
import { BiShowAlt, BiChevronDown } from 'react-icons/bi';

import { ToolbarLayerName } from './ToolbarLayerName';
import { classNames } from 'utils';

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

  const { hidden, actions, selected } = useEditor((state, query) => ({
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
    selected: state.events.selected === id,
  }));

  return (
    <div
      ref={drag}
      className={classNames(
        selected ? 'bg-blue-600 text-white' : 'bg-transparent',
        'p-2.5'
      )}
    >
      <div className='flex flex-row items-center'>
        <button
          className={'relative h-4 w-4 mr-2.5 cursor-pointer'}
          type='button'
          onClick={() => actions.setHidden(id, !hidden)}
        >
          <BiShowAlt
            className={classNames(
              hidden ? 'opacity-20' : 'opacity-100',
              'transition-opacity w-full h-full'
            )}
          />
        </button>
        <div
          className={classNames('flex flex-row w-full items-center')}
          ref={layerHeader}
          style={{ marginLeft: `${depth * 10}px` }}
        >
          <div>
            <ToolbarLayerName />
          </div>
          {children && children.length ? (
            <button
              className={classNames(
                expanded ? 'rotate-180' : '',
                'ml-auto h-4 w-4 cursor-pointer transition-transform'
              )}
              type='button'
              onClick={() => toggleLayer()}
            >
              <BiChevronDown className='w-full h-full' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
